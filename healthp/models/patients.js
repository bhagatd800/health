var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var PatientSchema = mongoose.Schema({
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

var patient = module.exports = mongoose.model('patient', PatientSchema);

module.exports.createPatient = function(newPatient, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newPatient.password, salt, function(err, hash) {
	        newPatient.password = hash;
	        newPatient.save(callback);
	    });
	});
}

module.exports.getPatientByUsername = function(username, callback){
	console.log(username);
	var query = {username: username};
	patient.findOne(query, callback);
	
}
module.exports.getUserById = function(id, callback){
	patient.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}