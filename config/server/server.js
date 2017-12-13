var express = require('express');

// module dùng để xử lý dạng JSON, dữ liệu thô, text và mã hóa URL
var bodyparser = require('body-parser'); 
var connection = require('./connection');
var routes = require('./routes');
  
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);
var server = app.listen(3111, function() {
  console.log('Server listening on port ' + server.address().port);
});