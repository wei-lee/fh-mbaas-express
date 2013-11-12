module.exports = function(response){


  return {
    "forms": {
      "getForm" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "getForms" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "getTheme" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "submitFormData" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "submitFormFile" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "getSubmissionStatus" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "completeSubmission" : function(responseContent){
        self.respondJSON(responseContent);
      },
      "respondJSON" : function(responseContent){
        var headers = headersUtils({"Cache-Control": "no-cache", "Content-Type": "application/json"});

        response.writeHead(200, headers);
        response.end(JSON.stringify(responseContent));
      }
    }
  }
}