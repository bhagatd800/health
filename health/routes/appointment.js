var express = require('express');
var router = express.Router();
var session = require('express-session');
var Patient = require('../models/patients');
var Appointment = require('../models/appointments');
var moment= require('moment');
router.post('/reqAppointment',function(req,res) {
	var data;
	Patient.getProfiles(req.session.patient._id,function(err,datas){
		var datas=datas;
		console.log(datas);
    if(err){

    }
    else if(!datas.age){
    	 data={patientid:datas._id,
			  patientName:datas.name,
			  doctorid:req.body._id,
			  condition:datas.condition,
			  doctorName:req.body.name,
			  status:"pending",
			  date:'',
			  time:''
			};

    }
     else if(!datas.condition){
    	 data={patientid:datas._id,
			  patientName:datas.name,
			  doctorid:req.body._id,
			  age:datas.age,
			  doctorName:req.body.name,
			  status:"pending",
			  date:'',
			  time:''
			};

    }
    else if(!datas.condition&&!datas.age){
    	 data={patientid:datas._id,
			  patientName:datas.name,
			  doctorid:req.body._id,
			  doctorName:req.body.name,
			  status:"pending",
			  date:'',
			  time:''
			};

    }

    else{
	data={patientid:datas._id,
			  patientName:datas.name,
			  doctorid:req.body._id,
			  condition:datas.condition,
			  age:datas.age,
			  doctorName:req.body.name,
			  status:"pending",
			  date:'',
			  time:''
			};

	}
	Appointment.reqAppointment(data,function(err,callback){
									if(err){
										res.json({"errorcode":0});
									}
									if(callback)
									{
										res.json({"errorcode":1});
									}
								});
	});//console.log(data);
	
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
var dates=moment(req.body[0].date).format('YYYY-MM-DD');
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

	Appointment.deleteAppointments(req.body._id,function(err,callback){
		if(err){

		}
	});

});

router.get('/getApprovedAppointment',function(req,res){

	var date=moment().format('YYYY-MM-DD');
	console.log(date);

	Appointment.getApprovedAppointments(req.session.doctor._id,date,function(err,datas){
		if(err){

		}
	
		res.json(datas);
	});

});


module.exports = router;