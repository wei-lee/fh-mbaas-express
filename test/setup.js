var proxyquire =  require('proxyquire').noCallThru(),
application, ditchMock, authMock;

exports.globalSetUp = function(test, assert){
  require('./fixtures/env.js');
  ditchMock = require('./fixtures/db');
	authMock = require('./fixtures/authcall.js');
  application = proxyquire('./fixtures/application.js', {
    'fh-webapp': require('../lib/webapp.js'),
    'main.js' : require('./fixtures/main.js')
  });
  test.finish();
};

exports.globalTearDown = function(test, assert){
  application.close();
  ditchMock.done();
  authMock.done();
  test.finish();
};