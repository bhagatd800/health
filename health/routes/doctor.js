var express = require('express');
var router = express.Router();
var session = require('express-session');
var email=require('emailjs/email');

var Doctor = require('../models/doctors');
var randomstring = require("randomstring");
var multer = require('multer');


var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
          //console.log(file);
            cb(null, 'public/doctor/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname)
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');


router.get('/doctor_home', function(req, res, next) {
  if(req.session.doctor)
  res.render('doctor_home',{
    users:'1'
  });
  else res.redirect('/doctor/login');
});

router.post('/login',function(req,res){
  console.log(req.body);
  Doctor.getDoctorByUsername(req.body.username,function(err,user){
    if(!user){
    res.json({"errorcode":1})
    }
  else{
        Doctor.comparePassword(req.body.password, user.password, function(err, isMatch){
      
        if(!isMatch){
          res.json({"errorcode":1})
          //req.flash('logininfo', 'Invalid UserName or Password');
          //res.redirect('/doctor/login');
        }
        if(isMatch){
          delete user.password;
          req.session.patient=null;
          req.session.admin=null;
          req.session.doctor = user;
          res.json({"errorcode":0});
          //res.redirect('/doctor/doctor_home');
        
      } 
        
      
  
})
      }
});
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
     // res.redirect('/doctor/login');
    }

  })


});

router.post('/setRating',function(req,res){
  if(req.body.rating2==0){
   var rating=req.body.rating1;
  }
  else{
  var rating=((req.body.rating1+req.body.rating2)/2);
}
  console.log(rating);
  Doctor.setRatings(req.body.id,rating,function(err,user){
    if(!user){
      console.log('error');
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

router.get('/forgetpassword',function(req,res){
res.render('forgetpasswords');
});



router.post('/upload', function(req, res) {
        console.log("dkj");
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });

module.exports = router;
//$2a$10$8n3h2nb6eLy2RoYpKbi4B.OKb0bhJ3KB910rtK9ndNREwIpt289yO