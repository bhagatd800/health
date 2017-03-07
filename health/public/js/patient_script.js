var app = angular.module("mypatient", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("patientController", ['$scope','changePassword','postSymptom','getResult','getDoctorDatas','reqAppointments','getappointmentStatus','deleteAppointments','getHospitalDatas','checkPasswords', function($scope,changePassword,postSymptom,getResult,getDoctorDatas,reqAppointments,getappointmentStatus,deleteAppointments,getHospitalDatas,checkPasswords)  {

$scope.password={
  'currentPassword':'',
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

$scope.getDoctorData= function(){

 getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;
  //alert($scope.doctorData[0].name);
});
}
$scope.disabled=false;
$scope.search=function(){
  $scope.disease="";
  if(($scope.symptom.sym1==$scope.symptom.sym2)||($scope.symptom.sym1==$scope.symptom.sym3)||($scope.symptom.sym1==$scope.symptom.sym4)||($scope.symptom.sym1==$scope.symptom.sym5)||($scope.symptom.sym2==$scope.symptom.sym3)||($scope.symptom.sym2==$scope.symptom.sym4)||($scope.symptom.sym2==$scope.symptom.sym5)||($scope.symptom.sym3==$scope.symptom.sym4)||($scope.symptom.sym3==$scope.symptom.sym5)||($scope.symptom.sym4==$scope.symptom.sym5)){
    alert("Enter Different Symptoms");
  }else{
    $scope.disabled=true;
    postSymptom.postData($scope.symptom);
    getResult.getData().then(function(data){
    $scope.diseases=data;
   // $scope.disease="Your Symptom shows you might have";
    if($scope.diseases=="Sorry"){

      $scope.disease="Sorry no result Found. Look for Doctor or nearby Hospital";
      $scope.disabled=false;
    }
    else{
      $scope.disease="Your Symptom shows you might have"+" "+$scope.diseases.Disease+"."+"You can aslo search for Doctor or Near by Hospital";
      $scope.disabled=false;
    }

   })
}
}
$scope.checkPassword=function(){
  //alert($scope.password.currentPassword);
  checkPasswords.checkPassword($scope.password).then(function(data){
    $scope.passwordStatus=data;
    //alert($scope.passwordStatus);
  })
}
$scope.change_password=function(){
  if($scope.passwordStatus==1){
  if($scope.password.password1==$scope.password.password2)

  {
      //alert($scope.password.password1);
      changePassword.updatePassword($scope.password)
  }
  else
  {
    $scope.passwordStatus=3;
  }
}
}
$scope.reqAppointment=function(data){

reqAppointments.postData(data);
}
$scope.getAppointmentStatus=function(){
  getappointmentStatus.getData().then(function(data){
    $scope.appointmentStatus=data;
  });

};
$scope.deleteAppointment=function(data){
  if(confirm("Do u want to Delete?")){
  deleteAppointments.postData(data);
  getappointmentStatus.getData().then(function(data){
  $scope.appointmentStatus=data;
  });
}
};

$scope.getHospitalData=function(){
 
  getHospitalDatas.getData().then(function(data){

    $scope.hospitalData=data;
  })
}

}]);

app.service("reqAppointments",['$http',function($http){

return{
  postData:function(data){

    //alert(password.password1);
  datas=$http({
    url: '/appointment/reqAppointment',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(resp){
  if(resp.data.errorcode===0){
    alert("some thing went wrong please try again");
  }
  if(resp.data.errorcode===1){
    alert("Request Send Successfully");
  }
})
 

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
app.factory("getDoctorDatas",['$http',function($http){

return{

   docData:function(){
     docDatas=$http({
      method: 'GET',
       url: '/admin/getDocData'
   }).then(function(response) {
      
       return response.data;
      
     })
      
     return docDatas;

    }


}

}]);
app.factory("getappointmentStatus",['$http',function($http){
  
  return{
    getData:function(){
    datas=$http({
      method: 'GET',
      url: '/appointment/getAppointmentStatus'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return datas;

   }  
    
}
}]);

app.service("deleteAppointments",['$http',function($http){

return{
  postData:function(data){

    //alert(password.password1);
  $http({
    url: '/appointment/deleteAppointment',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
})

}
}}]);


app.factory("getHospitalDatas",['$http',function($http){
  
  return{
    getData:function(){
    datas=$http({
      method: 'GET',
      url: '/patient/getHospitalData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return datas;

   }  
    
}
}]);


app.service("checkPasswords",['$http',function($http){

return{
  checkPassword:function(data){

    //alert(password.password1);
  data=$http({
    url: '/patient/checkPassword',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(response){
  if(response.data.errorCode===0){

   // alert("not matched");
    return response.data.errorCode;
  }
  if(response.data.errorCode===1){
   // alert("matched");
    return response.data.errorCode;
  }
})
return data;
}
}}]);