var request = require('request'),
util = require('util');
module.exports = {
  'test a plaintext object response' : function(test, assert) {
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
      test.finish();
    });
  },
  'test a plaintext text response' : function(test, assert) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/textreturn', {
      headers : {
        'Content-Type' : 'text/plain'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.equal(200, response.statusCode, "Unexpected response: " + body);
      assert.ok(typeof body === 'string');
      assert.equal(body, 'text', "Body is not plaintext");
      test.finish();
    });
  }
};