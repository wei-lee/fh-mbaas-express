// Copyright (c) FeedHenry 2011
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
  }
};
