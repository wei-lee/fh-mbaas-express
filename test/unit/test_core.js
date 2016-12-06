var assert = require('assert');
var rewire = require("rewire");
var core = rewire('../../lib/core.js');
var mockAPI = require('../fixtures/mockAPI.js');

exports.it_shoudld_test_auth_success = function (finish) {
  var opts = {
    localAuth: {
      status: 401,
      body: {
        "message": "not authorised"
      }
    }
  };

  var req = {
    pause: function () { },
    resume: function () { }
  };

  var res = {
    status: function (status) {
      assert.equal(status, opts.localAuth.status)
      return res;
    },
    json: function (body) {
      assert.equal(body.message, opts.localAuth.body.message)
      finish();
    }
  };

  core.__set__("fh", mockAPI);
  var performAuth = core.__get__("performAuth");
  var authCall = performAuth(opts);
  mockAPI.auth.performAuth = function (req, localAuth, cb) {
    return cb(null, opts.localAuth);
  };

  authCall(req, res, function (err, resp) {
    return finish();
  });
};

exports.it_shoudld_test_auth_failure = function (finish) {
  var opts = { localAuth: {} };

  var req = {
    pause: function () { },
    resume: function () { }
  };

  var res = {
    status: function (status) {
      return res;
    },
    json: function (body) {
      finish();
    }
  };

  var err = {
    next: function () {
      return err;
    }
  };

  core.__set__("fh", mockAPI);
  var performAuth = core.__get__("performAuth");
  var authCall = performAuth(opts);
  mockAPI.auth.performAuth = function (req, localAuth, cb) {
    return cb(null, err);
  };

  authCall(req, res, function (err, resp) {
    assert.ok(err);
    return finish();
  });
};

exports.it_shoudld_test_auth_not_found = function (finish) {
  var opts = { localAuth: {} };

  var req = {
    pause: function () { },
    resume: function () { }
  };

  var res = {
    status: function (status) {
      assert.equal(status, 404);
      return res;
    },
    end: function () {
      finish();
    }
  };

  var performAuth = core.__get__("performAuth");
  var authCall = performAuth(opts);
  mockAPI.auth.performAuth = null;

  authCall(req, res, function (err, resp) {
    return finish();
  });
};