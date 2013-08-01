exports.getConfig = function(params, callback){
  return callback(null, { ok : true });
};

exports.echo = function(params, callback){
  return callback(null, params.echo);
};

exports.helloWorld = function(params, callback) {
  return callback(null, JSON.stringify('well ' + params.name));
};

exports.error = function(params, callback){
  return callback({error : "Something gone done messed up!"});

};

exports.jsonp = function(params, callback) {
  var bar = params.foo;
  return callback(null, {hello: 'world', foo: bar});
};

exports.html = function(params, callback) {
  var html = "<html>"
  + "<body>"
  + "Hello World"
  + "</body>"
  + "</html>";

  return callback(null, html, {'Content-Type' : 'text/html'});
};

exports.doAuthedCall = function (params, cb){
  return cb(undefined, {"done":true});
};

exports.doNonAuthCall = function (params, cb){
  return cb(undefined, {"done":process.env});
};