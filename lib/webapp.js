var sys = require('./sys.js'),
cloud = require('./cloud/cloud.js'),
mbaas = require('./mbaas.js');

module.exports = {
  sys :  sys,
  mbaas : function(req, res, next){
    console.log(arguments);
    next();
  },
  cloud : cloud
};