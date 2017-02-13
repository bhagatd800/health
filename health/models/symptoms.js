var mongoose = require('mongoose');
var SymptomSchema = mongoose.Schema({
	sym1: {
		type: String,
		index:true
	},
	sym2: {
		type: String
	},
	sym3: {
		type: String
	},
	sym4: {
		type: String
	},
	sym5:{
		type:String
	}

});

var symptom = module.exports = mongoose.model('symptom', SymptomSchema);

module.exports.insertSymptom=function(symptoms,callback){
	symptom.update({ _id:"58a1632c7cd289304e76bfd6"}, symptoms, callback);	
}