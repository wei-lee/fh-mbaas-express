
module.exports = function(request){

  var domainDbUri = process.env.FH_DOMAIN_DB_CONN_URL;// Used in mbaas so this parameter should be set.
  return {
    "forms": {
      "getForm" : function(cb){
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;

        if(!reqParameters.appId){
          return cb(new Error("No appId in request to getForm"));
        }

        if(!reqParameters.formId){
          return cb(new Error("No formId in request to getForm"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in getForm"));
        }

        params.uri = domainDbUri;
        params.appId = reqParameters.appId;
        params.formId = reqParameters.formId;

        return cb(undefined, params);
      },
      "getForms" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;

        if(!reqParameters.appId){
          return cb(new Error("No appId in request to getForms"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in getForms"));
        }

        params.uri = domainDbUri;
        params.appId = reqParameters.appId;

        //All the parameters that are needed are present. //submission built
        return cb(undefined, params);
      },
      "getTheme" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;

        if(!reqParameters.appId){
          return cb(new Error("No appId in request to getTheme"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in getTheme"));
        }

        params.uri = domainDbUri;
        params.appId = reqParameters.appId;

        //All the parameters that are needed are present. //submission built
        return cb(undefined, params);
      },
      "submitFormData" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;
        var reqBody = request.body || {};

        if(!reqParameters.formId){
          return cb(new Error("No formId in request to submitFormData"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in submitFormData"));
        }

        params.uri = domainDbUri;
        params.submission = reqBody; //-- body of the post request is the content of the form.

        //All the parameters that are needed are present. //submission built
        return cb(undefined, params);
      },
      "submitFormFile" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};
        params.submission = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;
        var filesInRequest = request.files;
        if(!domainDbUri){
          return cb(new Error("No domain database specified in completeSubmission"));
        }

        if(!reqParameters.submitId){
          return cb(new Error("No sumbission id specified for submitFormFile"));
        }

        if(!reqParameters.fileId){
          return cb(new Error("No file id specified for submitFormFile"));
        }

        if(!reqParameters.fieldId){
          return cb(new Error("No field id specifed for submitFormFile"));
        }


        if(!filesInRequest){
          return cb(new Error("No files submitted for submitFormFile"));
        }

        //All requried parameters exist, build the submission request.

        params.uri  = domainDbUri;
        params.submission.submissionId = reqParameters.submitId;
        params.submission.fileId = reqParameters.submitId;
        params.submission.fieldId = reqParameters.fieldId;
        params.submission.fileStream = filesInRequest.files.path;
        params.submission.fileName = filesInRequest.files.name;

        return cb(undefined, params);
      },
      "getSubmissionStatus" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;

        if(!reqParameters.submitId){
          return cb(new Error("No submission id specified for getSubmissionStatus"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in submitFormData"));
        }

        params.uri = domainDbUri;
        params.submission = {};
        params.submission.submissionId = reqParameters.submitId;

        return cb(undefined, params);
      },
      "completeSubmission" : function(cb){
        //A valid getForms request must have an appId parameter set
        var params = {};

        //Get the content body for normal parameters
        var reqParameters = request.params;

        if(!reqParameters.submitId){
          return cb(new Error("No submission id specified for completeSubmission"));
        }

        if(!domainDbUri){
          return cb(new Error("No domain database specified in completeSubmission"));
        }

        params.uri = domainDbUri;
        params.submission = {};
        params.submission.submissionId = reqParameters.submitId;

        return cb(undefined, params);
      }
    }
  }
}