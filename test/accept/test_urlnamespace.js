/*
  Tests all the stuff that isn't covered by /cloud/someact
 */
var request = require('request');
var assert = require('assert');

module.exports = {
  'test / endpoint' : function(finish) {

    request(process.env.FH_TEST_HOSTNAME + '/', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(response.statusCode = 200);
      assert.ok(body === "Your Cloud App is Running");
      finish();
    });
  },
  'test /cloud endpoint' : function(finish) {

    request.get(process.env.FH_TEST_HOSTNAME + '/cloud',
      {
        json : {} // force request to parse incoming json
      },
      function(err, response, data){
        assert.ok(!err);
        assert.ok(response);
        assert.ok(data.error === "Error: no function specified");
        finish();
    });
  }
};
