var util = require('util');
var messaging = require('./common/message.js')();

function errorHandler() {
  process.on('uncaughtException', function (err) {
    err = err || {};
    errorHandler(err, null, null, null);
  });

  return errorHandler;

  function errorHandler(err, req, res, next){
    console.log("Internal error: " + util.inspect(err));
    console.error("Internal error: " + util.inspect(err));
    if (err && err.stack) console.error(util.inspect(err.stack));

    var error = {
      msg: "Internal error: " + err,
      error: util.inspect(err)
    };
    if (res) {
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    }
    putErrorOnBus(error, function(err){
      shutdown(1);
    });
  }
}

function putErrorOnBus(mess, cb){
  messaging.getAmqp(function(err, amqpInst){
    //ignoring err as only interested in if we have a connection
    if(amqpInst){
      amqpInst.sendErrorMessage(mess, cb);
    }else{
      process.nextTick(function() {
        return cb();
      });
    }
  });
};

function shutdown(code) {
  process.nextTick(function() {
    var c = code? code: 1;

    // TODO - look into graceful app shutdown here..
    process.exit(c);
  });
};

exports.errorHandler = errorHandler;