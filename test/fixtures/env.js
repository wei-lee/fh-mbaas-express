module.exports = (function(){
  process.env.FH_TEST_HOSTNAME = "http://localhost:3000";
  process.env.FH_ENDPOINT_CONFIG = JSON.stringify({"default":"https","overrides":{"doAuthedCall":{"security":"appapikey"},"doNonAuthCall":{"security":"https"}}});
  process.env.FH_APP_API_KEY = "testkey";
})();