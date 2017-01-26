var express = require('express');
var router = express.Router();
var session = require('express-session');
var Admin = require('../models/admin');

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




module.exports = router;