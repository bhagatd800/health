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
		type:String
	},
	time:{
		type:String
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

module.exports.declineAppointments = function(id,status, callback){
	
	appointment.update({_id:id},{$set:status},{ upsert: false },function(err,docs){

    if(err)
      console.log(err);
  });
	
}
module.exports.getappointmentStatus=function(id,callback){
	
	appointment.find({patientid:id},callback);
}

module.exports.deleteAppointments=function(id,callback){
	
	appointment.remove({ _id:id }, callback);
}
module.exports.approveAppointments=function(id,data,callback){
		appointment.update({_id:id},{$set:data},{ upsert: false },function(err,docs){

    if(err)
      console.log(err);
  });
}