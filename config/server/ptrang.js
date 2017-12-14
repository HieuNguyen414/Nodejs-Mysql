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
this.create = function(field_data, res) {
  connection.acquire(function(err, con) {
    con.query('insert into todo_list set ?', field_data, function(err, result) {
      con.release();
      if (err) {
        res.send({status: 1, message: 'TODO creation failed'});
      } else {
        res.send({status: 0, message: 'TODO created successfully'});
      }
    });
  });
};
module.exports = new Ptrang();