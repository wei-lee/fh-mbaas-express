var request = require('request');
module.exports = {
  "test authed call with header" : function(test, assert){
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
      test.finish();
    });
  },
  "test auth call with param key" : function(test, assert){
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
      test.finish();
    });
  },
  "test auth fails with wrong header key": function(test, assert){
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
      test.finish();
    });
  },
  "test auth fails with wrong param key" : function(test, assert){
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
      test.finish();
    });
  }
};