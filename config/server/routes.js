var ptrang = require('./ptrang');
var connection = require('./connection');

module.exports = {
configure: function(app) {
  app.get('/todo', function(req, res) {
    ptrang.get(res);
  });

  app.get('/todo/1', function(req, res){
    connection.acquire(function(err, con){
      con.query('select * from todo_list limit 0,10', function(err, result) {
        con.release();
        res.send(result);
      });
    })
  });
  app.get('/todo/2', function(req, res){
    connection.acquire(function(err, con){
      con.query('select * from todo_list limit 11,20', function(err, result) {
        con.release();
        res.send(result);
      });
    })
  });

}
};

// "ititems": 
// [
//  {"id": 1, "name": "A",    "address": "10-10-2017", "description":"abc" },
//  {"id": 2, "name": "B",    "address": "10-10-2017", "description":"abc" },
//  {"id": 3, "name": "C",    "address": "10-10-2017", "description":"abc" },
//  {"id": 4, "name": "D",    "address": "10-10-2017", "description":"abc" },
//  {"id": 5, "name": "E",    "address": "10-10-2017", "description":"abc" },
//  {"id": 6, "name": "F",    "address": "10-10-2017", "description":"abc" },
//  {"id": 7, "name": "G",    "address": "10-10-2017", "description":"abc" },
// ]


// recently

// app.get('/todo', function(req, res) {
//   todo.get(res);
// });
// app.post('/todo/create', function(req, res) {
//   todo.create(req.body, res);
// });
// app.put('/todo/update', function(req, res) {
//   todo.update(req.body, res);
// });
// app.delete('/todo/delete/:id', function(req, res) {
//   todo.delete(req.params.id, res);
// });