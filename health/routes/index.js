
var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.patient)
    res.redirect('/patient/patient_home');
	else if(req.session.doctor)
    res.redirect('/doctor/doctor_home');
	else if(req.session.admin)
    res.redirect('/admin/admin_home');
	else
  	res.render('index');
});


router.get('/admin',function(req,res){
	 if(req.session.admin)
  {
    
    res.redirect('/admin/admin_home');}
  else
  res.render('admin_login');
});

router.get('/login', function(req, res) {


  if(req.session.doctor)
  {
    
    res.redirect('/doctor/doctor_home');}
  else if(req.session.patient)
  {
    
    res.redirect('/patient/patient_home');}  
  else
  res.render('login');
});



module.exports = router;