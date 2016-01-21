#Component: fh-mbaas-express

## 5.3.7 - 2016-01-06 - Graham Hillis
* RHMAP-3565 - test update and log message update in fh-reportingclient, version bump for fh-mbaas-express

## 5.3.6 - 2015-12-17 - Graham Hillis
* RHMAP-3565 - realtime enabled bugfix in fh-reportingclient, version bump for fh-mbaas-express

## 5.3.5 - 2015-11-12 - Graham Hillis
* RHMAP-2618 - add environment to reporting messages (app crash now flushes reporting batch)

## 5.3.1 - 2015-11-9 - Graham Hillis
* RHMAP-2618 - add environment to reporting messages (bumped version for fh-reportingclient)

## 5.3.0 - 2015-11-9 - Graham Hillis
* RHMAP-2618 - add environment to reporting messages

## 5.2.0 - 2015-09-21 - Evan Shortiss
* RHMAP-2693 - Update error handler behaviour to only do shutdowns on uncaught expections.
* RHMAP-2627 - Remove deprecated warning messages about bodyParser

## 5.1.0 - 2015-10-08 - Graham Hillis
* FH-1067 - mbaas client usage for event creation in mbaas

## 5.0.1 - 2015-09-11 - Gerard Ryan
* Bump version of grunt-fh-build, so that archive with dependencies will get built

## 5.0.0 - 2015-07-13 - Niall Donnelly
* FHCLOUDSDK-14 - Updated multer version to fix file streaming to fh-mbaas

## 4.2.0 - 2015-06-30 - Jason Madigan
* FHMAP-605 - Call core periodically to validate App API Keys

## 4.1.4 - 2015-06-23 - Gerard Ryan
* FH-164 - Build using Grunt instead of Make

## 4.1.3 - 2015-03-23 - Bruno Oliveira
* FH-109: Update fh-mbaas-express to mitigate vulnerabilities

## 4.1.2 - 2015-05-05 - Wei Li
* FHCLOUDSDK-10 - Add missing CORS headers

## 4.1.1 - 2015-04-14 - Gerard Ryan
* Add a shrinkwrap file for npm

## 4.1.0 - 2015-04-03 - Wei Li
* FHCLOUDSDK-7 - New middleware for auth token verification

## 4.0.10 - 2015-03-24 - Jason Madigan
* Removed checked in /plato folder

## 4.0.9 - 2015-02-16 - IR244 - Cian Clarke
* 8665 - Add Openshift support to analytics functionality

## 4.0.8 - 2015-02-25 - Wei Li
* FHCLOUDSDK-2 - Add ReadMe file to npm.

## 4.0.7 - 2015-02-16 - IR247 - Wei Li
* 8758 - Update fh-amqp-js module

## 4.0.6 - 2014-10-31 - IR239 - David Martin
* 8169 - Added uncaught exception handler to allow crash alerts/events to be detected by platform

## 4.0.5 - 2014-10-30 - IR239 - Wei Li

* 8212 - Update fh-amqp-js version

## 4.0.4 - 2014-07-09 - IR231 - Martin Murphy

* 7594 - change order of api key checks to allow for multipart-form type requests
* 7596 - add a multipart file middleware

## 4.0.3 - 2014-07-07 - IR231 - Jason Madigan

* 7579 - Service apps which are marked as "Public" should bypass auth

## 4.0.2 - 2014-06-26 - IR230 - Niall Donnelly

* 7459 Add Increased Limit To Bodyparser

## 4.0.1 - 2014-06-25 - IR230 - Wei Li

* 7500 - Parse client information sent by native SDKs from request headers

## 3.1.0 - 2014-06-03 IR229 - John Frizelle

* 7364 - fh-mbaas-express is now a dependency of fh-mbaas-api, rather than the other way around.

## 3.0.0-beta17 - 05-06-2014 - IR229 - Cian Clarke

* Bump fh-mbaas-api version

## 3.0.0-beta16 - 05-06-2014 - IR229 - Cian Clarke

* 7087, 7086 - Add import & export support to mbaas-express, support passing files params

## 3.0.0-beta13 - 27-05-2014 - IR228 - Cian Clarke

* bump fh-mbaas-api version

## 3.0.0-beta12 - 20-05-2014 - IR226 niall donnelly

* bump fh-mbaas-api version

## 3.0.0-beta11 - 01-05-2014 - IR226 - Cbrookes

* bump fh-api
## 3.0.0-beta10 - 30-04-2014 - IR226 - Cbrookes

* bump fh-api

## 3.0.0-beta9 - 30-04-2014 - IR226 - Niall Donnelly

* 7036 - Add multipart form reqest support for mbaas

## 3.0.0-beta8 - 29-04-2014 - IR226 - Wei Li

* Parse FH headers

## 3.0.0-beta7 - 7-04-2014 - IR225 - Damian Beresford

* 6509 - Restification of fh-webapp

## 3.0.0-beta5 - 2014-04-17 - IR225 - Niall Donnelly

* 6706 get submission for client Api.

## 3.0.0 - 7-04-2014 - IR225 - Damian Beresford

* 6662 - Errors not getting reported in Events & Alerts section
* 6679 - Renaming and versioning for fh-webapp & fh-api


NOTES:

* 6679:

fh-webapp is now called fh-mbaas-express. fh-api is now called fh-mbaas-api. Both have been changed to v3.0.0-beta1


* 6662:
There is improved error handling now in fh-webapp. Specifically, when your App crashes, this message appears as a Notification in the FeedHenry Studio. In order to use the new fh-webapp error handler, you need to add the following in your application.js:

      app.use(webapp.errorHandler());

This needs to be the last middleware you use with your App, so probably best to put this at the end of application.js, e.g.

      app.use(webapp.errorHandler());

      var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
      module.exports = app.listen(port, function(){
        console.log("App started at: " + new Date() + " on port: " + port);
      });


## 0.7.0

* 6263 - Expose $fh.sync as an mBaaS service

## 0.6.8 - 19-03-2014 IR223 - Niall Donnelly

* 6397 - Appforms: Re-factor forms api to use appClientId

## 0.6.7 - 27-03-2014 - IR224 - Wei Li

* Allow passing extra params when setup cloud functions. For example, bodyParser params.


## 0.6.6, 0.6.5, 0.6.4 & 0.6.3 - 26-02-2014 IR222 - Jason Madigan

* 6059 - Verify service permissions on Service Apps. Thanks NPM.

## 0.6.(3)-appforms - 25-02-2014 IR221 - Martin Murphy

* 6160 - Appforms: update js-sdk/mbaas to send deviceID in config request

## 0.6.2 - 05-02-2014 IR220 - Damian Beresford

* 5897 - fh-webapp does not set the process title

## 0.6.1 - 20-01-2014 IR219 - Damian Beresford

* 5697 - Zendesk 2989: Aer Lingus Audit - Update Required (cors whitelist support)

## 0.6.0 - 03-01-2014 IR218 - John Frizelle

* 5455 - Explicitly set character encoding to utf-8


## 0.5.0 (IR210)
CHANGES
 * minor bug fix for local dev when using local db

## 0.2.0 (IR210)

CHANGES
 * 4568 and authorisation calls on mbass db endpoints

## 0.1.0 (IR209)

CHANGES
 * Ticket 4470 Split fh-nodeapp into fh-webapp and fh-apis

NOTES
 * <none>
