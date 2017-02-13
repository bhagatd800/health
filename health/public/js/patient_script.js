var app = angular.module("mypatient", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("patientController", ['$scope','changePassword','postSymptom','getResult', function($scope,changePassword,postSymptom,getResult)  {

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
}

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