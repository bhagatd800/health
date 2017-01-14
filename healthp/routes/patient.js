var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Patient = require('../models/patients');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('patient_login');
});

router.get('/patient_home', function(req, res, next) {
  res.render('patient_home');
});


passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log(username);
   Patient.getPatientByUsername(username, function(err, user){
   	console.log(user);
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	console.log(user);
   	Patient.comparePassword(password, user.password, function(err, isMatch){
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
  Patient.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/patient/patient_home', failureRedirect:'/patient/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });



module.exports = router;
