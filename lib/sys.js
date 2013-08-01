var connect = require('fh-connect'),
mainjs;

/*
  Handles everything under /sys
  Internal piping & monitoring
 */
var sys = connect(
  connect.router(function (app) {
    // Used by monitoring tools to verify the application is running OK
    app.get('/info/ping', function (req, res) {
      res.end(JSON.stringify("OK"));
    });
    app.get('/info/memory', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(process.memoryUsage()));
    });
    // Lists the endpoints available in main.js for consumption
    app.get('/info/endpoints', function (req, res) {
      var ret = {endpoints:[]};
      for(var p in mainjs){
        if(mainjs.hasOwnProperty(p) && 'function' === typeof  mainjs[p]){
          ret["endpoints"].push(p);
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(ret));
    });
    app.get('/info/port', function (req, res) {
      // console.log("ha: " + util.inspect(ha))
      var port = ha.getPort(); //TODO: WTF is this!?
      res.end("" + port);
    });
  })
);

/*
  Sys is init'd with a reference to main.js
  Allows sys/endpoints to be listed
 */
module.exports = function(main){
  mainjs = main;
  return sys;
};