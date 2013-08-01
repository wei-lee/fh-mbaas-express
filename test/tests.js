var proxyquire =  require('proxyquire').noCallThru(),
assert  = require('assert'),
clc = require('cli-color'),
async = require('async'),
port = 3000,
hostname = 'http://localhost:' + port,
testFiles = require('./runner')(),
testsToRun = [],
application;

exports.globalSetUp = function(){
  process.env.FH_ENDPOINT_CONFIG = JSON.stringify({"default":"https","overrides":{"doAuthedCall":{"security":"appapikey"},"doNonAuthCall":{"security":"https"}}});
  process.env.FH_APP_API_KEY = "testkey";
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
};

exports.globalTearDown = function(){
  application.close();
};

exports.globalSetUp();

testFiles.forEach(function(test){
  for (var key in test){
    if (test.hasOwnProperty(key)){
      (function(test, key){
        testsToRun.push(function(cb){
          console.log(clc.blue('Running ' + key));
          test[key](function(){
            console.log(clc.green(key + 'passed'));
            cb();
          });
        });
      }(test, key))
    }
  }
});

  async.series(testsToRun, function(err, res){
    exports.globalTearDown();
    console.log(clc.blue('All tests done'));
  });
