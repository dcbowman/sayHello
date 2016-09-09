var passport = require('passport');
var Guest = require('../models/guests');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator'); 

//stores user and retrieves user from session
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
 	User.findbyId(id, function(err, user){
 		done(err, user);
 	});
});

//creates a new user, checking if it's valid and not in use already
passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqtoCallback: true
}, function(req, email, password, done) {
	//ensures email and password are entered correctly
	req.checkBody('email', 'Invalid email').notEmpty().isEmail(); 
	req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
	//checks for errors, part of validation package, and returns errors
	var errors = req.validationErrors();
	if (errors) {
		var messages =[];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user){
		if (err){
			return done(err);
		}
		if (user){
			return done(null, false, {message: 'Email is already in use.'});
		}
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err, result){
			if (err){
				return done(err);
			}
			return done(null, newUser);
		});
	});
}));

//sign in function
passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqtoCallback: true
}, function(req, email, password, done) {
   //ensures email and password are entered correctly
	req.checkBody('email', 'Invalid email').notEmpty().isEmail(); 
	req.checkBody('password', 'Invalid password').notEmpty();
	//checks for errors, part of validation package, and returns errors
	var errors = req.validationErrors();
	if (errors) {
		var messages =[];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user){
		if (err){
			return done(err);
		}
		//checks to ensure the user has signed up
		if (!user){
			return done(null, false, {message: 'No guest found'});
		}
		if(!user.validPassword(password)){
			return done(null, false, {message: 'No guest found'});
		}
			return done(null, user);
		});

}));






