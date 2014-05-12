var cors = require('cors');

var options = {
  'methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
  'credentials': true,
  'headers': 'Origin, X-Request-With, Content-Type, x-fh-auth-app, x-fh-auth-user',
  //cache the preflight response for 1 days so that the browser will not make preflight request for every cloud call
  'maxAge': 60*60*24
};

module.exports = function(){
  return cors(options);
};