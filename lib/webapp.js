var sys = require('./sys.js');
var cloud = require('./cloud/cloud.js');
var mbaas = require('./mbaas.js');
var errorHandler = require('./errorHandler.js').errorHandler;
// var fhmiddleware = require('./.js').analytics;

var appname = process.env.FH_APPNAME || 'NO-APPNAME-DEFINED';
process.title = "fh-" + appname;

module.exports = {
  sys :  sys,
  mbaas : mbaas,
  cloud : cloud,
  errorHandler: errorHandler
  // analytics: analytics
};