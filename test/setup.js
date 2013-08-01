var proxyquire =  require('proxyquire').noCallThru(),
application;

exports.globalSetUp = function(test, assert){
  // Start up the expressjs server
  // TODO: Find a place for these
  require('./fixtures/env.js');
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
  test.finish();
};

exports.globalTearDown = function(test, assert){
  // shut down the server so the tests can exit gracefully

  application.close();
  test.finish();

};