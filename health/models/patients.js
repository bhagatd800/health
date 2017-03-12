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
	contact:{
		type:String
	},
	name: {
		type: String
	},
	user_type:{
		type:String
	},
	gender:{
		type:String
	},
	condition: {
		type: String
	},
	age:{
		type:Number
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
	//console.log(username);
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
module.exports.updatePassword=function(user_id,password,callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        patient.update({ _id: user_id }, { $set: { password: password }}, callback);
	    });
	});
	
}

module.exports.getEntireData=function(callback){
	
	patient.find(callback);
}


module.exports.delete=function(doc_id,callback){
	patient.remove({ _id: doc_id }, callback);	
	
}
module.exports.setNewPassword=function(email,password,callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        patient.update({ "email": email }, { $set: { "password": password }}, callback);
	    });
	});
	
}

module.exports.updateProfile=function(user_id,profile,callback){
	patient.update({ _id: user_id }, profile, callback);	
}

module.exports.getProfiles=function(user_id,callback){
	var query={_id:user_id};
	patient.findOne(query,callback);
}