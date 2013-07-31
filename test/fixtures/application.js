var webapp = require('fh-webapp').init(require('main.js')); //TODO: Implicitly requires mainjs :-(
var express = require('express');
//$fh = require('fh-api');

var app = express();
app.use('/sys', webapp.sys);
app.use('/mbass', webapp.mbaas);
app.use('/cloud', webapp.cloud);

app.listen(3000);
