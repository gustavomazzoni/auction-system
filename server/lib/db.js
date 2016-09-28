// code for initializing the DB
var mysql = require('mysql'),
  config = require('../config');

// Connect to our mysql database
var pool = mysql.createPool(config.database.connectionObj);

var db = {

  getPoolConnection: function(callback) {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('connection error', err);
        throw err;
      } else {
        console.log('connection successful');
        callback(connection);
      }
    });
  },

  // A more release connection garantee method
  // Ex: db.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results
  query: function(sqlString, values, callback) {
    getPoolConnection(function(connection) {
      connection.query(sqlString, values, function(err, results, fields) {
        // Done with the connection, release it to the pool.
        connection.release();

        // call callback function
        if (callback) callback(err, results);
      });
    });
  }
  
};

module.exports = db;

