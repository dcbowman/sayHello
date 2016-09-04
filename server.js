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

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});