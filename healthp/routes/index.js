var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user)
    res.redirect('/patient/patient_home');
	else if(req.session.users)
    res.redirect('/doctor/doctor_home');
	else
  	res.render('index', { title: 'Express' });
});

module.exports = router;
