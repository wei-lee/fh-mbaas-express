var connect = require('fh-connect'),
  paramsUtils = require('./cloud/params'),
  authentication = require('./common/authenticate'),
  headersUtils = require('./common/headers'),
  cors = require('./common/cors'),
  util = require('util'),
  $fh = require('fh-api-test'),
  requestValidator = require("./common/requestValidator"),
  responseGenerator = require("./common/responseGenerator");
var async = require('async');

var mBaaS = {
  db: $fh.db,
  forms: $fh.forms
};

function applyAuth (req, res,api,role,callback){
  var params = req.params;
  async.series([
    function (callback) {
      // TODO FIXME authentication(req, res, params).authenticate(api, callback);
      callback();
    },
    function (callback) {
      if ("db" === api) {
        authentication(req, res, params).authorise("AppCloudDB", callback);
      }else if('forms' === api){
        authentication(req,res,params).authorise("AppCloudForm", callback); //TODO -- permissions needed to upload form data for AppCloudForm
      }
      else {
        callback();
      }
    }],callback);
}

function handleRequest(req, res) {
  var params = {},
    api = req.params.api;
  func = req.params.func;

  console.log('ROUTER - api: ', api, ", func: " , func);
  console.log('ROUTER - mBaaS: ', mBaaS);

  params = paramsUtils.normalise(params, req);

  params.authConfig = {
    overrides: {
      '*': { security: 'appapikey' }
    }
  };

  async.series([
    function (callback) {
      // TODO FIXME authentication(req, res, params).authenticate(api, callback);
      callback();
    },
    function (callback) {
      if ("db" === api) {
        authentication(req, res, params).authorise("AppCloudDB", callback);
      }
      /* will need to differentiate between CMS Administrator and CMS Editor
       * else if ("cms" === api) {
       *   authentication(req, res, params).authorise("AppCloudCMS", callback);
       * }
       */
      else {
        callback();
      }
    },function(callback){
      if (("db" === api) && (mBaaS.hasOwnProperty(api))) {   // TODO this (and following else) is a hack, need a generic way of referencing mBaaS endpoints
        mBaaS[api](params, callback);
      } else if (("cms" === api) && (mBaaS.hasOwnProperty(api)) && (mBaaS[api].hasOwnProperty(func))) {
        console.log('API - calling mBaas - api: ', api, ", func: ", func);
        console.log('API - calling mBaas - params: ', params);

        mBaaS[api][func](params, function (err, result) {
          console.log('API - callback mBaas - api: ', api, ", func: ", func, ", err: ", err, ", result: ", result);
          return callback(err, result);
        });
      }else{
        callback({code:404,"message":"endpoint not found"});
      }

    }
  ], function (err, datas){
    if(err){
      endResponseCallback(req,res,err);
    }else{
      if(datas && datas[2]){
        endResponseCallback(req,res,undefined,datas[2]);
      }else{
        endResponseCallback(req,res);
      }
    }
  });
}

function endResponseCallback(req, res,err, ok) {
  var headers = headersUtils({"Cache-Control": "no-cache", "Content-Type": "application/json"});
  if (err) {
    res.writeHead(err.code || 500, headers);
    //we need to do this as JSON.stringify wont get the property values of an Error object as the properties are non enumarable... Thanks js.
    var error = {
      "message":err.message || "unknown error",
      "code":err.code || 500
    };
    res.end(JSON.stringify(error));
  } else if (ok) {// If there is a response, need to decide if a file needs to be streamed from the database.

    if(ok.stream){ // A stream object is returned if the download is a file.
      headers["Content-Type"] = ok.type;//Setting the file content type. Mime types are set by the file handler.
      headers["Transfer-Encoding"] = "chunked";
      headers["Content-Length"] = ok.length;
      res.writeHead(200, headers);
      ok.stream.pipe(res);
      ok.stream.resume();//Unpausing the stream as it was paused by the file handler
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(ok));
    }
  }else{
    res.writeHead(200, headers);
    res.end("");
  }
}

function handleError(err, res){
  res.writeHead(err.code || 500, headers);
  //we need to do this as JSON.stringify wont get the property values of an Error object as the properties are non enumarable... Thanks js.
  var error = {
    "message":err.message || "unknown error",
    "code":err.code || 500
  };
  res.end(JSON.stringify(error));
}

module.exports = connect().use(connect.bodyParser()).use(cors()).use(
  connect.router(function (app) {
    app.post('/:api', handleRequest);


    app.get('/forms/:appId', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.getForms(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.getForms(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.getForms(result);
          });
        });
      });
    });

    app.get('/forms/:appId/theme', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.getTheme(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.getTheme(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.getTheme(result);
          });
        });
      });
    });

    app.get('/forms/:appId/:formId', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);

        requestValidator.forms.getForm(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.getForm(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.getForm(result);
          });
        });
      });
    });

    app.post('/forms/:formId/submitFormData', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.submitFormData(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.submitFormData(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.submitFormData(result);
          });
        });
      });
    });

    app.post('/forms/:submitId/:fieldId/:fileId/submitFormFile', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.submitFormFile(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.submitFormFile(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.submitFormFile(result);
          });
        });
      });
    });

    app.get('/forms/:submitId/status', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.getSubmissionStatus(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.getSubmissionStatus(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.getSubmissionStatus(result);
          });
        });
      });
    });


    app.post('/forms/:submitId/completeSubmission', function(req, res){
      var requestValidator = requestValidator(req);

      applyAuth(req, res, "forms", undefined, function(err, ok){
        if(err) return handleError(err, res);
        requestValidator.forms.completeSubmission(function(err, ok){
          if(err) return handleError(err, res);

          //Parameters are valid and parsed
          $fh.forms.completeSubmission(ok, function(err, result){
            if(err) return handleError(err, res);

            //No error, handleSuccess
            var responseHandler = responseGenerator(res);
            responseHandler.forms.completeSubmission(result);
          });
        });
      });
    });


    app.all('/*', function (req, res) {
      res.end("Only POST to supported mBaaS APIs are supported. See http://docs.feedhenry.com for more")
    });
  })).use(connect.errorHandler({dumpExceptions: true, showMessage: true}));
