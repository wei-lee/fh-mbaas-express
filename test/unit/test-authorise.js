var proxyquire = require('proxyquire');
var sinon = require('sinon');
var assert = require('assert');

var getFunc = sinon.stub();
var authenticate = proxyquire('../../lib/common/authenticate', {
  request: {
    get: getFunc
  }
});

module.exports = {
  "test authorise caching": function(finish) {
    process.env.FH_MILLICORE = 'testing.feedhenry.me';
    process.env.FH_MILLICORE_PROTOCOL = 'https';
    process.env.FH_ENV = "dev";

    var req = {
      headers: {
        'x-fh-auth-app': "testkey",
        'x-fh-auth-user': "fakeuserkey"
      }
    };
    getFunc.yieldsAsync(null, {statusCode: 200}, {});
    authenticate(req, {}, {requestedPermission: 'read'}).authorise('AppCloudDB', function(err) {
      console.log(err);
      assert.ok(!err, "authenticate.authorise read expects no error");

      getFunc.yieldsAsync(null, {statusCode: 401}, {});
      authenticate(req, {}, {requestedPermission: 'write'}).authorise('AppCloudDB', function(err) {
        assert.ok(err, 'authenticate.authorise write expects error');

        assert.equal(err.code, 401);
        finish();
      })
    })
  }
}