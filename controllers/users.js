var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrtpt-node.js');

var userSchema = new Schema({
	email:{type:String, required:true},
	password: {type:String, required:true}
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