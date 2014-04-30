var fs = require('fs');
var util = require('util');
var assert = require('assert');

var testFileLoc = __dirname + '/test.pdf';



module.exports = {
  "forms" : {
    "getAppClientConfig" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getAppClientConfig", params: params});
    },
    "getForms" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getForms", params: params});
    },
    "getForm" :function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getForm", params: params});
    },
    "getTheme" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getTheme", params: params});
    },
    "submitFormData" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "submitFormData", params: params});
    },
    "submitFormFile" : function(params, cb){
      assert.ok(params, "Expected params to submitFormFile");
      assert.ok(params.submission, "Expected submission in params");
      assert.ok(params.submission.fileStream, "Expected a file stream path");
      assert.ok(params.submission.fileName, "Expected a file name");
      console.log("mock params: ", JSON.stringify(params));
      return cb(undefined, {"status" : "ok", called: "submitFormFile"});
    },
    "getSubmissionStatus" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getSubmissionStatus", params: params});
    },
    "completeSubmission" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "completeSubmission", params: params});
    },
    "getSubmission" : function(params, cb){
      assert.ok(params.submissionId, "Expected a submissionId but got none");
      if(params.submissionId === "submitIdDoesNotExist"){
        return cb(new Error("Does not exist"), {});
      } else {
        return cb(undefined, {_id: "testSubmissionId"});
      }
    },
    "getSubmissionFile" : function(params, cb){
      var stats = fs.statSync(testFileLoc);
      var statsDetails = stats;
      var fileStream = fs.createReadStream(testFileLoc);
      fileStream.pause();
      return cb(undefined, {
        stream: fileStream,
        length: statsDetails.size,
        type: "application/pdf"
      });
    }
  },
  "stats": {
    "timing": function(){
      //console.log("Called Mock Timing");
    }
  },
  "db": function(params, callback){
    console.log("Called db: ", params);
    var dbReplies = {
      list : function(){
        return { count: 1,
          list:
            [ { type: 'myFirstEntity',
              guid: '520269c9891b400e59000002',
              fields:
              { firstName: 'Joe',
                lastName: 'Bloggs',
                address1: '22 Blogger Lane',
                address2: 'Bloggsville',
                country: 'Bloggland',
                phone: '555-123456' } }
            ]
        };
      }
    };
    if(callback) callback(undefined, dbReplies.list());
  }
}