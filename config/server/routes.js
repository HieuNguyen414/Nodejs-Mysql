var todo = require('./Models/todo');
// var connection = require('./connection');

module.exports = {
configure: function(app) {
  app.get('/todo/', function(req, res) {
    todo.get(res);
  });
   
  app.get('/todo/read/:id/', function(req, res) {
    todo.read(res);
  });

  app.post('/todo/create', function(req, res) {
    todo.create(req.body, res);
  });

  app.put('/todo/update', function(req, res) {
    todo.update(req.body, res);
  });

  app.delete('/todo/delete/:id/', function(req, res) {
    todo.delete(req.params.id, res);
  });
}
};
// app.get('/todo/1', function(req, res){
//   connection.acquire(function(err, con){
//     con.query('select * from todo_list limit 0,10', function(err, result) {
//       con.release();
//       res.send(result);
//     });
//   })
// });
// app.get('/todo/2', function(req, res){
//   connection.acquire(function(err, con){
//     con.query('select * from todo_list limit 11,20', function(err, result) {
//       con.release();
//       res.send(result);
//     });
//   })
// });