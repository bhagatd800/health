var app = angular.module("login", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller("loginController", ['$scope','$http','$window', function($scope,$http,$window)  {
$scope.message=1;
$scope.data={
	'username':'',
	'password':'',
	'usertype':''
};	

$scope.submit=function()
{
	if($scope.data.usertype=="Doctor")
	{
		$scope.message=1;
	$http({
    url: '/doctor/login',
    method: "POST",
    data: $scope.data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(resp){
  if(resp.data.errorcode===1){

    $scope.message=0;

  }
  if(resp.data.errorcode===0){
    
      $window.location.href='/doctor/doctor_home';
    
    }
});
}
	else if($scope.data.usertype=="Patient"){
		$scope.message=1;
		  $http({
		    url: '/patient/login',
		    method: "POST",
		    data: $scope.data,
		    headers: {
		             'Content-Type': 'application/json'
		    }
		}).then(function(resp){
  if(resp.data.errorcode===1){
    $scope.message=0;

  }
  if(resp.data.errorcode===0){
    
      $window.location.href='/patient/patient_home';
    
    }
});

	}
	else{
		$scope.message=0;
	}

}

}]);

