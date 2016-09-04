// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan'); //logs requests
var exphbs = require('express-handlebars');
//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "guests";
var collections = ["guests"];

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 

//configures app for morgan, body parser and handlebars
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended:false
	}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static file support, makes it accessible
app.use(express.static(__dirname + 'public'));


//mongo js to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

//logs any mongodb errors
db.on('error', function(err){
	console.log('Database Error:', err);
})

//routes

var routes = require('./controllers/controller.js');

app.use('/', routes);
app.use('/admin', routes);
app.use('/guest', routes);


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});