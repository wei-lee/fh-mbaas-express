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

exports.retObject = function(params, callback) {
  return callback(null, {hello: 'world'});
};

exports.retString = function(params, callback) {
  var html = "<html>"
  + "<body>"
  + "Hello World"
  + "</body>"
  + "</html>";

  return callback(null, html);
};

exports.retBinary = function(params, callback) {
  var buf = new Buffer([0,1,2,3,4,5,6,7,8,9,10,11,12,13,26,13,10,13,10,65,65,65]);

  return callback(null, buf, {'Content-Type': "image/png"});
};

exports.textplain = function(params, callback) {
  return callback(null, {foo: params.foo});
};

exports.textreturn = function(params, callback){
  return callback(null, 'text')
};

var b1mb = new Buffer(1048576);
b1mb.fill('h');
exports.d1mb = function(params, callback){
  return callback(null, b1mb);
};

var b100kb = new Buffer(102400);
b100kb.fill('h');
exports.d100kb = function(params, callback){
  return callback(null, b100kb);
};

