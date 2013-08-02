// Copyright (c) FeedHenry 2011
var request = require('request');

module.exports = {
  'test sys/info/ping endpoint' : function(test, assert) {

    request(process.env.FH_TEST_HOSTNAME + '/sys/info/ping', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(body === "\"OK\"");
      test.finish();
    });
  },
  'test sys/info/memory endpoint' : function(test, assert) {

    request.get(process.env.FH_TEST_HOSTNAME + '/sys/info/memory', {
      json : {} // force request to make body json
    },
    function(err, response, data){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(data);
      assert.ok(data.heapTotal);
      test.finish();
    });
  },
  "test /sys/info/endpoints endpoint": function (test, assert){
    request.get(process.env.FH_TEST_HOSTNAME + '/sys/info/endpoints',
    {
      json : {} // forces Request to parse the response as json
    },
    function(err, response, data){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(response.statusCode === 200);
      assert.ok(data);
      assert.ok(data.endpoints);
      assert.ok(data.endpoints.length > 0);
      test.finish();
    });
  },
  'test sys/info/version endpoint' : function(test, assert) {

    request(process.env.FH_TEST_HOSTNAME + '/sys/info/version', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(body);
      test.finish();
    });
  }
};
