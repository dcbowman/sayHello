var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrtpt-node.js');

var userSchema = new Schema({
	email:{type:String, unique:true, required:true},
	password: {type:String, required:true},
	//meta: Object //keeps field open
});

//creates an encrypted password
userSchema.methods.encryptPassword() = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

//checks to ensure password matches encrypted password
userSchema.methods.validPassword = function (password){
	return bcrypt.compareSync(password this.password);
};

module.exports = mongoose.model('User, userSchema');





//varBird = require('bluebird')
//uid = require('node-uuid')//unique user identifi
//timestamp = require('mongoose=timestamp')