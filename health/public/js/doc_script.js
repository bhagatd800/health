var app = angular.module("myapp", []);

app.controller("tabController", ['$scope','getDatas','postDatas','changePassword', function($scope,getDatas,postDatas,changePassword)  {

$scope.getDocData=function(){  
getDatas.docData().then(function(data){
  $scope.data=data;
  
});
}
$scope.save=function(){
  postDatas.postDocData($scope.data);
}

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



app.factory("getDatas",['$http',function($http){
  
  return{
    docData:function(){
    docDatas=$http({
      method: 'GET',
      url: '/doctor/getDocData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return docDatas;

   }  
    
}
  
}]);

app.service("postDatas",['$http',function($http){
return{
  postDocData:function(docData){
  $http({
    url: '/doctor/update_profile',
    method: "POST",
    data: docData,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(docData){ //.success is deprecated,so use .then
    alert("Updated Successfully");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  }
}
}]);
app.service("changePassword",['$http',function($http){

return{
  updatePassword:function(password){
  $http({
    url: '/doctor/update_password',
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


}])
 
