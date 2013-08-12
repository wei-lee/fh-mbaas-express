var connect = require('fh-connect'),
paramsUtils = require('./cloud/params'),
authentication = require('./cloud/authenticate'),
$fh = require('fh-api');

var mBaaS = {
  db : $fh.db
};

module.exports = connect().use(connect.bodyParser()).use(
connect.router(function (app) {
  app.post('/:func', function (req, res) {
    var params = {},
    api = req.params.func;
    params = paramsUtils.normalise(params, req);

    params.authConfig = {
      overrides : {
        '*' : { security : 'appapikey' }
      }
    };

    authentication(req,res,params).authenticate(api, function (err, ok){
      //we only care about err
      if(err){
        res.writeHead(err.code, {"Cache-Control":"no-cache","Content-Type":"application/json"});
        res.end(JSON.stringify(err));
        return;
      }
      if (mBaaS.hasOwnProperty(api)){
        return mBaaS[api](params, function(err, dbres){
          if (err){
            res.writeHead(404);
            return res.end(JSON.stringify(err));
          }
          return res.end(JSON.stringify(dbres));
        });
      }
      res.writeHead(404);
      return res.end("Error: No such mBaaS function " + api);
    }); // end authenticate
  }); // end app.post
  app.all('/*', function(req, res){
    res.end("Only POST to supported mBaaS APIs are supported. See http://docs.feedhenry.com for more")
  });
})).use(connect.errorHandler({dumpExceptions:true, showMessage:true}));
