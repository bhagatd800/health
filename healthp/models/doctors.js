var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var DoctorSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	user_type:{
		type:String
	}
});

var doctor = module.exports = mongoose.model('doctor', DoctorSchema);

module.exports.createDoctor = function(newDoctor, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newDoctor.password, salt, function(err, hash) {
	        newDoctor.password = hash;
	        newDoctor.save(callback);
	    });
	});
}

module.exports.getDoctorByUsername = function(username, callback){
	//console.log(username);
	var query = {username: username};
	doctor.findOne(query, callback);
	
}
module.exports.getUserById = function(id, callback){
	doctor.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
module.exports.getDocData=function(user_id,callback){
	var query={_id:user_id};
	doctor.findOne(query,callback);
}