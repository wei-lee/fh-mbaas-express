var fs = require('fs');

module.exports = function(){
  var files = fs.readdirSync('./test'),
  tests = [];
  files.forEach(function(f){
    if (f.substring(0,5) === 'test_'){
      tests.push(require('./' + f))
    }
  });
  return tests;
};
