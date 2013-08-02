/*
  Tests param returning under different scenarios
 */
var request = require('request');

module.exports = {
  'test hello world with params' : function(test, assert) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/helloWorld/', {
      json: {'name': 'fred'},
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(response.statusCode === 200);
      assert.equal(body, 'well fred');
      test.finish();
    });
  },
  'test echo with many types of params in POST' : function(test, assert) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/echo', {
      json: {
        echo :
          { 'string': 'abc', number : 0, bool : true, emptyObject : {}, array : [1,2,3]
        }
      },
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, data){
      assert.ok(response.statusCode === 200);
      assert.equal(typeof data, 'object');
      assert.ok(typeof data.string === 'string');
      assert.ok(typeof data.number === 'number');
      assert.ok(typeof data.bool === 'boolean');
      assert.ok(typeof data.emptyObject === 'object');
      assert.ok(data.array instanceof Array);
      assert.ok(data.array.length === 3);
      test.finish();

    });
  },
  'test echo with many types of params in GET query string' : function(test, assert) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/echo', {
      qs: {
        echo :
        { 'string': 'abc', number : 0, bool : true, emptyObject : {}, array : [1,2,3]
        }
      },
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(response.statusCode === 200);
      var data = JSON.parse(body);
      assert.equal(typeof data, 'object');
      assert.ok(typeof data.string === 'string');
      assert.ok(data.number === '0');
      assert.ok(data.bool === 'true');
      assert.ok(data.array instanceof Array);
      assert.ok(data.array.length === 3);
      test.finish();
    });
  }
};
