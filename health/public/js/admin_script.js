var app = angular.module("myadmin", ['ngFileUpload','jkAngularRatingStars']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller("adminController", ['$scope','Upload','getPatientDatas','deleteDoc','getDoctorDatas','deletePatients','changePassword','getNewDoctor','approveDoctor','uploadHospital','checkPasswords','getHospitals','deleteHospitals', function($scope,Upload,getPatientDatas,deleteDoc,getDoctorDatas,deletePatients,changePassword,getNewDoctor,approveDoctor,uploadHospital,checkPasswords,getHospitals,deleteHospitals)  {

$scope.hospitalData={

'name':'',
'city':'',
'phone':'',
'specialty':'',
'address':'',
'imageName':''
};

        $scope.uploadImage = function(){
              $scope.upload($scope.file);
              uploadHospital.upload($scope.hospitalData);
              
          
        };
        $scope.upload = function (file) {
           $scope.file=Upload.rename(file,$scope.hospitalData.city+$scope.hospitalData.name +"."+ file.name.substring(file.type.lastIndexOf('/'), file.name.length).replace('/', '.'));
           $scope.hospitalData.imageName=$scope.file.ngfName;
            Upload.upload({
                url: '/admin/upload', //webAPI exposed to upload the file
                data:{file:file
} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){

                  alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                alert('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scopr.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        
        };



$scope.getPatientData=function(){

  getPatientDatas.patientsData().then(function(data){
  $scope.patientData=data;
  //alert($scope.patientData.name);
});


}

$scope.getHospitalData=function(){

  getHospitals.getData().then(function(data){
  $scope.hospital=data;
  //alert("$scope.patientData.name");
});
}  

 $scope.deleteHospital=function(id){
  if(confirm("Do you want to Delete Hospital"))
  {

  deleteHospitals.delete(id);
  getHospitals.getData().then(function(data){
  $scope.hospital=data;
  
});
}
 }


$scope.newDoctor=function(){

getNewDoctor.getData().then(function(data){
  $scope.newDoctor=data;
  //alert($scope.doctorData[0].name);
});
}

$scope.getDoctorData= function(){

 getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;

  //alert($scope.doctorData[0].name);
});
} 

 $scope.deleteDoctor=function(id){
  if(confirm("Do you want to Delete user"))
  {
  deleteDoc.delete(id);
  getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;

  
});
}
 }
 $scope.deleteNewDoctor=function(id){
  if(confirm("Do you want to Delete user")){
  deleteDoc.delete(id);
  getNewDoctor.getData().then(function(data){
  $scope.newDoctor=data;
  
  
});
}
 }


 $scope.approve=function(id){
  
  approveDoctor.approve(id);
  getNewDoctor.getData().then(function(data){
  $scope.newDoctor=data;
  
  
});
 }
  $scope.deletePatient=function(id){
  if(confirm("Do you want to Delete user")){
  deletePatients.delete(id);
  getPatientDatas.patientsData().then(function(data){
  $scope.patientData=data;
  
});
}
}
$scope.password={
  'currentPassword':'',
  'password1':'',
  'password2':''
};
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

}]);

app.factory("getPatientDatas",['$http',function($http){

return{
	patientsData:function(){
    patientDatas=$http({
      method: 'GET',
      url: '/admin/getPatientsData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return patientDatas;

   }

}


}]);
app.factory("getNewDoctor",['$http',function($http){

return{
  getData:function(){
    datas=$http({
      method: 'GET',
      url: '/admin/newdoctor'
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

app.factory("deleteDoc",['$http',function($http){

return{

   delete:function(id){
    alert(abc);
     docDatas=$http({
      method: 'POST',
       url: '/admin/delete_doctor',
       data:id,
       headers: {
             'Content-Type': 'application/json'
    }
   })
 }    



}

}]);
app.factory("deletePatients",['$http',function($http){

return{

   delete:function(id){
     docDatas=$http({
      method: 'POST',
       url: '/admin/delete_patient',
       data:id,
       headers: {
             'Content-Type': 'application/json'
    }
   })
 }    



}

}]);
app.service("changePassword",['$http',function($http){

return{
  updatePassword:function(password){
  $http({
    url: '/admin/update_password',
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
app.service("approveDoctor",['$http',function($http){

return{
  approve:function(id){
  $http({
    url: '/admin/approve',
    method: "POST",
    data: id,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(approve){ //.success is deprecated,so use .then
    alert("Updated Successfully");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});

  }

}


}]);




app.service("uploadHospital",['$http',function($http){

return{
  upload:function(password){
  $http({
    url: '/admin/uploadhospital',
    method: "POST",
    data: password,
    headers: {
             'Content-Type': 'application/json'
    }
})

}

}}
]);

app.service("checkPasswords",['$http',function($http){

return{
  checkPassword:function(data){

    //alert(password.password1);
  data=$http({
    url: '/admin/checkPassword',
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


app.factory("getHospitals",['$http',function($http){

return{

   getData:function(){
     docDatas=$http({
      method: 'GET',
       url: '/admin/getHospital'
   }).then(function(response) {
      
       return response.data;
      
     })
      
     return docDatas;

    }


}

}]);

app.service("deleteHospitals",['$http',function($http){

return{
  delete:function(data){
    alert("jahs");
  $http({
    url: '/admin/deleteHospital',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
})

}

}}
]);