var path = require('path');

module.exports = {
  database: {                                           // The connection object of our the MySQL DB server
    connectionObj: {
      connectionLimit : 50,
      host     : 'localhost',
      user     : 'auction',
      password : '12345',
      database : 'auction_system'
    }
  },
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    staticFolder: path.resolve(__dirname, '../client/build'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
    apiV1Url: '/api/v1',                                // The base url from which we serve API v1 resources
    cookieSecret: 'auction-system'                      // The secret for encrypting the cookie
  }
};