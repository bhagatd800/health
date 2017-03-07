var express = require('express');
var router = express.Router();
var session = require('express-session');


var Doctor = require('../models/doctors');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  if(req.session.doctor)
  {
    
    res.redirect('/doctor/doctor_home');}
  else
  res.render('doctor_login');
});
router.get('/doctor_home', function(req, res, next) {
  if(req.session.doctor)
  res.render('doctor_home',{
    users:'1'
  });
  else res.redirect('/doctor/login');
});

router.post('/login',function(req,res){
  Doctor.getDoctorByUsername(req.body.username,function(err,user){
    if(!user){
      req.flash('logininfo', 'Invalid UserName or Password');
      res.redirect('/doctor/login');
    } 
    else{
        Doctor.comparePassword(req.body.password, user.password, function(err, isMatch){
      
        if(!isMatch){
          req.flash('logininfo', 'Invalid UserName or Password');
          res.redirect('/doctor/login');
        }
        if(isMatch){
          delete user.password;
          req.session.patient=null;
          req.session.admin=null;
          req.session.doctor = user;
          
          res.redirect('/doctor/doctor_home');
        
      } 
        
      }
  )}
})
});

router.get('/getDocData' ,function(req,res){
  Doctor.getDocData(req.session.doctor._id,function(err,user){
    if(!user){
      console.log('error');
    }
    else
    {
      delete user.password;
      
      res.json(user);

    }
  })
 


});
router.post('/update_profile',function(req,res){
  Doctor.updateProfile(req.session.doctor._id,req.body, function(err,user){
    if(err){
      res.json({"errorcode":0})
    }
    else{
      res.json({"errorcode":1})
    }

  })
  
});

router.post('/update_password',function(req,res){
  Doctor.updatePassword(req.session.doctor._id,req.body.password1,function(err,user){
    if(!user){
      console.log('error');
    }
    else{
      res.redirect('/doctor/login');
    }

  })


});

router.post('/checkPassword', function(req, res) {
//console.log(req.body.currentPassword);
    Doctor.comparePassword(req.body.currentPassword,req.session.doctor.password,function(err,datas){
    if(!datas){
      //console.log("not matched");
      res.json({"errorCode":0});
    }
else{
  //console.log("matched");
  res.json({"errorCode":1});
}  
  });

  
});
module.exports = router;