var passport = require('passport');
var user = require('../models/guests');
var LocalStrategy = require('passport-local').Strategy; 

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
}, function(req, email, password, done){
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
		})
	})
}));