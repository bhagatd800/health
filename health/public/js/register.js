var app = angular.module("register", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("registerController",['$scope','$rootScope','$window','registerUser',function($scope,$rootScope,$window,registerUser){

$scope.user={
'name':'',
'username':'',
'email':'',
'user_type':'',
'password':''
};

$scope.register=function(){ 
registerUser.postData($scope.user)
}


}]);


app.service("registerUser",['$http','$window',function($http,$window){
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
}).then(function(resp){
  if(resp.data.errorcode===1){
    alert("some thing went wrong please try again");

  }
  if(resp.data.errorcode===0){
    if(data.user_type=="Patient"){
      alert("SUCCESSFULLY REGISTERED.PLEASE LOGIN TO CONTINUE");
      $window.location.href='/patient/login';
    }
    if(data.user_type=="Doctor"){
        alert("SUCCESSFULLY REGISTERED. YOU CAN LOGIN AFTER VERIFICATION BY ADMINISTRATOR");
        $window.location.href='/doctor/login';

  }
    }
})
}
}
}]);

app.directive('usernameAvailable', function($timeout, $q,$http) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, elm, attr, model) { 
      model.$asyncValidators.usernameExists = function(username) { 
        //alert(username);
        username={
          'username':username
        }
        return $http({
              method:'POST',
              url: '/register/getUser',
              data:username, 
              headers: {
             'Content-Type': 'application/json'
              }
            }).then(function(res){+
            $timeout(function(){
            model.$setValidity('usernameExists', !!res.data); 
          }, 1000);
        });  
        
      };
    }
  } 
});