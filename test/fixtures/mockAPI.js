var fs = require('fs');
var util = require('util');

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
      return cb(undefined, {"status" : "ok", called: "submitFormFile", params: params});
    },
    "getSubmissionStatus" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "getSubmissionStatus", params: params});
    },
    "completeSubmission" : function(params, cb){
      return cb(undefined, {"status" : "ok", called: "completeSubmission", params: params});
    },
    "getSubmission" : function(params, cb){
      if(params.submission.submissionId === "submitIdDoesNotExist"){
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