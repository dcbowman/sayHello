var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Guest = require('../models/guests');
//csurf protection for all routes
var csrfProtection = csrf();
router.use(csrfProtection);

//home page
router.get('/', function (req, res){
	res.render('index', {title: 'sayHello'});
});

//administrators page
router.get('/admin', function (req, res){
	res.send("admin page");
})

//guests page
router.get('/guest', function (req, res){
	Guest.find(function(err, docs){
		var guestChunks = [];
		var chunkSize = 3;
		for(var i =0; i < docs.length; i+=chunkSize){
			guestChunks.push(docs.slice(i, i +chunkSize));
		}
		res.render('guest', {title: 'sayHello', guests: guestChunks });

});
	
});
//guest signup route
router.get('/user/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

//uses passport to check for authentication, shows message if unable to log in
router.post('/guest/signup', passport.authenticate('local.signup', {
	successRedirect:'/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

router.get('/profile', function(req, res, next){
	res.render('user/profile');
});

router.get('/user/signin', function(req, res, next){
	var messages = req.flash('error');
	res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messags.length> 0});
});

router.post('user/signin', passport.authenticate('local.signin', {
 	successRedirect:'/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true
}));






module.exports = router;