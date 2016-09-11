// Include Server Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan'); //logs requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars'); //handlebars
var mongoose = require('mongoose'); //database
var session = require('express-session');
var passport = require('passport'); //user authentication
var flash = require('connect-flash'); //enables flash messages
var validator = require('express-validator');

//routes

var userRoutes = require('./routes/user.js');
var routes = require('./routes/controller.js');

// Create Instance of Express
var app = express();
var PORT = process.env.MONGODB_URI || 3000; // Sets an initial port. 

//------heroku database config--------
//define local MongoDB URI
var databaseUrl = 'mongodb://localhost/sayHello';
if(process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI);
}
else{
	mongoose.connect(databaseUrl);
}
//-----

var db = mongoose.connection;
//show any mongoose errors
db.on('error', function (err){
	console.log('Mongoose Error: '' err')
});

db.once('open', function(){
	console.log('Mongoose connection successful');
})


//db_url = process.env.MONGOHQ_URL || mongodb:heroku_3cqlgkm3:e68dctgsrooajdsoo2l6ovel73@ds029456.mlab.com:29456/heroku_3cqlgkm3
//db = mongoose.connect(db_url)

//connection to database
//mongoose.connect('localhost:27017/sayHello');
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));

//sets global variable to ensure that pages that need authentication are protected
app.use(function(req, res, next){
	res.locals.login = req.isAuthenticated();
	next();
});

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