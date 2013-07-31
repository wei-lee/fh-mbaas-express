var proxyquire =  require('proxyquire').noCallThru(),
assert  = require('assert'),
request = require('request'),
port = 3000,
hostname = 'http://localhost:' + port;

var application = proxyquire('./fixtures/application.js', {
  'fh-webapp': require('../lib/webapp.js'),
  'main.js' : require('./fixtures/main.js')
});

request(hostname + '/cloud', function (error, response, body) {
  assert.ok(body = 'ok');
});

