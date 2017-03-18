var express = require('express');
var router = express.Router();
var session = require('express-session');
var rio = require("rio");




router.get('/getData' ,function(req,res){
    rio.$e({
    command: "require(RJSONIO);library('mongolite');library('dplyr');datas<-read.csv('~/Desktop/data.csv');data<-datas[,c(2,3)];m<-mongo(collection='symptoms',db='healthcare');symptom<-m$find();sym1<-symptom[1,1];sym2<-symptom[1,2];sym3<-symptom[1,3];sym4<-symptom[1,4];sym5<-symptom[1,5];result<-subset(data,Sym1==sym1 | Sym1==sym2 | Sym1==sym3 | Sym1==sym4 | Sym1==sym5);print(result);results<-result;results<-group_by(results,Disease);results<-mutate(results,n=n());results<-ungroup(results);results<-filter(results,n==max(3)|n==max(4)|n==max(5));results<-select(results,-n);print(results);disease<-results[1,2];row<-nrow(results);print(row);if(row>=3){predicted_data<-disease}else{predicted_data<-'Sorry'};print(predicted_data); toJSON(predicted_data)"
}).then(function (data) {
result=(JSON.parse(data));
res.json(result)
});

});
 

module.exports = router;