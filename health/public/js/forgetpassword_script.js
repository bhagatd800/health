var app = angular.module("password", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("Controller", ['$scope','checkEmails','sendEmails',function($scope,checkEmails,sendEmails){

 $scope.email={
 	'email':''
 };

 $scope.disabled=true;
$scope.checkEmail =function(){

checkEmails.checkEmail($scope.email).then(function(data){
if(data==1){
	$scope.disabled=false;
	$scope.status=data;
	//alert($scope.status);
	
}
else{
	$scope.status=data;
}

});
}
$scope.save=function(){
	sendEmails.sendEmail($scope.email);
}

}]);

app.service("checkEmails",['$http',function($http){

return{
  checkEmail:function(data){

    //alert(password.password1);
  data=$http({
    url: '/patient/checkEmail',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(response){

    return response.data.errorCode;
  
 
  
})
return data;
}
}
}]);


app.service("sendEmails",['$http','$window',function($http,$window){

return{
  sendEmail:function(data){

    //alert(password.password1);
  $http({
    url: '/patient/sendEmail',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(response){

    if(response.data.errorCode==1){
    	alert( "new password is send to your mail");
    	$window.location.href='/patient/login';
    }
    if(response.data.errorCode==0){
    	alert("some error occured.please try again")
    }
  })

}
}
}]);

app.controller("doctorController", ['$scope','checkEmail','sendEmail',function($scope,checkEmail,sendEmail){

 $scope.email={
 	'email':''
 };

 $scope.disabled=true;
$scope.checkEmail =function(){

checkEmail.checkEmail($scope.email).then(function(data){
if(data==1){
	$scope.disabled=false;
	$scope.status=data;
	//alert($scope.status);
	
}
else{
	$scope.status=data;
}

});
}
$scope.save=function(){
	sendEmail.sendEmail($scope.email);
}

}]);

app.service("checkEmail",['$http',function($http){

return{
  checkEmail:function(data){

    //alert(password.password1);
  data=$http({
    url: '/doctor/checkEmail',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(response){

    return response.data.errorCode;
  
 
  
})
return data;
}
}
}]);


app.service("sendEmail",['$http','$window',function($http,$window){

return{
  sendEmail:function(data){

    //alert(password.password1);
  $http({
    url: '/doctor/sendEmail',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(response){

    if(response.data.errorCode==1){
    	alert( "new password is send to your mail");
    	$window.location.href='/patient/login';
    }
    if(response.data.errorCode==0){
    	alert("some error occured.please try again")
    }
  })

}
}
}]);