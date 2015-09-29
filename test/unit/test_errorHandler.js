var util = require('util');
var assert = require('assert');
var proxyquire = require('proxyquire');

exports.it_should_test_error_handler = function(finish) {

  var eh = proxyquire('errorHandler.js', { 'fh-mbaas-client': {
    'initEnvironment': function(env, obj){},
    'app':{
      'events':{
        'create': function (obj, cb){
          return cb();
        }
      }
    }
  }});

  var originalExit = process.exit;

  var res = {
    end: function(){
      console.log("got end", arguments);

      setTimeout(function(){
        process.exit = originalExit;
        finish();
      }, 1000);
    }
  };


  process.exit = function() {}

  eh.errorHandler()({ msg: 'test error' }, null, res, null);
};
