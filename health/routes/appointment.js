var express = require('express');
var router = express.Router();
var session = require('express-session');
var Appointment = require('../models/appointments');

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


module.exports = router;