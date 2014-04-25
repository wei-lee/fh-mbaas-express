fh-mbaas-express
================

fh-mbaas-express is the FeedHenry MBaaS running on top of [Express](http://expressjs.com/).

# Usage
Add the following to the 'dependencies' section of your **'cloud/package.json'** file:

    "fh-mbaas-express" : "~3.0.0",
    "fh-mbaas-api" : ~3.0.0"",
    "express" : "~4.0.0"

Add a file to your FeedHenry app **'cloud/application.js'**, with the following contents:

```javascript
var mbaas = require('fh-mbaas-express');
var express = require('express');

// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = ['hello'];

var app = express();

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaas.sys(mainjs, securableEndpoints));
app.use('/mbaas', mbaas.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaas.fhmiddleware());
app.use('/cloud', require('./lib/hello.js')());


// You can define custom URL handlers here, like this one:
app.use('/', function(req, res){
  res.end('Your Cloud App is Running');
});

// Important that this is last!
app.use(mbaas.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function(){
  console.log("App started at: " + new Date() + " on port: " + port);
});
```

## Customising & Extending
The above application.js is just an [Expressjs application](http://expressjs.com/api.html) - it's easily extensible.

### Custom APIs
You can create custom API handlers in the Express format by doing:

    app.use('/myapi', function(req, res){
      res.end('My custom response');
    });

See [Express Router](http://expressjs.com/4x/api.html#router) for more information.

### Serving Static Files
Express has a built-in static file server. In this example, we host files under the public directory:  
    
    app.use(express.static(__dirname + '/public'));


# REST API	


## Cloud

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

We recommend adding your own routes to `/cloud`, see `lib/hello.js` in the `hello world` example. . Also see [Express Router](http://expressjs.com/4x/api.html#router) for more information.

```javascript
function helloRoute() {
  var hello = new express.Router();
  hello.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  hello.get('/hello', function(req, res) {
    var world = req.query ? req.query.hello : 'World';

    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify({msg: 'Hello ' + world}));
  });
  return hello;
}

```


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

# Backward compatability with main.js

If you want to use the older fh-nodeapp/fh-webapp style main.js, you need to change the /cloud endpoint in your application.js as follows:

```
var mainjs = require('./lib/main.js');
app.use('/cloud', mbaas.cloud(mainjs));
```

Additionally, you need to ammend the call to `sys` for secure endpoints:

```
app.use('/sys', mbaas.sys(securableEndpoints, mainjs));
```
