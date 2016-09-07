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
var routes = require('./controllers/controller.js');




// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. 

//connection to database
mongoose.connect('localhost:27017/sayHello');
//runs through the passport.js file
require = ('./config/passport');

//configures app for morgan, body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended:false
	}));
//configuration for sessions not to save to server for each request
app.use(cookieParser());
app.use(session({secret: 'mykey', resave:false, saveUninitialized: false}));
app.use(flash());

//starts passport and stores users
app.use(passport.initialize()); 
app.use(passport.session());

//handlebars configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static file support, makes it accessible
app.use(express.static(__dirname + 'public'));


//routes
app.use('/', routes);
app.use('/admin', routes);
app.use('/guest', routes);


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});