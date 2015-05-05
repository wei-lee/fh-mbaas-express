var cors = require('cors');

var allowedHeaders = [
  'Origin',
  'X-Request-With',
  'Content-Type',
  'x-fh-auth-app',
  'x-fh-auth-user',
  'x-fh-cuid',
  'x-fh-cuidmap',
  'x-fh-destination',
  'x-fh-device',
  'x-fh-app_version',
  'x-fh-project_version',
  'x-fh-project_app_version',
  'x-fh-sessiontoken',
  'x-fh-appid',
  'x-fh-appkey',
  'x-fh-projectid',
  'x-fh-analyticstag',
  'x-fh-connectiontag',
  'x-fh-init'
];

var options = {
  'methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
  'credentials': true,
  'headers': allowedHeaders.join(','),
  //cache the preflight response for 1 days so that the browser will not make preflight request for every cloud call
  'maxAge': 60*60*24
};

module.exports = function(){
  return cors(options);
};