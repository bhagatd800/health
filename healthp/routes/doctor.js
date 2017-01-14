var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Doctor = require('../models/doctors');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('doctor_login');
});
router.get('/doctor_home', function(req, res, next) {
  res.render('doctor_home');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log(username);
   Doctor.getDoctorByUsername(username, function(err, user){
   	console.log(user);
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	console.log(user);
   	Doctor.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Doctor.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/doctor/doctor_home', failureRedirect:'/doctor/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;