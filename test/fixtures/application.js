var api = require('./mockAPI.js');
var express = require('express');
var mainjs = require('./main.js');

var mbaasExpress = api.mbaasExpress();
var app = express();
app.use('/sys', mbaasExpress.sys(mainjs));
app.use('/mbaas', mbaasExpress.mbaas);

app.use(mbaasExpress.fhmiddleware());
app.use('/cloud', mbaasExpress.cloud(mainjs));

// You can define custom URL handlers here, like this one:
app.use('/', function(req, res){
  res.end('Your Cloud App is Running');
});

module.exports = app.listen(process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001);
