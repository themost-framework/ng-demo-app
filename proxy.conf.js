const {getApplication, serveApplication} = require('@themost/test');

(function serve() {
  // init test api
  const app = getApplication();
  // serve test api
  serveApplication(app, 3000);
})();

module.exports = {
    '/api/': {
      target: 'http://localhost:3000/',
      secure: false
    },
    '/auth/': {
      target: 'http://localhost:3000/',
      secure: false
    }
  }