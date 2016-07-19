var request = require('request');
var assert = require('assert');


module.exports = {
  'test binary retObject' : function(finish) {
    request(process.env.FH_TEST_HOSTNAME + '/cloud/retObject?p1=v1', function(err, response, body){
      assert.ok(!err);
      assert.ok(response.statusCode === 200);
      assert.ok(response.headers['content-type'] && response.headers['content-type'].indexOf('application/json')>-1);
      assert.ok(body, {hello:'world'});
      finish();
    });
  },

  'test binary retString' : function(finish) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/retString?p1=v1',
    {
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.ok(response && response.statusCode === 200);
      assert.ok('text/plain' === response.headers['content-type']);
      assert.ok(body === '<html><body>Hello World</body></html>');
      finish();
    });
  },

  'test binary retBinary' : function(finish) {
    var complete = false;
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/retBinary?p1=v1',
    {
      headers : {
        'Content-Type' : 'application/json'
      }
    }, function(err, response, body){
      assert.ok(!err);
      assert.ok(response && response.statusCode === 200);
      assert.ok(response.headers['content-type'] === 'image/png');
      var receivedData = new Buffer(2048);
      var bufferlen = 0;
      //assert.ok(body instanceof Buffer); //TODO: Figure out what's going on here - this never passed?
      finish();

//      response.on('data', function(chunk) {
//        chunk.copy(receivedData, bufferlen);
//        bufferlen += chunk.length;
//      });
//      response.on('end', function () {
//        assert.ok(receivedData[0] = 0);
//        assert.ok(receivedData[1] = 1);
//        assert.ok(receivedData[2] = 2);
//        assert.ok(receivedData[10] = 10);
//        assert.ok(receivedData[13] = 13);
//        assert.ok(receivedData[20] = 'A');
//        complete = true;
//      });

    });
//    setTimeout(function() {
//      assert.ok(complete);
//      finish();
//    }, 1000);
  }
};
