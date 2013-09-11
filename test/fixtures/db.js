var nock = require('nock');

var dbReplies = {
  list : function(){
    return { count: 1,
      list:
      [ { type: 'myFirstEntity',
        guid: '520269c9891b400e59000002',
        fields:
        { firstName: 'Joe',
          lastName: 'Bloggs',
          address1: '22 Blogger Lane',
          address2: 'Bloggsville',
          country: 'Bloggland',
          phone: '555-123456' } }
      ]
    };
  }
};

module.exports = nock('https://localhost:8802')
.filteringRequestBody(function(path) {
  return '*';
})
.post('/data/list', '*')
.times(2)
.reply(200, dbReplies.list);


