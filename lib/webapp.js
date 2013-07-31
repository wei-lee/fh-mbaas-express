var sys = require('./sys.js'),
cloud = require('./cloud/cloud.js'),
mbaas = require('./mbaas.js');

module.exports = {
  init : function(main){
    main = main || "main.js";
    return {
      sys :  sys(main),
      mbaas : function(req, res, next){
        console.log(arguments);
        next();
      },
      cloud : cloud(main)
    }
  }
};