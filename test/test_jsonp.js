var request = require('request');
module.exports = {
  'test jsonp' : function(test, assert) {
    request(process.env.FH_TEST_HOSTNAME + '/cloud/jsonp?_callback=jsonpfunc&_jsonpdata=%7B%22foo%22%3A%22bar%22%7D', function(err, response, body){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.ok('text/javascript' === response.headers['content-type']);
      assert.ok(body.indexOf('jsonpfunc')>-1);
      assert.ok(body.indexOf("bar")>-1);
      test.finish();
    });
  },
  'test html' : function(test, assert) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/html',
    {
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.equal(response.headers['content-type'], 'text/html');
      assert.equal(body, '<html><body>Hello World</body></html>');
      test.finish();
    });
  }
};
