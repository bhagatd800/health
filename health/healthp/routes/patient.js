var express = require('express');
var router = express.Router();


var Patient = require('../models/patients');


/* GET users listing. */
router.get('/login', function(req, res) {
  if(req.session.patient)
  {
    
    res.redirect('/patient/patient_home');}
  else
  res.render('patient_login');
});
router.get('/patient_home', function(req, res) {
  if(req.session.patient)
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
          req.session.doctor=null;
          req.session.admin=null;
          req.session.patient = user;
          
          res.redirect('/patient/patient_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});

router.post('/update_password',function(req,res){

  Patient.updatePassword(req.session.patient._id,req.body.password1,function(err,user){
    if(!user){
      console.log('error');
    }
    else{
      res.redirect('/doctor/login');
    }

  })


});


module.exports = router;