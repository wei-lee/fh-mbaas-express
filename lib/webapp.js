module.exports = function(opts) {

  var fhMbaasApi = opts.api;
  var sys = require('./sys.js');
  var cloud = require('./cloud/cloud.js');
  var mbaas = require('./mbaas.js')(fhMbaasApi);
  var errorHandler = require('./errorHandler.js').errorHandler;
  var mbaasApi = require('./common/fhMbaasApi.js');
  mbaasApi.setFhApi(fhMbaasApi);
  var fhm = require('./fh-middleware.js');

  var appname = process.env.FH_APPNAME || 'NO-APPNAME-DEFINED';
  process.title = "fh-" + appname;

  return {
    sys :  sys,
    mbaas : mbaas,
    cloud : cloud,
    errorHandler: errorHandler,
    fhmiddleware: fhm.fhmiddleware,
    fhauth: fhm.fhauth
  }
};