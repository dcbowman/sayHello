var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
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
	var guests = Guest.find();
	res.render('guest', {title: 'sayHello', guests: guests });
});


module.exports = router;