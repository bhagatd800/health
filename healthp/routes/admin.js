var express = require('express');
var router = express.Router();
var session = require('express-session');
var Admin = require('../models/admin');
var Patient = require('../models/patients');
var Doctor = require('../models/doctors');

router.get('/admin_home', function(req, res, next) {
  if(req.session.admin)
  res.render('admin_home',{
    users:'1'
  });
  else res.redirect('/admin');
});


router.post('/login',function(req,res){
	Admin.getAdminByUsername(req.body.username,function(err,user){
    if(!user){
      console.log("invalid username")
      res.redirect('/admin');
    } 
    else{
        Admin.comparePassword(req.body.password, user.password, function(err, isMatch){
      
       // if(err) throw err;
        if(isMatch){
          delete user.password;
          req.session.doctor=null;
          req.session.patient=null;
          req.session.admin= user;
          
          res.redirect('/admin/admin_home');
        
      } else {
        console.log('Invalid password');
      }
        
      }
  )}
})
});

router.get('/getDocData' ,function(req,res){
 
res.json({"name":"deepak kumar"});
  // Doctor.getEntireData(function(err,user){
  //   if(!user){
  //     console.log('error');
  //   }
  //   else
  //   {
  //     delete user.password;
      
  //     res.json(user);

  //   }
  // })

});

router.get('/getPatientsData' ,function(req,res){
  res.json({"name":"deepak"});

  // Patient.getEntireData(function(err,user){
  //   if(!user){
  //     console.log('error');
  //   }
  //   else
  //   {
  //     delete user.password;
      
  //     res.json(user);

  //   }
  // })

});



module.exports = router;