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