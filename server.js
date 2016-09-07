// Include Server Dependencies
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan'); //logs requests
var exphbs = require('express-handlebars');
//Database configuration
//var mongojs = require('mongojs');
var mongoose = require('mongoose');
// var databaseUrl = "sayHello";
// var collections = ["guests"];
var session = require('express-session');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 

//connection to database
mongoose.connect('localhost:27017/sayHello');

//configures app for morgan, body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended:false
	}));
//configuration for sessions not to save to server for each request
app.use(cookieParser());
app.use(session({secret: 'mykey', resave:false, saveUninitialized: false}));

//handlebars configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static file support, makes it accessible
app.use(express.static(__dirname + 'public'));


//mongo js to hook the database to the db variable
//var db = mongojs(databaseUrl, collections);

//logs any mongodb errors
//db.on('error', function(err){


//routes

var routes = require('./controllers/controller.js');

app.use('/', routes);
app.use('/admin', routes);
app.use('/guest', routes);


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});