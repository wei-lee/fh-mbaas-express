var util = require('util');
var fhreports = require('./cloud/fh-reports.js');
var paramsUtils = require('./cloud/params.js');


function analytics() {
  return function analytics(req, res, next){
    console.log("In analytics..");

    // TODO - need to dig into analytics here and find out what exactly funct should be,
    // and possibly replace funct with url in analytics
    var funct = req.url;

    // Note we can't peek into the request body for POST/PUT as can can't assume its been unrolled at this stage
    var params = {};
    params = paramsUtils.normalise(params, req);

    try {
      fhreports.sendReport({func: funct, fullparams: params, topic:'fhact'});
    } catch (e) {
      // error purposely ignored
    }

    next();
  };
};

exports.analytics = analytics;