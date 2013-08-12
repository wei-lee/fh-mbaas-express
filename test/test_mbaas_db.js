var request = require('request');
module.exports = {
  "setUp" : function(test, assert){

    test.finish();
  },
  "test DB call with correct api key" : function(test, assert){
    request.post(process.env.FH_TEST_HOSTNAME + '/mbaas/db/',
    {
      json:{
        "act": "list",
        "type": "myFirstEntityy"
      },
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"testkey"
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(data.list);
      assert.ok(typeof data.count === "number");
      test.finish();
    });
  },
  "test mbaas DB call with incorrect api key" : function(test, assert){
    request.post(process.env.FH_TEST_HOSTNAME + '/mbaas/db/',
    {
      json:{
        "act": "list",
        "type": "myFirstEntityy"
      },
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"wrongkey"
      }
    }, function(err, response, data){
      assert.ok(response.statusCode === 401);
      assert.ok(data.message === 'invalid key');
      test.finish();
    });
  },
  tearDown : function(test, assert){
    test.finish();
  }
};