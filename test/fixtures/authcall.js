var nock = require('nock');

module.exports = nock('https://testing.feedhenry.me')
 .get('/box/api/mbaas/admin/authenticateRequest?appApiKey=testkey&env=dev&requestedPerm=AppCloudDB&requestedAct=read')
 .times(2)
 .reply(200,{})
 .get('/box/api/mbaas/admin/authenticateRequest?appApiKey=testkey&env=dev&requestedPerm=AppCloudDB&requestedAct=write')
 .reply(401,{});



