var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var mongoose = require('mongoose');
var databaseUrl = "sayHello";
var collections = ["guest"];

//connects database to db variable
//var db = mongojs(databaseUrl, collections);

var Guest = require('../models/guests');


//home page
router.get('/', function (req, res){
	res.render('index', {title: 'sayHello'});
});

//administrators page
router.get('/admin', function (req, res){
	Guest.find({}, function(err, found){
		if (err) {
			console.log(err);
		}
		else{
			console.log(found);
			res.render('admin', {guests: found});
			
		}
	});
}); 

router.post('/guest/submit', function(req, res, next){
	var guest = new Guest({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		//positon: req.body.position,
		table: req.body.table,
		linkedin: req.body.linkedin,
		imagePath: req.body.image

	});
	Guest.create(function(err, post, next){
		if (err){
			console.log(err);
			res.send({
				message: 'Error: guest not saved'
			});
	}else
	res.send({
		message:'Guest saved!'
	});
	Guest.find({}, function(err, found){
		if (err) {
			console.log(err);
		}
		else{
			console.log(found);
			res.header('admin', {guests: found});
			};
});
});
});

//individual table page
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

router.post('/guest/create'), function (req, res){
	guest.create(req.body)
}



module.exports = router;