var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//blueprint for each new entry into the database to base models off of
var schema = new Schema({
 email: {type: String, required:true},
 firstName: {type: String, required:true},
 lastName: {type: String, required:true},
 //position: {type: String, required:true},
 imagePath: {type: String, required:false},
 linkedin: {type: String, required:false},
 table: {type: Number, required:true}
});

//creates a model to work with 
module.exports = mongoose.model('Guest', schema);

