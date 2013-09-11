module.exports = (function(){
  process.env.FH_TEST_HOSTNAME = "http://127.0.0.1:8001";
  process.env.FH_ENDPOINT_CONFIG = JSON.stringify({"default":"https","overrides":{"doAuthedCall":{"security":"appapikey"},"doNonAuthCall":{"security":"https"}}});
  process.env.FH_APP_API_KEY = "testkey";
  process.env.FH_DITCH_HOST = 'localhost';
  process.env.FH_DITCH_PORT = 8802;
	process.env.FH_MILLICORE = "testing.feedhenry.me";
	process.env.FH_ENV = "dev";
  process.env.FH_MILLICORE_PROTOCOL = "https";
})();