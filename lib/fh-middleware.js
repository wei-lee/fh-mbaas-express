var util = require('util');
var fhreports = require("./cloud/fh-reports.js");
var paramsUtils = require('./cloud/params.js');
var authentication = require('./common/authenticate');
var parseHeaders = require('./common/parseFHHeaders');

var fh;

function setFhApi(fhApi) {
  fh = fhApi;
}

function getFhApi() {
  return fh;
}
//
// FeedHenry 'middleware'. This handles the following:
// * logging of fhact messages
// * fhstats timings
// * secure endpoints
//
function fhmiddleware() {
  return function(req, res, next){
    var requestTime = new Date().getTime();

    // TODO - need to dig into analytics here and find out what exactly funct should be,
    // and possibly replace funct with url in analytics
    var funct = req.url;

    // Note we can't peek into the request body for POST/PUT as can can't assume its been unrolled at this stage
    var params = {};
    params = paramsUtils.normalise(params, req);

    params._headers = req.headers;
    params._files = req.files;

    if(!req._fh_params){
      req._fh_params = params;
    }
    var msgParams = params;
    msgParams.ipAddress = getIPofClient(req);
    msgParams.agent = (req.headers && req.headers['user-agent']) ? req.headers['user-agent'] : '-';
    msgParams.funct = funct;

    function getIPofClient(req) {
      var ret =  "nonset"; // default value

      if (req.headers && req.headers['x-forwarded-for']) {
        ret = req.headers['x-forwarded-for'];  // this may be a comma seperated list of addresses added by proxies and load balancers
      } else if (req.connection && req.connection.remoteAddress) {
        ret = req.connection.remoteAddress;
      }
      return ret;
    };

    // check secure endpoints
    authentication(req, res, params).authenticate(funct, function (err, ok){
      if(err){
        res.writeHead(err.code, {"Cache-Control":"no-cache","Content-Type":"application/json"});
        return res.end(JSON.stringify(err));
      }


      res.on('finish', function(){
        sendReport();
      });

      function sendReport() {
        var responseTime = new Date().getTime();
        var totalTime = 0;
        msgParams.status = res.statusCode || 200;
        msgParams.time = totalTime = (responseTime - requestTime); //milisecs;
        msgParams.start = requestTime;
        msgParams.end = responseTime;

        try {
          fhreports.sendReport({func: funct, fullparams: msgParams, topic:'fhact'});
        } catch (e) {
        // error purposely ignored
        }

        // also log live stat
        fh.stats.timing(funct + '_request_times', msgParams['time'], true);
        fh.stats.timing('__fh_all_request_times', msgParams['time'], true);
      };

      next();
    });
  }
};

function fhauth(opts){
  return function(req, res, next){
    if(fh && fh.auth && fh.auth.verify){
      var fhparams = req._fh_params;
      if(!fhparams){
        fhparams = paramsUtils.normalise({}, req);
      }
      var sessionToken = fhparams.__fh.sessionToken || fhparams.__fh.sessiontoken;
      if(sessionToken){
        fh.auth.verify(sessionToken, opts, function(err, isValid){
          if(err) {
            console.log('error occured when verify sessionToken', err);
            return res.status(500).send(JSON.stringify({'error':'Internal Error'}));
          } else {
            if(isValid){
              return next();
            } else {
              console.log("invalid sessionToken", sessionToken);
              return res.status(401).send(JSON.stringify({'error':'Unauthorized'}));
            }
          }
        });
      }
    } else {
      console.log('fh.auth.verify is not defined. Please make sure the latest version of fh-mbaas-api module is used.');
      return next();
    }
  }
}

exports.fhmiddleware = fhmiddleware;
exports.fhauth = fhauth;
exports.setFhApi = setFhApi;
exports.getFhApi = getFhApi;
