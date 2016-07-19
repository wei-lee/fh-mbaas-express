var request = require('request');
var assert = require('assert');
var util = require('util');

module.exports = {
  'test OPTIONS request responds with the expected headers on cloud call' : function(finish) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/cloud/echo', headers: {
      'access-control-request-headers': 'Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user'
    } }, function(err, response, body){
      assert.ok(!err, err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user", 'Unexpected headers: ' + util.inspect(headers['access-control-allow-headers']));
      assert.ok(headers['access-control-allow-methods'] === 'POST, GET, OPTIONS, PUT, DELETE, PATCH');
      assert.ok(headers['access-control-allow-credentials'] === "true");
      finish();
    });
  },
  'test OPTIONS request responds with the expected headers on mBaaS DB call': function(finish) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/mbaas/db', headers: {
      'access-control-request-headers': 'Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user'
    } }, function(err, response, body){
      assert.ok(!err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user");
      assert.ok(headers['access-control-allow-methods'] === 'POST, GET, OPTIONS, PUT, DELETE, PATCH');
      assert.ok(headers['access-control-allow-credentials'] === "true");
      finish();
    });
  },
  'test OPTIONS request responds with the expected headers on sys/info/ping call': function(finish) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/sys/info/ping', headers: {
      'access-control-request-headers': 'Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user'
    } }, function(err, response, body){
      assert.ok(!err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user", 'Unexpexted headers: ' + util.inspect(headers['access-control-allow-headers']));
      assert.ok(headers['access-control-allow-methods'] === 'POST, GET, OPTIONS, PUT, DELETE, PATCH');
      assert.ok(headers['access-control-allow-credentials'] === "true");
      finish();
    });
  }
};
