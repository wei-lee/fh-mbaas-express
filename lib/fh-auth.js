var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./common/cors');
var fhMbaasApi = require('./common/fhMbaasApi');
var app = express.Router();
var fh = fhMbaasApi.getFhApi();

//performs authentication request ($fh.auth)
function performAuth(opts) {
  var localAuth = opts.localAuth;
  return function (req, res, next) {
    if (fh && fh.auth && fh.auth.performAuth) {
      req.pause();
      fh.auth.performAuth(req, localAuth, function (err, fhres) {
        req.resume();
        if (err) {
          next(err);
        } else {
          return res.status(fhres.status).json(fhres.body);
        }
      });
    } else {
      return res.status(404).end();
    }
  };
};

app.use(cors());
app.use(bodyParser.json({ "limit": "10mb" }));
module.exports = function (opts) {
  app.post('/srv/1.1/admin/authpolicy/auth', performAuth(opts || {}));
  return app;
};