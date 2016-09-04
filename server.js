// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "guests";
var collections = ["guests"];

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 

//mongo js to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

//logs any mongodb errors
db.on('error', function(err){
	console.log('Database Error:', err);
})

//routes
app.get('/', function (req, res){
	res.send("test");
})


app.get('/admin', function (req, res){
	res.send("admin page");
})

app.get('/guest', function (req, res){
	db.guests.find({}, function(err, data){
	if (err) throw err;
	res.send(data);
});
})

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});