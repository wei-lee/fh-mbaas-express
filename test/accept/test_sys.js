// Copyright (c) FeedHenry 2011
var request = require('request');
var assert = require('assert');
var mockApi = require('../fixtures/mockAPI');

module.exports = {
  'test sys/info/ping endpoint' : function(finish) {

    request(process.env.FH_TEST_HOSTNAME + '/sys/info/ping', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(body === "\"OK\"");
      finish();
    });
  },
  'test sys/info/memory endpoint' : function(finish) {

    request.get(process.env.FH_TEST_HOSTNAME + '/sys/info/memory', {
      json : {} // force request to make body json
    },
    function(err, response, data){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(data);
      assert.ok(data.heapTotal);
      finish();
    });
  },
  "test /sys/info/endpoints endpoint": function (finish){
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
      finish();
    });
  },
  'test sys/info/version endpoint' : function(finish) {

    request(process.env.FH_TEST_HOSTNAME + '/sys/info/version', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(response.headers['x-fh-mbaas-api-version']);
      assert.equal(mockApi.getVersion(), response.headers['x-fh-mbaas-api-version']);
      assert.ok(body);
      finish();
    });
  }
};
