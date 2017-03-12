var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctors');
var Patient =require('../models/patients');
var flash = require('connect-flash');
var randomstring = require("randomstring");
router.get('/register', function(req, res) {
  res.render('register');

});

router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var user_type=req.body.user_type;
	var contact=req.body.contact;
	var regno=req.body.regno;
	//console.log(user_type);


	if (user_type==='Patient')
		{
		var newPatient = new Patient({
			name: name,
			email:email,
			username: username,
			password: password,
			user_type:user_type,
			contact:contact
		});

		Patient.createPatient(newPatient, function(err, user){
			if(err){
				res.json({"errorcode":1})
			}
			else{
				res.json({"errorcode":0})
			}
		});

	}

	if (user_type==='Doctor')
		{
		var newDoctor = new Doctor({
			name: name,
			email:email,
			username: username,
			password: password,
			user_type:user_type,
			contact:contact,
			regno:regno,
			status:0
		});

		Doctor.createDoctor(newDoctor, function(err, user){
			if(err){
				res.json({"errorcode":1})
			}
			else{
				res.json({"errorcode":0})
			}
		});
	}
});

router.post('/getUser',function(req,res){
var data=[];
Doctor.getDoctorUserName(function(err,user){

if(user){
	var doctorData=user;
	//console.log(doctorData);
	for(i=0;i<doctorData.length;i++){
		//console.log(doctorData[i].username);
		var item={
		username:doctorData[i].username
		 }
		 //console.log(item);
		 data.push(item);
	}
	//console.log(data);
}

Patient.getEntireData(function(err,user){
var result;
if(user){
		var patientData=user;
		//console.log(patientData);
		for(i=0;i<patientData.length;i++){
			//console.log(patientData[i].username);
			var item={
			username:patientData[i].username
			}
			 data.push(item);
		}


		for(i=0;i<data.length;i++){
			if(data[i].username===req.body.username)
			{
				var result=false;
				break;
			}
			else{
				var result=true;
			}
		
		}
		
	}
if(result==true){
res.json(true);
}
if(result==false){
res.json(false);
}

}); 
});
});

router.get('/logout', function(req, res,next) {
	req.session.patient=null;
	req.session.doctor=null;
	req.session.admin=null;
  res.render('index');
});

router.get('/getCaptcha', function(req, res,next) {
var captcha=randomstring.generate(5);
res.json({"captcha":captcha})
});
module.exports = router;