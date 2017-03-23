var request = require('request');
var assert = require('assert');

module.exports = {
  'test get sync stats ok' : function(finish) {
    request.get(process.env.FH_TEST_HOSTNAME + '/mbaas/sync/stats', {
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(response.statusCode === 200);
      finish();
    });
  }
};
