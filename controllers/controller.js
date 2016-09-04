var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.get('/', function (req, res){
	res.render('index');
});


app.get('/admin', function (req, res){
	res.send("admin page");
})

app.get('/guest', function (req, res){
	db.guests.find({}).sort({table:1}, function(err, data){
	if (err) throw err;
	res.send(data);
});
})

module.exports = app;