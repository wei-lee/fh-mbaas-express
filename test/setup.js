var proxyquire =  require('proxyquire').noCallThru(),
application, ditchMock;

exports.globalSetUp = function(test, assert){
  require('./fixtures/env.js');
  ditchMock = require('./fixtures/db');
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
  test.finish();
};

exports.globalTearDown = function(test, assert){
  application.close();
  ditchMock.done();
  test.finish();
};