var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Guest = require('../models/guests');
var csrf = require('csurf');

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
router.get('/guest/signup', function(req, res, next){
	res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function (req, res, next){
	res.redirect('/');
})


module.exports = router;