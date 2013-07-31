module.exports = {
  /**
   * add the cors headers to the response
   * @param req the inbound request, needs to check to see if this is a CORs request
   * @param res the outbound response to add the headers to
   * @param preflight
   */
  addCorsHeaders : function(req,res, preflight) {
    if(this.isCorsRequest(req)) {
      if(req.headers['Access-Control-Allow-Origin'] === undefined)
        res.setHeader('Access-Control-Allow-Origin',"*");
      if(preflight) {
        res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type');
        res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    }
  },
  isCorsRequest : function(req){
    return req.headers['origin'] || req.headers['Origin'] ;
  }
};