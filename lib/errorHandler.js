var util = require('util');
var messaging = require('./common/message.js')();

function errorHandler() {
  return function errorHandler(err, req, res, next){
    res.statusCode = 500;

    console.log("Internal error: " + util.inspect(err));
    console.error("Internal error: " + util.inspect(err));
    if (err && err.stack) console.error(util.inspect(err.stack));

    var error = {
      msg: "Internal error: " + err,
      error: util.inspect(err)
    };
    res.end(JSON.stringify(error));

    putErrorOnBus(error, function(err){
      shutdown(1);
    });
  };
};

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

process.on('SIGTERM', function () {
  shutdown(0);
});

process.on('SIGHUP', function () {
  shutdown(0);
});

exports.errorHandler = errorHandler;