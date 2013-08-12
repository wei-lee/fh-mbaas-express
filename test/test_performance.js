// Copyright (c) FeedHenry 2011
var request = require('request');

module.exports = {
  'test 1mb of data' : function(test, assert) {
    request(process.env.FH_TEST_HOSTNAME + '/cloud/d1mb', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(typeof body === 'string');
      assert.ok(body.length === 1048576);
      test.finish();
    });
  },
  'test high concurrency' : function(test, assert){
    var exec = require('child_process').exec;
    exec('ab -c 10 -n 1000 ' + process.env.FH_TEST_HOSTNAME + '/cloud/d100kb',
    function (error, stdout, stderr) {
      var rex = /Failed requests:\s.+0/;
      assert.ok(!error);
      assert.ok(stdout);
      assert.ok(rex.test(stdout));
      test.finish();
    });
    }
};
