var request = require('request'),
util = require('util');
var assert = require('assert');

module.exports = {
  'test a plaintext object response' : function(finish) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/textplain', {
      body: JSON.stringify({foo: 'bar'}),
      headers : {
        'Content-Type' : 'text/plain'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.equal(200, response.statusCode, "Unexpected response: " + body);
      var ret = JSON.parse(body);
      assert.equal(ret.foo, 'bar', "foo !== bar! - " + util.inspect(ret));
      finish();
    });
  },
  'test a plaintext text response' : function(finish) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/textreturn', {
      headers : {
        'Content-Type' : 'text/plain'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.equal(200, response.statusCode, "Unexpected response: " + body);
      assert.ok(typeof body === 'string');
      assert.equal(body, 'text', "Body is not plaintext");
      finish();
    });
  }
};