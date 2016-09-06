var Guest = require('../models/guests');
var mongoose = require('mongoose');
//connection to database
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/sayHello');

var guests = [
new Guest({
 email: 'Pam@dundermifflin.com',
 firstName: 'Pam',
 lastName: 'Beasley',
 imagePath: 'http://theredlist.com/media/database/films/tv-series/sitcom-and-soap/2000/the-office/014-the-office-theredlist.jpg',
 linkedin: 'https://www.linkedin.com/',
 table: 1
}),
new Guest({
email: 'Jim@dundermifflin.com',
 firstName: 'Jim',
 lastName: 'Halpert',
 imagePath: 'http://static.tumblr.com/ckzdlrz/zotlw04a3/phyllis_wedding_5.png',
 linkedin: 'https://www.linkedin.com/',
 table:1
 }),

];


//loops through all of new guests and saves to database. When all info is added and done it will run the exit function to terminate our connection with database
var done = 0;
for (var i=0; i<guests.length; i++){
	guests[i].save(function(err, result){
		done++;
		if (done === guests.length){
			exit();
		}
	});
}

//terminates connection to database after mock data is inserted
function exit(){
mongoose.disconnect();
}