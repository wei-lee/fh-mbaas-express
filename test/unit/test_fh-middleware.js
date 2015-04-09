var util = require('util');
var assert = require('assert');
var proxyquire = require('proxyquire');

exports.it_should_test_middleware = function(callback) {
  var gotMockReport = false;
  var mockreports = {
    sendReport: function(obj) {
      gotMockReport = true;
      assert.equal(obj.func, '/test/foo', "Unexpected 'func': " + util.inspect(obj));
    }, '@noCallThru': true
  };

  var fhmiddleware = proxyquire('fh-middleware.js', {"./cloud/fh-reports.js": mockreports});
  fhmiddleware.setFhApi(require('../fixtures/mockAPI.js'));
  var fhm = fhmiddleware.fhmiddleware();

  var req = {
    url: '/test/foo',
    headers: {
      'X-FH-appid': 'testappid',
      'X-FH-appkey':'testappkey',
      'X-FH-projectid': 'testprojectid',
      'X-FH-connectiontag': 'testconnectiontag'
    }
  };

  // create fake response
  var events = require('events');
  var res = new events.EventEmitter();

  fhm(req, res, function next() {
    // trigger the mock finish of the response
    res.emit('finish');

    // finish has been emitted, the mock report should be called
    assert.ok(gotMockReport, "Didn't get call to mock report");

    callback();
  });
};

exports.it_shoudl_test_auth_middleware = function(callback){
  var fhmiddleware = proxyquire('fh-middleware.js', {});
  fhmiddleware.setFhApi(require('../fixtures/mockAPI.js'));

  var authMiddleware = fhmiddleware.fhauth();
  var req = {
    url: '/test/foo',
    headers: {
      'X-FH-appid': 'testappid',
      'X-FH-appkey':'testappkey',
      'X-FH-projectid': 'testprojectid',
      'X-FH-connectiontag': 'testconnectiontag',
      'X-FH-sessiontoken': 'testsessiontoken'
    },
    pause: function(){

    },
    resume: function(){
      
    }
  };

  var res = {
    status: function(){
      return res;
    },
    send: function(){
      return;
    }
  }

  authMiddleware(req, res, function(err){
    assert.ok(!err);
    callback();
  });

}
