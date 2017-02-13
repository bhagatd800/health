var express = require('express');
var router = express.Router();
var Symptom=require('../models/symptoms');

router.post('/postSymptom',function (req,res) {

	symptom=req.body;
	
	Symptom.insertSymptom(symptom, function(err,callback){
		if(err){

		}

	})
});




module.exports = router;