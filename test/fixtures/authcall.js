var nock = require('nock');

module.exports = nock('https://testing.feedhenry.me')
	.filteringPath(function(path) {
		return '*';
	})
	.get('/box/api/mbaas/admin/authenticateRequest')
	.reply(200,{});



