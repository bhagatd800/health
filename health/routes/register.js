var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctors');
var Patient =require('../models/patients');
var flash = require('connect-flash');
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var user_type=req.body.user_type;
	console.log(user_type);


	if (user_type==='Patient')
		{
		var newPatient = new Patient({
			name: name,
			email:email,
			username: username,
			password: password,
			user_type:user_type
		});

		Patient.createPatient(newPatient, function(err, user){
			if(err) throw err;
			//console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/patient/login');
	}

	if (user_type==='Doctor')
		{
		var newDoctor = new Doctor({
			name: name,
			email:email,
			username: username,
			password: password,
			user_type:user_type,
			status:0
		});

		Doctor.createDoctor(newDoctor, function(err, user){
			if(err) throw err;
			//console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

	}
});

router.get('/logout', function(req, res,next) {
	req.session.patient=null;
	req.session.doctor=null;
	req.session.admin=null;
  res.render('index');
});
module.exports = router;