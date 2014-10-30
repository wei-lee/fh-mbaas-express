var util = require('util');
var assert = require('assert');
var proxyquire = require('proxyquire');

var mockConnection = function(){
}

mockConnection.prototype.connectToCluster = function(){};
mockConnection.prototype.on = function(){};
mockConnection.prototype.publishTopic = function(){};

var mockAMQP = {
  AMQPManager: mockConnection
}

exports.it_should_test_message = function(finish) {

  // This could do with a better test.. the following just about hits 70% code coverage

  process.env.FH_AMQP_APP_ENABLED = true;
  process.env.FH_AMQP_VHOST = '/fhevents';

  var message = proxyquire('common/message.js', {'fh-amqp-js': mockAMQP})();
  console.log("message: " + util.inspect(message));
  var mgr = message.getAmqpManager();
  finish();
};
