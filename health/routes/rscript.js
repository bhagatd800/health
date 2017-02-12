var express = require('express');
var router = express.Router();
var session = require('express-session');

let Rserve = require("rserve-js");

// Things that We Require.
// Resrve-js in node for communication between Rserve and Nodejs. It returns data in javascript format
//Rserve in R to communication between Rserve and Nodejs. Rserve does all the calculation/datamining
// mongolite to set up connection  between mongodb and R
//dplyr for filtering result


let client = Rserve.connect("localhost", 6311, function() {
    console.log("Connected to Rserve.");
        client.eval("library('mongolite')",function(err,res1){
    
        client.eval("datas<-read.csv('~/Desktop/data.csv')", function(err, res2) {
            console.log("table is loaded.");
        });

        client.eval("data<-datas[,c(2,3)]", function(err, res3) {
            
        });
        client.eval("print(data)",function(err, res4){

        });
        client.eval("library('dplyr')");
        //console.log("deepak kumar");
        client.eval("m<-mongo(collection='symptoms',db='healthcare')", function(err,res5){
        });
        //console.log("deepak");
        client.eval("symptom<-m$find()", function(err,res6){
         });
        client.eval("print(symptom)", function(err,res7){
            //console.log(res7);
        });
        client.eval("sym1<-symptom[1,1]", function(err,res7){
            //console.log(res7);
        });
        client.eval("sym2<-symptom[1,2]", function(err,res7){
            //console.log(res7);
        });

         client.eval("result<-subset(data,Sym1==sym1 | Sym1==sym2 |Sym1=='cough')", function(err, response){
            
        });
        client.eval("da<-summary(result)", function(err, response){
             
        });
         client.eval("print(result)", function(err, response){ 
            
            //console.log(response.value); // shows dimension of iris table
        });
        
    });
});


//https://rforge.net/Rserve/example.html
//http://ruby-statsample.rubyforge.org/rserve-client/Rserve/Connection.html#method-i-assign
module.exports = router;