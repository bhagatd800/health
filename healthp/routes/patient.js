var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Patient = require('../models/patients');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  if(req.session.user)
  {
    
    res.redirect('/patient/patient_home');}
  else
  res.render('patient_login');
});
router.get('/patient_home', function(req, res, next) {
  if(req.session.user)
  res.render('patient_home',{
    users:'1'
  });
  else res.redirect('/patient/login');
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
          delete user.password;
          req.session.users=null;
          req.session.user = user;
          
          res.redirect('/patient/patient_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});



module.exports = router;