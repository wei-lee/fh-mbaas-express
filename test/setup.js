var proxyquire =  require('proxyquire').noCallThru(),
application;

exports.globalSetUp = function(test, assert){
  require('./fixtures/env.js');
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
  test.finish();
};

exports.globalTearDown = function(test, assert){
  application.close();
  test.finish();
};