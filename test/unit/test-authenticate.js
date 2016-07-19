var authenticate = require('../../lib/common/authenticate');
var assert = require('assert');

module.exports = {
  "test service access using allowed project id": function(finish){
    process.env.FH_SERVICE_APP = 'true';
    process.env.FH_SERVICE_AUTHORISED_PROJECTS = "projectguid1,projectguid2";

    var req = {
      headers: {
        'x-request-with': "projectguid2"
      }
    };

    authenticate(req, {}, {}).authenticate("some/path/to/something", function(err){
      assert.ok(!err, "Expected No Error " + err);

      //Restore Env
      process.env.FH_SERVICE_APP = '';
      process.env.FH_SERVICE_AUTHORISED_PROJECTS = "";
      finish();
    });

  },
  "test service access using disallowed project id": function(finish){
    process.env.FH_SERVICE_APP = 'true';
    process.env.FH_SERVICE_AUTHORISED_PROJECTS = "projectguid1,projectguid2";

    var req = {
      headers: {
        'x-request-with': "wrongprojectguid"
      }
    };

    authenticate(req, {}, {}).authenticate("some/path/to/something", function(err){
      assert.ok(err, "Expected An Error ");
      assert.equal(401, err.code);
      assert.ok(err.message.indexOf('service') > -1, "Expected A Service Error Message");

      //Restore Env
      process.env.FH_SERVICE_APP = '';
      process.env.FH_SERVICE_AUTHORISED_PROJECTS = "";
      finish();
    });
  },
  "test service access using correct service access key": function(finish){
    process.env.FH_SERVICE_APP = 'true';
    process.env.FH_SERVICE_ACCESS_KEY = "accesskey1234";

    var req = {
      headers: {
        'x-fh-service-access-key': "accesskey1234"
      }
    };

    authenticate(req, {}, {}).authenticate("some/path/to/something", function(err){
      assert.ok(!err, "Expected No Error " + err);
      //Restore Env
      process.env.FH_SERVICE_APP = '';
      process.env.FH_SERVICE_ACCESS_KEY = "";
      finish();
    });
  },
  "test service access using incorrect service access key": function(finish){
    process.env.FH_SERVICE_APP = 'true';
    process.env.FH_SERVICE_ACCESS_KEY = "accesskey1234";

    var req = {
      headers: {
        'x-fh-service-access-key': "wrongaccesskey"
      }
    };

    authenticate(req, {}, {}).authenticate("some/path/to/something", function(err){
      assert.ok(err, "Expected An Error ");
      assert.equal(401, err.code);
      assert.ok(err.message.indexOf('service') > -1, "Expected A Service Error Message");
      //Restore Env
      process.env.FH_SERVICE_APP = '';
      process.env.FH_SERVICE_ACCESS_KEY = "";
      finish();
    });
  }
};
