var todo = require('./Models/todo');
var connection = require('./connection');

module.exports = {
configure: function(app) {
  app.get('/todo', function(req, res) {
    todo.get(res);
  });

  app.get('/IT', (req,res) => res.send(
    console.log('abc')
  ));

  app.get('/todo/2', (req,res) => res.send(
    {
       "ititems": 
       [
        {"id": 1, "name": "A",    "address": "10-10-2017", "description":"abc" },
        {"id": 2, "name": "B",    "address": "10-10-2017", "description":"abc" },
        {"id": 3, "name": "C",    "address": "10-10-2017", "description":"abc" },
        {"id": 4, "name": "D",    "address": "10-10-2017", "description":"abc" },
        {"id": 5, "name": "E",    "address": "10-10-2017", "description":"abc" },
        {"id": 6, "name": "F",    "address": "10-10-2017", "description":"abc" },
        {"id": 7, "name": "G",    "address": "10-10-2017", "description":"abc" },
       ]
    }
  ));

  app.post('/todo/create', function(req, res) {
    todo.create(req.body, res);
  });
  app.put('/todo/update', function(req, res) {
    todo.update(req.body, res);
  });
  app.delete('/todo/delete/:id', function(req, res) {
    todo.delete(req.params.id, res);
  });
}
};