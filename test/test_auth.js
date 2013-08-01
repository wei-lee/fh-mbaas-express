var assert = require('asserto');
util = require('util');
module.exports = {
  "test authed call with header" : function (done){
    assert.response({
      url : '/cloud/doAuthedCall/',
      method : 'POST',
      data : JSON.stringify({}),
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"testkey"
      }
    }, {status : 200}, function(err, res) {
      var d1 = JSON.parse(res.body);
      assert.ok(!err);
      assert.notEqual(d1, null);
      done();
    });
  },
  "test auth call with param key": function(done){
    assert.response({
      url : '/cloud/doAuthedCall/',
      method : 'POST',
      data : JSON.stringify({__fh:{"appkey":"testkey"}}),
      headers : {
        'Content-Type' : 'application/json'
      }
    }, {status : 200}, function(err, res) {
      assert.ok(!err);
      var d1 = JSON.parse(res.body);
      assert.notEqual(d1, null);
      done();
    });
  },
  "test auth fails with wrong header key": function(done){
    assert.response({
      url : '/cloud/doAuthedCall/',
      method : 'POST',
      data : JSON.stringify({}),
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"wrongkey"
      }
    }, {status : 401}, function(err, res) {
      assert.ok(!err);
      assert.ok(res && res.body);
      done();
    });
  },
  "test auth fails with wrong param key" : function (done){
    assert.response({
      url : '/cloud/doAuthedCall/',
      method : 'POST',
      data : JSON.stringify({__fh:{"appkey":"wrongkey"}}),
      headers : {
        'Content-Type' : 'application/json'
      }
    }, {status : 401}, function(err, res) {
      var d1 = JSON.parse(res.body);
      assert.notEqual(d1, null);
      done();
    });
  }
};