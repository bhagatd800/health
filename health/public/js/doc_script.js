var app = angular.module("myapp", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("tabController", ['$scope','getDatas','postDatas','changePassword','postSymptom','getResult', function($scope,getDatas,postDatas,changePassword,postSymptom,getResult)  {

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
$scope.symptom={
  'sym1':'',
  'sym2':'',
  'sym3':'',
  'sym4':'',
  'sym5':''
};
$scope.search=function(){
  $scope.disease="";
  if(($scope.symptom.sym1==$scope.symptom.sym2)||($scope.symptom.sym1==$scope.symptom.sym3)||($scope.symptom.sym1==$scope.symptom.sym4)||($scope.symptom.sym1==$scope.symptom.sym5)||($scope.symptom.sym2==$scope.symptom.sym3)||($scope.symptom.sym2==$scope.symptom.sym4)||($scope.symptom.sym2==$scope.symptom.sym5)||($scope.symptom.sym3==$scope.symptom.sym4)||($scope.symptom.sym3==$scope.symptom.sym5)||($scope.symptom.sym4==$scope.symptom.sym5)){
    alert("Enter Different Symptoms");
  }else{
    postSymptom.postData($scope.symptom);
    getResult.getData().then(function(data){
    $scope.diseases=data;
   // $scope.disease="Your Symptom shows you might have";
    if($scope.diseases=="Sorry"){

      $scope.disease="Sorry no result Found. Look for Doctor or nearby Hospital";
    }
    else{
      $scope.disease="Your Symptom shows you might have"+" "+$scope.diseases.Disease+"."+"You can aslo search for Doctor or Near by Hospital";
    }

   })
}
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


}]);
app.service("postSymptom",['$http',function($http){

return{
  postData:function(symptom){

    //alert(password.password1);
  $http({
    url: '/symptom/postSymptom',
    method: "POST",
    data: symptom,
    headers: {
             'Content-Type': 'application/json'
    }
})

}
}}]);

app.factory("getResult",['$http',function($http){
  
  return{
    getData:function(){
    datas=$http({
      method: 'GET',
      url: '/rscript/getData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return datas;

   }  
    
}
}]);
 
