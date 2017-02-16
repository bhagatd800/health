var mongoose = require('mongoose');

// User Schema
var AppointmentSchema = mongoose.Schema({
	doctorid: {
		type: String,
		index:true
	},
	doctorName:{
		type:String
	},
	patientid: {
		type: String
	},
	patientName:{
		type:String
	},
	date:{
		type:Date
	},
	time:{
		type:Date
	},
	status:{
		type:String
	}
});

var appointment = module.exports = mongoose.model('appointment', AppointmentSchema);

module.exports.reqAppointment = function(data, callback){
	console.log(data);
	appointment.update({doctorid:data.doctorid,patientid:data.patientid},{$set:data},{ upsert: true },function(err,docs){

    if(err)
      console.log(err);
  });
	
}
module.exports.getAppointmentDatas=function(id,callback){
	
	appointment.find({doctorid:id,status:"pending"},callback);
}
