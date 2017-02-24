var mongoose = require('mongoose');

// User Schema
var HospitalSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	city: {
		type: String
	},
	phone: {
		type: String,
		
	},
	address: {
		type: String,
		
	},
	specialty: {
		type: String,
		
	},
	imageName: {
		type: String,
		
	}

});


var hospital = module.exports = mongoose.model('hospital', HospitalSchema);


module.exports.upload=function(data,cb){
		hospital.update({name:data.name,city:data.city},{$set:data},{ upsert: true },function(err,docs){

    if(err)
      console.log(err);
  });
}

module.exports.getHospitalDatas=function(callback){
	
	hospital.find(callback);
}