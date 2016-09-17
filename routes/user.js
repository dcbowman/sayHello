var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var mongojs = require('mongojs');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.use(passport.initialize());
app.use(passport.session());

//csurf protection for all routes
var csrfProtection = csrf();
router.use(csrfProtection);


//database configuration
var databaseUrl = "sayHello";
var collections = ["guests"];


// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);


router.get('/logout', function(req, res, next){
	req.logut();
	 res.redirect('/');
});

//does not require guests to log in, all functions below do not require being logged in
router.use('/', notLoggedIn, function(req, res, next){
	next();
})

//guest signup route
router.get('/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

//uses passport to check for authentication, shows message if unable to log in
router.post('/signup', passport.authenticate('local.signup', {
	successRedirect:'/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));


router.get('/signin', function(req, res, next){
	res.render('guest');
	var messages = req.flash('error');
	res.render('guest', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messags.length> 0});
});

router.post('/signin', passport.authenticate('local.signin', {
 	successRedirect:'/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true
}));

router.get('logout', function(req, res, next){
	req.logut();
	 res.redirect('/');
});



router.get('/table', function(req, res, next){
	db.guests.find({table: 1}).forEach(function(err, found){
		if (err) {
			console.log(err);
		}
		else{
			console.log(found);
			res.render('user/profile', {guests: found});
			
		}
	});
});

module.exports = router;

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req, res, next){
	if (!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
