const {getApplication, serveApplication} = require('@themost/test');
const app = getApplication();
serveApplication(app, 3000);
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