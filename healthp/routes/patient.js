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



router.post('/login',function(req,res){
  Patient.getPatientByUsername(req.body.username,function(err,user){
    if(!user){
      console.log("invalid username")
      res.redirect('/patient/login');
    } 
    else{
        Patient.comparePassword(req.body.password, user.password, function(err, isMatch){
      
       // if(err) throw err;
        if(isMatch){
          res.redirect('/patient/patient_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});



module.exports = router;