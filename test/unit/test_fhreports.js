var util = require('util');
var assert = require('assert');
var proxyquire = require('proxyquire');

exports.it_should_test_fhreports = function(finish) {

  process.env.FH_MESSAGING_ENABLED = true;
  process.env.FH_MESSAGING_REALTIME_ENABLED = true;
  var reports = proxyquire('cloud/fh-reports.js', {});
  reports.sendReport({fullparams:{}});
  reports.createFHWebReport({});

  setTimeout(function() {
    finish();
  }, 1000);
};
