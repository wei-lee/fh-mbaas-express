var headersUtils = require('./headers');
module.exports = function(response){


  return {
    "forms": {
      "getForm" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "getForms" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "getTheme" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "submitFormData" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "submitFormFile" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "getSubmissionStatus" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "completeSubmission" : function(responseContent){
        this.respondJSON(responseContent);
      },
      "respondJSON" : function(responseContent){
        var headers = headersUtils({"Cache-Control": "no-cache", "Content-Type": "application/json"});

        response.writeHead(200, headers);
        response.end(JSON.stringify(responseContent));
      }
    }
  }
}