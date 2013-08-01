var assert = require('asserto');
module.exports = {
  'test jsonp' : function(done) {
    assert.response({
      url : '/cloud/jsonp?_callback=jsonpfunc&_jsonpdata=%7B%22foo%22%3A%22bar%22%7D',
      method : 'GET'
    }, {
      status : 200
    }, function(err, res) {
      assert.ok(!err);
      assert.equal('text/javascript', res.headers['content-type']);
      assert.notEqual(res.body.indexOf('jsonpfunc'), -1);
      assert.notEqual(res.body.indexOf("bar"), -1);
      done();
    });
  },
  'test html' : function(done) {
    assert.response({
      url : '/cloud/html',
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      }
    }, {
      status : 200
    }, function(err, res) {
      assert.ok(!err);
      assert.equal(res.headers['content-type'], 'text/html');
      assert.equal(res.body, '<html><body>Hello World</body></html>');
      done();
    });
  }
};
