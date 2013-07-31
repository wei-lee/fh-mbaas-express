var fh-webapp = require('fh-nodeapp');
var express = require('express');
$fh = require('fh-api');

var app = express();
app.use('/sys', fh-webapp.sysHandler);
app.use('/mbass', fh-webapp.mbassHandler);
app.use('/cloud', fh-webapp.cloudHandler(require('main.js'));

app.listen(3000);
