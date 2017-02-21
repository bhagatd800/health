var app = angular.module("register", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("registerController",['$scope','$window','registerUser',function($scope,$window,registerUser){


$scope.user={
'name':'',
'username':'',
'email':'',
'user_type':'',
'password':''
};

$scope.register=function(){
registerUser.postData($scope.user)



if($scope.user.user_type=="Doctor"){
	alert("SUCCESSFULLY REGISTERED. YOU CAN LOGIN AFTER VERIFICATION BY ADMINISTRATOR");
$window.location.href='/doctor/login';

}
if($scope.user.user_type=="Patient"){
	alert("SUCCESSFULLY REGISTERED.PLEASE LOGIN TO CONTINUE");
	$window.location.href='/patient/login';

}

}
}]);


app.service("registerUser",['$http',function($http){
return{
  postData:function(data){

    //alert(password.password1);
  $http({
    url: '/register/register',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
});
}
}
}]);