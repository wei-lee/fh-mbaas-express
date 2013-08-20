var connect = require('fh-connect'),
paramsUtils = require('./cloud/params'),
authentication = require('./common/authenticate'),
headersUtils = require('./common/headers'),
cors = require('./common/cors'),
$fh = require('fh-api');

var mBaaS = {
  db : $fh.db
};

module.exports = connect().use(connect.bodyParser()).use(
connect.router(function (app) {
  // For CORS Requests - responds with the headers a browser likes to see so that CORs can function.
  app.options('/:func', cors.optionsResponse);
  app.post('/:func', function (req, res) {
    var params = {},
    api = req.params.func;
    params = paramsUtils.normalise(params, req);

    params.authConfig = {
      overrides : {
        '*' : { security : 'appapikey' }
      }
    };

    authentication(req,res,params).authenticate(api, function (err, ok){
      //we only care about err
      if(err){
        var headers = headersUtils({"Cache-Control":"no-cache","Content-Type":"application/json"});
        res.writeHead(err.code, headers);
        res.end(JSON.stringify(err));
        return;
      }
      if (mBaaS.hasOwnProperty(api)){
        return mBaaS[api](params, function(err, dbres){
          if (err){
            var headers = headersUtils({"Cache-Control":"no-cache","Content-Type":"application/json"});
            res.writeHead(err.code, headers);
            res.writeHead(404, headers);
            return res.end(JSON.stringify(err));
          }
          var headers = headersUtils({"Cache-Control":"no-cache","Content-Type":"application/json"});
          res.writeHead(200, headers);
          return res.end(JSON.stringify(dbres));
        });
      }
      res.writeHead(404);
      return res.end("Error: No such mBaaS function " + api);
    }); // end authenticate
  }); // end app.post
  app.all('/*', function(req, res){
    res.end("Only POST to supported mBaaS APIs are supported. See http://docs.feedhenry.com for more")
  });
})).use(connect.errorHandler({dumpExceptions:true, showMessage:true}));
