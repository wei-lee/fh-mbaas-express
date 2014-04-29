var request = require('request');
var assert = require('assert');

module.exports = {
  "test authed call with header" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/doAuthedCall/',
    {
      json:{},
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"testkey"
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.notEqual(data, null);
      finish();
    });
  },
  "test auth call with param key" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/doAuthedCall/',
    {
      json : {__fh:{"appkey":"testkey"}},
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.notEqual(data, null);
      finish();
    });
  },
  "test auth call with api key header" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/doAuthedCall/',
    {
      json : {},
      headers : {
        'Content-Type' : 'application/json',
        'X-FH-appkey': 'testkey'
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.notEqual(data, null);
      finish();
    });
  },
  "test auth fails with wrong header key": function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/doAuthedCall/',
    {
      json : {},
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"wrongkey"
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(response.statusCode === 401);
      assert.ok(response && data);
      finish();
    });
  },
  "test auth fails with wrong param key" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/doAuthedCall/',
    {
      json : {__fh:{"appkey":"wrongkey"}},
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(response.statusCode === 401);
      assert.notEqual(data, null);
      finish();
    });
  }
};