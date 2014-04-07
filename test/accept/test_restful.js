// Copyright (c) FeedHenry 2011
var request = require('request');
var assert = require('assert');
var util = require('util');

module.exports = {
  'test expected headers exist on cloud endpoint' : function(finish) {
    request(process.env.FH_TEST_HOSTNAME + '/cloud/echo', function(err, response, body){
      var headers = response.headers;
      assert.ok(response.headers['content-type'] && response.headers['content-type'].indexOf('application/json')>-1);
      assert.ok(headers['access-control-allow-origin'] === "*");
      assert.ok(headers['cache-control'] === "no-cache");
      assert.ok(headers['x-fh-api-version'].substring(0, 2) === "0.", util.inspect(headers));
      finish();
    });
  },
  'test JSON return gets back application/json' : function(finish) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/echo', function(err, response, body){

      assert.ok(response.headers['content-type'].indexOf("application/json")!= -1);
      finish();
    });
  },
  'test string return gets back text/plain' : function(finish) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/textreturn', function(err, response, body){
      assert.ok(response.headers['content-type'].indexOf("text/plain")!=-1);
      finish();
    });
  },
  'test /cloud/doesnotexist endpoint gets back 404' : function(finish) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/doesnotexist',
    {
      json : {} // force request to parse incoming json
    },
    function(err, response, data){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(data.error === "Error: no such function: doesnotexist");
      assert.ok(response.statusCode === 404);
      assert.ok(response.headers['content-type'] === 'application/json');
      finish();
    });
  }
};
