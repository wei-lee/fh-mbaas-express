var connect = require('fh-connect'),
util = require('util'),
authentication = require('./authenticate'),
cors = require('./cors'),
feedhenryReporting = require('./fh-reports'),
mainjs;
module.exports = function(main){
  if (!main){
    throw new Error("Error : no main.js file specified when initialising cloud route");
  }
  mainjs = main;
  return cloud.router;
};

// Attempt to treat text/plain as json
//TODO: What to do with this? Move to fh-connect?
connect.bodyParser.parse["text/plain"] = function (req, options, fn) {
  var buf = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    buf += chunk;
  });

  req.on("end", function () {
    var parsedBuf;
    try {
      parsedBuf = JSON.parse(buf);
    }catch (ex) {
      // Note: ok if this fails, may not be JSON being passed
      // console.error("Error parsing: " + buf + " - " + ex);
    };

    try {
      req.body = parsedBuf ? parsedBuf : buf;
      fn();
    } catch (err) {
      fn(err);
    }
  });
};


var cloud = {
  router : connect().use(connect.bodyParser()).use(
    connect.router(function (app) {
      // Process GET's for jsonp
      app.get('/:func', function (req, res) {
        // if ((req.query == null) || (req.query != null && req.query._callback == null)) {
        //   res.writeHead(404);
        //   return res.end();
        // }
        //TODO: Move param tweaking out
        var params = {};
        if (req.query != null) {
          if( req.query.params != null) {
            try {
              params = JSON.parse(req.query.params);
              params._callback = req.query._callback;
            } catch (e) {
              // "params" parameter is not a JSON object - may be a coincidence that we got a
              // standard GET request with a parameter called "params". Just use the req.query
              // obect as the params
              params = req.query;
            }
          }
          else {
            params = req.query;
          }

          //for js sdk, some jsonp requests will stringiy the request data and send as a query param called _jsonpdata
          //if we see it, parse it as json and send to the request
          if(req.query._jsonpdata){
            var jsonpdata = null;
            try{
              jsonpdata = JSON.parse(decodeURIComponent(req.query._jsonpdata));
              for(var k in jsonpdata){
                params[k] = jsonpdata[k];
              }
            } catch (e){
              params._jsonpdata = req.query._jsonpdata;
            }
          }
        }
        return cloud.callFunction(params, req, res);
      });

      // Process POST's for ajax/web requests
      app.post('/:func', function (req, res) {
        return cloud.callFunction(req.body || {}, req, res);
      });

      app.all('/', function(req, res){
        res.statusCode = 404;
        res.end(JSON.stringify({error:"Error: no function specified, or unsupported HTTP method used"}));
      });

      app['options']('/:func', function(req, res){
        var headers = {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Origin, X-Request-With, Content-Type', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS', 'Access-Control-Allow-Credentials': 'true'};
        res.writeHead(200, headers);
        res.end("");
      });

    })
   ), // end router
  /*
   Reaches out to Main.js, and calls the relevant function if it exists.
   Common path for all connect requests, be they POST, GET
   */
  callFunction : function (params, req, res) {
    var self = this,
    funct = req.params.func,
    responseTime = 0,
    totalTime = 0,
    requestTime = new Date().getTime();
    params._headers = req.headers;
    params._files = req.files;
    var msgParams = params;
    msgParams.ipAddress = this.getIPofClient(req);
    msgParams['agent'] = (req.headers && req.headers['user-agent']) ? req.headers['user-agent'] : '-';
    msgParams['funct'] = funct;

    cors.addCorsHeaders(req, res);

    if (mainjs.hasOwnProperty(funct)) {
      //authentication happens here
      authentication(req,res,params).authenticate(funct, function (err, ok){
        //we only care about err
        if(err){
          res.writeHead(err.code, {"Cache-Control":"no-cache","Content-Type":"application/json"});
          res.end(JSON.stringify(err));
          return;
        }
        try {
          mainjs[funct](params, function (err, data, userHeaders) {
            if (err) {
              self.handleError(err, funct, res);
            } else {
              var contentType = 'application/json';

              if (data instanceof Buffer) {
                contentType = 'application/octet-stream';
              } else if (typeof(data) !== "string") {
                data = JSON.stringify(data);
              }

              if (params && params._callback != undefined) {
                contentType = 'text/javascript';
                data = params._callback + '(' + data + ');';
              }

              var headers = self.setHeaders(userHeaders, contentType);
              res.writeHead(200, headers);
              res.end(data);

              responseTime = new Date().getTime();
              msgParams['status'] = 200;
              msgParams['time'] = totalTime = (responseTime - requestTime); //milisecs;
              msgParams["start"] = requestTime;
              msgParams["end"] = responseTime;
              if (data) msgParams['bytes'] = (data instanceof Buffer)?data.length:Buffer.byteLength(data);
              else msgParams['bytes'] = 0;

              //schedule report for next tick
              try {
                feedhenryReporting.sendReport({func:funct, fullparams:msgParams, topic:'fhact'});
              } catch (e) {
              }
              // also log live stat
              // TODO: Add these
              //$fhserver.stats.timing(funct + '_request_times', msgParams['time'], true);
              //$fhserver.stats.timing('__fh_all_request_times', msgParams['time'], true);
            }
          });
        } catch (x) {
          self.handleError(x, funct, res);
        }
      });

    } else {
      res.statusCode = 404;
      msgParams['status'] = 404;
      responseTime = new Date().getTime();
      msgParams['time'] = totalTime = (responseTime - requestTime);
      msgParams['bytes'] = 0;
      try {
        feedhenryReporting.sendReport({func:funct, fullparams:msgParams, topic:'fhact'});
      } catch (e) {
      } //doing nothing with exceptions as rather the messaging fail silently than cause probs for app

      res.end(JSON.stringify({error:"Error: no such function: " + funct}));

    }
  },
  /*

   */
  getIPofClient : function (req) {
    var ret =  "nonset"; // default value

    if (req.headers && req.headers['x-forwarded-for']) {
      ret = req.headers['x-forwarded-for'];  // this may be a comma seperated list of addresses added by proxies and load balancers
    } else if (req.connection && req.connection.remoteAddress) {
      ret = req.connection.remoteAddress;
    }

    return ret;
  },
  /*
    Fires if the 'err' condition of the main.js exported function is populated
   */
  handleError : function(err, funct, res) {
    res.statusCode = 500;

    console.error("Internal error in " + funct + ": " + util.inspect(err));
    if (err && err.stack) console.error(util.inspect(err.stack));

    var error = {
      msg:"Internal error in " + funct + ": " + err,
      error:JSON.stringify(err)
    };
    res.end(JSON.stringify(error));
  },
  setHeaders : function(headers, contentType) {
    var headerz = headers || {};
    if (headerz['Content-Type'] == undefined){
      headerz['Content-Type'] = contentType;
    }
    if (headerz['Access-Control-Allow-Origin'] == undefined){
      headerz['Access-Control-Allow-Origin'] = "*";
    }

    // IOS 6 hotfix: http://stackoverflow.com/questions/12506897/is-safari-on-ios-6-caching-ajax-results
    if (headerz['Cache-Control'] == undefined){
      headerz['Cache-Control'] = "no-cache";
    }
    return headerz;
  }
};