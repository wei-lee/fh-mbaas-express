var request = require('request');
var assert = require('assert');

module.exports = {
  'test hello world with params' : function(finish) {
    request.post(process.env.FH_TEST_HOSTNAME + '/cloud/helloWorld/', {
      json: {'name': 'fred'},
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(response.statusCode === 200);
      assert.equal(body, 'well fred');
      finish();
    });
  }
};
