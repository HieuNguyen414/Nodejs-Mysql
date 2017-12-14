var connection = require('./connection.js');

function Ptrang() {
this.get = function(res) {
  connection.acquire(function(err, con) {
    con.query('select * from todo_list', function(err, result) {
      con.release();
      res.send(result);
    });
  });
};
}
module.exports = new Ptrang();