var app = angular.module("myadmin", []);

app.controller("adminController", ['$scope','getPatientDatas','getDoctorDatas', function($scope,getPatientDatas,getDoctorDatas)  {


$scope.getPatientData=function(){

  getPatientDatas.patientsData().then(function(data){
  $scope.patientData=data;
  alert($scope.patientData.name);
});

}

$scope.getDoctorData= function(){

 getDoctorDatas.docData().then(function(data){
  $scope.doctorData=data;
  alert($scope.doctorData.name);
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