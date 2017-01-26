var app = angular.module("mypatient", []);

app.controller("patientController", ['$scope','changePassword', function($scope,changePassword)  {

$scope.password={
  'password1':'',
  'password2':''
};
$scope.change_password=function(){
  if($scope.password.password1==$scope.password.password2)

  {
      //alert($scope.password.password1);
      changePassword.updatePassword($scope.password)
  }
  else
  {
    alert("Password Doesnot Match");
  }
}


}]);


app.service("changePassword",['$http',function($http){

return{
  updatePassword:function(password){

  	//alert(password.password1);
  $http({
    url: '/patient/update_password',
    method: "POST",
    data: password,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(password){ //.success is deprecated,so use .then
    alert("Updated Successfully");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});

 

}
}


}]);