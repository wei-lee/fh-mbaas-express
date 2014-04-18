var express = require('express');
var headersUtils = require('./common/headers.js');
var util = require('util');
var cors = require('./common/cors');

/*
 Handles everything under /sys
 Internal piping & monitoring
 Note: the reference to main.js is used in 'sys/endpoints'
 */
module.exports = function(mainjs){
  var sys = express.Router();
  sys.use(cors());

  sys.get('/info/ping', function (req, res) {
    res.writeHead(200, headersUtils({ 'content-type' : 'text/plain' }));
    res.end(JSON.stringify("OK"));
  });

  sys.get('/info/memory', function (req, res) {
    res.writeHead(200, headersUtils());
    res.end(JSON.stringify(process.memoryUsage()));
  });

  // Lists the endpoints available in main.js for consumption
  sys.get('/info/endpoints', function (req, res) {
    var ret = {endpoints:[]};
    for(var p in mainjs){
      if(mainjs.hasOwnProperty(p) && 'function' === typeof  mainjs[p]){
        ret["endpoints"].push(p);
      }
    }
    res.writeHead(200, headersUtils());
    res.end(JSON.stringify(ret));
  });

  sys.get('/info/version', function (req, res) {
    var headers = headersUtils({ 'content-type' : 'text/plain' });
    res.writeHead(200, headers);
    res.end(headers['X-FH-Api-Version']);
  });

  return sys;
};