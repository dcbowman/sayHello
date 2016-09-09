var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');


var Guest = require('../models/guests');


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



module.exports = router;