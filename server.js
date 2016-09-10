// Include Server Dependencies
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan'); //logs requests
var exphbs = require('express-handlebars'); //handlebars
var session = require('express-session');
var mongoose = require('mongoose'); //database
var passport = require('passport'); //user authentication
var flash = require('connect-flash'); //enables flash messages
var validator = require('express-validator');

//routes

var userRoutes = require('./routes/user.js');
var routes = require('./routes/controller.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 

//connection to database
mongoose.connect('localhost:27017/sayHello');
//runs through the passport.js file
require('./config/passport');

//handlebars configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//configures app for morgan, body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
	}));
//validator will parse body and retrieve validators for submitted request
app.use(validator());
//configuration for sessions not to save to server for each request
app.use(cookieParser());
app.use(session({secret: 'mykey', resave:false, saveUninitialized: false}));
app.use(flash());

//starts passport and stores users
app.use(passport.initialize()); 
app.use(passport.session());

//static file support, makes it accessible
app.use(express.static(__dirname + 'public'));

//sets global variable to ensure that pages that need authentication are protected
app.use(function(req, res, next){
	res.locals.login =req.isAuthenticated();
	next();
})

//routes
app.use('/user', userRoutes);
app.use('/', routes);

//fowards 404 error to handler
app.use(function(req, res, next){
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});



// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});