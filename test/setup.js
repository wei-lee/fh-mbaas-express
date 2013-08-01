var proxyquire =  require('proxyquire').noCallThru(),
application;

exports.globalSetUp = function(test, assert){
  // Start up the expressjs server
  // TODO: Find a place for these
  process.env.FH_TEST_HOSTNAME = "http://localhost:3000";
  process.env.FH_ENDPOINT_CONFIG = JSON.stringify({"default":"https","overrides":{"doAuthedCall":{"security":"appapikey"},"doNonAuthCall":{"security":"https"}}});
  process.env.FH_APP_API_KEY = "testkey";
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
  test.finish();
};

exports.globalTearDown = function(test, assert){
  // shut down the server so the tests can exit gracefully
  setTimeout(function(){
    application.close();
  }, 3000); //TODO Shouldn't need this but teardown is stupid
  test.finish();

};