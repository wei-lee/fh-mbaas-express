fh-webapp is part one of a two-part replacement for fh-nodeapp. Webapp is the "'"hostapp" part of fh-nodeapp, that which makes public endpoints from exported functions in cloud/main.js.
It also hosts some system-level piping to help the studio determine if an app is online, the endpoints it exposes), and introduces a new namespace - /mbaas.

#Usage
Add the following to the 'dependencies' section of your **'cloud/package.json'** file:

    "fh-webapp" : "*",
    "fh-api" : "*",
    "express" : "3.3.4"
Add a file to your FeedHenry app **'cloud/application.js'**, with the following contents:

    var webapp = require('fh-webapp');
    var express = require('express');
    $fh = require('fh-api');
    var mainjs = require('main.js');

    var app = express();
    app.use('/sys', webapp.sys(mainjs));
    app.use('/mbaas', webapp.mbaas);
    app.use('/cloud', webapp.cloud(mainjs));

    // You can define custom URL handlers here, like this one:
    app.use('/', function(req, res){
      res.end('Your Cloud App is Running');
    });

    module.exports = app.listen(process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001);

##Customising & Extending
The above application.js is just an [Expressjs application](http://expressjs.com/api.html) - it's easily extensible. 
###Custom APIs
You can create custom API handlers in the Express format by doing:

    app.use('/myapi', function(req, res){
      res.end('My custom response');
    });
###Serving Static Files
Express has a built-in static file server. In this example, we host files under the public directory:  
    
    app.use(express.static(__dirname + '/public'));


#REST API	


##Cloud

###(POST | GET | PUT) /cloud/:someFunction
**Authentication** : Optional - can be enabled globally or on a per-endpoint basis under "Endpoints" section of the studio.
**Response formats** : JSON, binary, plain text

###Headers
**x-fh-auth-app** : API key of your application, found under the "details" section of the studio.

###Body:
JSON format - paramaters to be passed to the exported function, see 'Writing API Functions'.
###Response:
Result as passed to the callback function of the exported function - see 'Writing API Functions'.


###Writing API functions
The cloud namespace exposes the public functions of a javascript file of your choice (traditionally 'main.js') as public endpoints under the cloud URL namespace.
**:someFunction** is the name of a function attached to the 'exports' object. These functions take two paramaters - the first is the data sent in the POST, the second is the callback function to call.

    exports.getConfig = function (params, callback){
      // Do some work here, then return data
      var err = false;

      // Check if some error condition happened first
      if (err){
        return callback(err);
      }
      return callback(null, res);
    }
##mBaaS
###POST /mbaas/db
**Authentication** : Required - App API key goes here.
**Response format** : JSON

###Headers
**x-fh-auth-app** : API key of your application, found under the "details" section of the studio.

###POST Body:
JSON body - same as $fh.db params. A summary of body options follows - For more, see [$fh.db docs](http://docs.feedhenry.com/v2/api_cloud_apis.html#$fh.db)

    {
        "act": "create|update|list|delete|deleteall",
        "type": "collectionName",
        "guid": "GUID of object operating on - not required for list or deleteall",
        "fields": "JSON definition of fields - required for create|update",
        "eq|ne|in" : "JSON definition of query to match - supported for list only"
    }

###Response:
As per [$fh.db](http://docs.feedhenry.com/v2/api_cloud_apis.html#$fh.db)

##Sys
##GET /sys/info/ping
**Authentication** : None
**Response formats** : Plaintext

###Headers
None

###Response:
    "OK"
if application is running as expected. Will respond with a 404 otherwise

##GET /sys/info/endpoints
**Authentication** : None
**Response formats** : JSON

###Headers
None

###Response:
    {
      endpoints : ['array of endpoints exported as public functions']
    }

##GET /sys/info/memory
**Authentication** : None
**Response formats** : JSON

###Headers
None

###Response:
    {
      rss: 13721600, // Resident set size
      heapTotal: 7195904, // V8's total available memory
      heapUsed: 2369744  // V8's used memory
    }

##GET /sys/info/memory
**Authentication** : None
**Response formats** : Plaintext

###Headers
None

###Response:
    0.1.0
