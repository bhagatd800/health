var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Doctor = require('../models/doctors');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  if(req.session.users)
  {
    
    res.redirect('/doctor/doctor_home');}
  else
  res.render('doctor_login');
});
router.get('/doctor_home', function(req, res, next) {
  if(req.session.users)
  res.render('doctor_home',{
    users:'1'
  });
  else res.redirect('/doctor/login');
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
          delete user.password;
          req.session.user=null;
          req.session.users = user;
          
          res.redirect('/doctor/doctor_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});

router.get('/getDocData' ,function(req,res){
  Doctor.getDocData(req.session.users._id,function(err,user){
    if(!user){
      console.log('error');
    }
    else
    {
      delete user.password;
      console.log(user);
      res.json(user);

    }
  })
 


});
   

module.exports = router;