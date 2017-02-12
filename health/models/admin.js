var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var AdminSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	}

});

var admin = module.exports = mongoose.model('admin', AdminSchema);

module.exports.createAdmin = function(newAdmin, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newAdmin.password, salt, function(err, hash) {
	        newAdmin.password = hash;
	        newAdmin.save(callback);
	    });
	});
}

module.exports.getAdminByUsername = function(username, callback){
	//console.log(username);
	var query = {username: username};
	admin.findOne(query, callback);
	
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.updatePassword=function(user_id,password,callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        admin.update({ _id: user_id }, { $set: { password: password }}, callback);
	    });
	});
	
}