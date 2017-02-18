var express = require('express');
var router = express.Router();
var session = require('express-session');
var Appointment = require('../models/appointments');
var moment= require('moment');
router.post('/reqAppointment',function(req,res) {
	//console.log(req.body)
	var data={patientid:req.session.patient._id,
								patientName:req.session.patient.name,
								doctorid:req.body._id,
								doctorName:req.body.name,
								status:"pending"};
	//console.log(data);
	Appointment.reqAppointment(data,function(err,callback){
									if(err)
									{

									}
								});
});

router.get('/getAppointmentData',function(req,res){

	Appointment.getAppointmentDatas(req.session.doctor._id,function(err,datas){
		if(err){

		}
		res.json(datas);
	});

});

router.post('/approveAppointment',function(req,res){
 
var id=(req.body[0].id);
var dates=moment(req.body[0].date).format('DD/MM/YYYY');
var times=moment(req.body[0].time).format('LT');
Appointment.approveAppointments(id,{status:"approved",date:dates,time:times},function(err,callback){
		if(err){

		}
	});
});

router.post('/declineAppointment',function(req,res){

	Appointment.declineAppointments(req.body._id,{status:"rejected"},function(err,callback){
		if(err){

		}
	});

});

router.get('/getAppointmentStatus',function(req,res){

	Appointment.getappointmentStatus(req.session.patient._id,function(err,datas){
		if(err){

		}
	
		res.json(datas);
	});

});

router.post('/deleteAppointment',function(req,res){

	console.log("deepak");
	Appointment.deleteAppointments(req.body._id,function(err,callback){
		if(err){

		}
	});

});


module.exports = router;