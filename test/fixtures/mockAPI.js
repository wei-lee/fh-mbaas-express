
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
    }
  }
}