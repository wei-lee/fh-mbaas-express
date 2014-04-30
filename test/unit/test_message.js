var util = require('util');
var assert = require('assert');
var proxyquire = require('proxyquire');

exports.it_should_test_message = function(finish) {

  // This could do with a better test.. the following just about hits 70% code coverage

  process.env.FH_AMQP_APP_ENABLED = true;
  process.env.FH_AMQP_VHOST = '/fhevents';

  var message = proxyquire('common/message.js', {})();
  console.log("message: " + util.inspect(message));
  var mgr = message.getAmqpManager();
  finish();
};
