var webapp = require('fh-webapp').init(require('main.js')); //TODO: Implicitly requires mainjs :-(
var express = require('express');
//$fh = require('fh-api'); // TODO: Write fh-api

var app = express();
//app.use(express.bodyParser()); // this causes issues. Why?
app.use('/sys', webapp.sys);
app.use('/mbass', webapp.mbaas);
app.use('/cloud', webapp.cloud);

module.exports = app.listen(3000);