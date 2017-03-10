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
	status:{
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
	location:{
		type:String
	},
	specialty:{
		type:String
	},
	qualification:{
		type:String
	},
	nationality:{
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
	console.log(username);
	var query = {username: username,status:1};
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
module.exports.newDoctor=function(callback){
	var query={status:0};
	doctor.find(query,callback);
}

module.exports.updatePassword=function(user_id,password,callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        doctor.update({ _id: user_id }, { $set: { password: password }}, callback);
	    });
	});
	
}
module.exports.updateProfile=function(user_id,profile,callback){
	doctor.update({ _id: user_id }, profile, callback);	
}
module.exports.approveDoctor=function(user_id,status,callback){
	doctor.update({ _id: user_id },status, callback);	
}

module.exports.getEntireData=function(callback){
	
	doctor.find({status:1},callback);
}
module.exports.getDoctorUserName=function(callback){
	
	doctor.find(callback);
}
module.exports.delete=function(doc_id,callback){
	doctor.remove({ _id: doc_id }, callback);	
	

}
module.exports.getEntireData=function(callback){
	
	doctor.find(callback);
}

module.exports.setNewPassword=function(email,password,callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        password = hash;
	        doctor.update({ email: email }, { $set: { password: password }}, callback);
	    });
	});
	
}