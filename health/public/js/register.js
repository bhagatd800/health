var app = angular.module("register", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("registerController",['$scope','$rootScope','$window','registerUser','getUsers',function($scope,$rootScope,$window,registerUser,getUsers){


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


$scope.getUser=function(){

  getUsers.getData().then(function(data){
    $rootScope.user=data;
   // alert(JSON.stringify($rootScope.user));
  });

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


app.factory("getUsers",['$http',function($http){
  
  return{
    getData:function(){
    data=$http({
      method: 'GET',
      url: '/register/getUser'
  }).then(function(response) {
      
      return response.data;
      
    })
    //alert(JSON.stringify(data));
    return data;

   }  
    
}
  
}]);


app.directive('usernameAvailable', function($timeout, $q,$rootScope) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, elm, attr, model) { 
      model.$asyncValidators.usernameExists = function(username) { 
        result=false;
        for(i=0;i<$rootScope.user.length;i++){
        if($rootScope.user[i].username==username){
            result=false;
            break;
         }
         else{
          result=true;
         }
         }   

        var defer = $q.defer();
        $timeout(function(){
          model.$setValidity('usernameExists', result); 
          defer.resolve;
        }, 1000);
        return defer.promise;
      };
    }
  } 
});