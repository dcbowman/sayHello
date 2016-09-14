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
			//res.json(found);
		}
	});


	// Guest.find(function(err, docs){
	// 	var guestChunks = [];
	// 	var chunkSize = 3;
	// 	for(var i =0; i < docs.length; i+=chunkSize){
	// 		guestChunks.push(docs.slice(i, i +chunkSize));
	// 	}
		//res.render('admin', {title: 'sayHello', guests: guestChunks });
	
//});
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