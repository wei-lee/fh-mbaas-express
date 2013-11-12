var assert = require('assert');
var request = require('request');
var nock = require('nock');
var fs = require('fs');
var restler = require('restler');


module.exports = {
  "setUp" : function(finish){
    finish();
  },
  "tearDown" : function(finish){
    finish();
  },
  "test_form_call_to_getForms" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid123456",
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
  "test form call to getForm" : function(finish){
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid123456/formid123456",
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
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/appid123456/theme",
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
    request.post(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/formId123456/submitFormData",
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
//  "test form call to submitFormFile" : function(finish){
//
//    var filePath = "./test/fixtures/test.pdf";
//    fs.stat(filePath, function(err, stats) {
//      assert.ok(!err);
//      restler.post(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/submitId123456/submitFormFile", {
//        multipart: true,
//        headers : {"x-fh-auth-app": "testkey", "Content-Length":stats.size},
//        data: {
//          "__fh":{"appkey":"testkey","userkey":"akey"},
//          "test.pdf": restler.file(filePath, null, stats.size, null, "application/pdf")
//        }
//      }).on("complete", function(data) {
//        assert.ok(data);
//        assert.ok(data.status === "ok");
//        finish();
//      });
//    });
//  },
  "test form call to completeFormSubmission" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/submitId123456/completeSubmission",
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
    request.get(process.env.FH_TEST_HOSTNAME + "/mbaas/forms/submitId123456/status",
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