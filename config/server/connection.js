
// using mysql
var mysql = require('mysql');

function Connection() {
this.pool = null;
// connect to database
this.init = function() {
  this.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo' // database name
  });
};

// return detail
this.acquire = function(callback) {
  this.pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
};
}

module.exports = new Connection();