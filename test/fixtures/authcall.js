var nock = require('nock');

module.exports = nock('https://testing.feedhenry.me')
 .get('/box/api/mbaas/admin/authenticateRequest?appApiKey=testkey&env=dev&requestedPerm=AppCloudDB')
 .reply(200,{});



