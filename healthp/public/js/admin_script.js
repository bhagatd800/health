var app = angular.module("myadmin", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller("adminController", ['$scope','getPatientDatas','deleteDoc','getDoctorDatas','deletePatients', function($scope,getPatientDatas,deleteDoc,getDoctorDatas,deletePatients)  {


$scope.getPatientData=function(){

  getPatientDatas.patientsData().then(function(data){
  $scope.patientData=data;
  //alert($scope.patientData.name);
});

}

$scope.getDoctorData= function(){

 getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;
  //alert($scope.doctorData[0].name);
});
} 

 $scope.deleteDoctor=function(id){
  
  deleteDoc.delete(id);
  getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;
  
});
 }
  $scope.deletePatient=function(id){
  
  deletePatients.delete(id);
  getPatientDatas.patientsData().then(function(data){
  $scope.patientData=data;
  
});
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