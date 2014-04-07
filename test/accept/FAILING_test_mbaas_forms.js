var assert = require('assert');
var request = require('request');
var nock = require('nock');
var fs = require('fs');
var util = require('util');

module.exports = {
  "setUp" : function(finish){
    finish();
  },
  "tearDown" : function(finish){
    finish();
  },
  "test_form_call_to_getconfig_with_no_deviceID" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/config",
      {
        json:{
        },
        headers : {
          'Content-Type' : 'application/json'
        }
      },
      function(err, res, data){
        console.log(" ***** CONFIG ******* return data ", err, data);
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status !== "ok", "should have returned error: not deviceid sent");
        assert.notEqual(res.statusCode, 200, 'should have returned http error - status: ' + util.inspect(res.statusCode));
        finish();
      });
  },
  "test_form_call_to_getconfig" : function(finish){
    var api = "/mbaas/forms/{{appid}}/config/{{deviceid}}";
    var TEST_APPID = "appid";
    var TEST_DEVICEID = "myspecialdevice";

    var url = process.env.FH_TEST_HOSTNAME + api.replace("{{appid}}", TEST_APPID).replace("{{deviceid}}", TEST_DEVICEID);

    request.get(url,
      {
        json:{
        },
        headers : {
          'Content-Type' : 'application/json'
        }
      },
      function(err, res, data){
        console.log(" ***** CONFIG ******* return data ", err, data);
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        assert.equal(data.called, "getAppClientConfig", "called incorrect forms function: " + util.inspect(data));
        assert.equal(data.params.deviceId, TEST_DEVICEID, "did not pass device ID to forms function: " + util.inspect(data));
        assert.equal(data.params.appClientId, TEST_APPID, "did not pass app ID to forms function: " + util.inspect(data));

        finish();
      });
  },
  "test_form_call_to_getForms" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        console.log(" ************ return data ", err, data);
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  },
  "test form call to getForm" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/formid123456",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  },
  "test form call to getTheme" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/theme",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  },
  "test form call to submitFormData" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/formId123456/submitFormData",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  },
  "test form call to completeFormSubmission" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/submitId123456/completeSubmission",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        console.log(err, data);
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  },
  "test form call to getSubmissionStatus" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid/submitId123456/status",
      {
        json:{
          "__fh":{"appkey":"testkey","userkey":"akey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app": "testkey"
        }
      },
      function(err, res, data){
        assert.ok(!err);
        assert.ok(data);
        assert.ok(data.status === "ok");
        finish();
      });
  }
}