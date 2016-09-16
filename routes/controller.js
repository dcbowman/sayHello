var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var databaseUrl = "sayHello";
var collections = ["guests"];


// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

//var Guest = require('../models/guests');


//home page
router.get('/', function (req, res){
	res.render('index', {title: 'sayHello'});
});

//administrators page
router.get('/admin', function (req, res){
 res.render('admin');
	});
 

//inserts into database guest information from admin form
router.post('/submit', function(req, res){
	var guest = req.body;

	db.guests.insert(guest, function(err, saved){
		if (err){
			console.log(err);
		}
		else{
			res.send(saved);
		}
	});
});
		

//Finds all entered users and sends json 

router.get('/all', function(req, res) {

db.guests.find(function (err,found){
  if (err){
    console.log(err);
  }
  else{
    res.json(found);
  }
 });
});


//all guests table page
router.get('/guest', function (req, res){


	db.guests.find(function(err, docs){
		var guestChunks = [];
		var chunkSize = 3;
		for(var i =0; i < docs.length; i+=chunkSize){
			guestChunks.push(docs.slice(i, i +chunkSize));
		}
		res.render('guest', {title: 'sayHello', guests: guestChunks });
});
});




module.exports = router;