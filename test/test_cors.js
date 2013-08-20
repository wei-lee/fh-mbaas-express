// Copyright (c) FeedHenry 2011
var request = require('request');

module.exports = {
  'test OPTIONS request responds with the expected headers on cloud call' : function(test, assert) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/cloud/echo' }, function(err, response, body){
      assert.ok(!err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type");
      assert.ok(headers['access-control-allow-methods'] === "POST, GET, OPTIONS");
      assert.ok(headers['access-control-allow-credentials'] === "true");
      test.finish();
    });
  },
  'test OPTIONS request responds with the expected headers on mBaaS DB call': function(test, assert) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/mbaas/db' }, function(err, response, body){
      assert.ok(!err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type");
      assert.ok(headers['access-control-allow-methods'] === "POST, GET, OPTIONS");
      assert.ok(headers['access-control-allow-credentials'] === "true");
      test.finish();
    });
  },
  'test OPTIONS request responds with the expected headers on sys/info/ping call': function(test, assert) {
    request({ method: 'OPTIONS', url : process.env.FH_TEST_HOSTNAME + '/sys/info/ping' }, function(err, response, body){
      assert.ok(!err);
      var headers = response.headers;
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['access-control-allow-headers'] === "Origin, X-Request-With, Content-Type");
      assert.ok(headers['access-control-allow-methods'] === "POST, GET, OPTIONS");
      assert.ok(headers['access-control-allow-credentials'] === "true");
      test.finish();
    });
  }
};
