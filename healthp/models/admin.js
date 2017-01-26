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