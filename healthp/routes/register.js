var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctors');
var Patient =require('../models/patients');

router.get('/register', function(req, res,next) {
  res.render('register', { title: 'Express' });
});

router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var user_type=req.body.user_type;
	//console.log(user_type);

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('error');
	} else if (user_type==='Patient')
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
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/patient/login');
	}

	else if (user_type==='Doctor')
		{
		var newDoctor = new Doctor({
			name: name,
			email:email,
			username: username,
			password: password,
			user_type:user_type
		});

		Doctor.createDoctor(newDoctor, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/doctor/login');
	}
});


module.exports = router;