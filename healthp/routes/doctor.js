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

router.post('/login',function(req,res){
  Doctor.getDoctorByUsername(req.body.username,function(err,user){
    if(!user){
      console.log("invalid username")
      res.redirect('/doctor/login');
    } 
    else{
        Doctor.comparePassword(req.body.password, user.password, function(err, isMatch){
      
       // if(err) throw err;
        if(isMatch){
          res.redirect('/doctor/doctor_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});
   

module.exports = router;