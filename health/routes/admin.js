var express = require('express');
var router = express.Router();
var session = require('express-session');
var Admin = require('../models/admin');
var Patient = require('../models/patients');
var Doctor = require('../models/doctors');
var Hospital = require('../models/hospital');
var multer = require('multer');


var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
          //console.log(file);
            cb(null, 'public/hospital/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + file.originalname)
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    router.post('/upload', function(req, res) {
       // console.log(req);
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });

router.get('/admin_home', function(req,res) {
  if(req.session.admin)
  res.render('admin_home',{
    users:'1'
  });
  else res.redirect('/admin');
});

router.get('/register', function(req,res) {
  
 res.render('admin_register');
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
router.get('/newdoctor' ,function(req,res){
  Doctor.newDoctor(function(err,user){
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

router.get('/getDocData' ,function(req,res){
 
//res.json({"name":"deepak kumar"});
  Doctor.getEntireData(function(err,user){
    if(!user){
      console.log('error');
    }
    else
    {
      delete(user.password);
      //console.log(user);
      res.json(user);

    }
  })

});

router.get('/getPatientsData' ,function(req,res){
  //res.json({"name":"deepak"});

  Patient.getEntireData(function(err,user){
    if(!user){
      console.log('error');
    }
    else
    {
      //delete user.password;
      
      res.json(user);

    }
  })

});

router.post('/delete_doctor',function(req,res){
  //console.log(req.body._id);
  Doctor.delete(req.body._id,function(err,callback){
    if(!callback){
      console.log('error');
    }
    else{
      //
    }

  });
})

router.post('/delete_patient',function(req,res){
  //console.log(req.body._id);
  Patient.delete(req.body._id,function(err,callback){
    if(!callback){
      console.log('error');
    }
    else{
      //
    }

  });
});

router.post('/update_password',function(req,res){
  Admin.updatePassword(req.session.admin._id,req.body.password1,function(err,user){
    if(!user){
      console.log('error');
    }
    else{
      //res.redirect('/doctor/login');
    }

  })


});

router.post('/approve',function(req,res){

  Doctor.approveDoctor(req.body._id,{status:1},function(err,user){
    if(!user){
      console.log('error');
    }
    else{
      //res.redirect('/doctor/login');
    }

  })


});


router.post('/uploadhospital',function(req,res){

  Hospital.upload(req.body,function(err,cb){

if(!cb){

}
else{
  
}

  });


});

router.post('/register',function(req, res){
  var newAdmin = new Admin({
      username: req.body.username,
      password: req.body.password
      
    });
Admin.createAdmin(newAdmin, function(err, user){
  if(!user){
      console.log('error');
    }
    else{
      res.redirect('/admin');
    }

  });

});

module.exports = router;