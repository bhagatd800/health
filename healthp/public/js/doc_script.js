var app = angular.module("myapp", []);

app.controller("tabController", ['$scope','getDatas','$rootScope', function($scope,getDatas,$rootScope)  {

$scope.getDocData=function(){  
getDatas.docData().then(function(data){
  $scope.data=data;
  //alert($rootScope.data.email);
});


}
}]);

app.controller("updateController", ['$scope','$rootScope',function($scope,$rootScope){

//$scope.name=$rootScope.data.name;
alert("deepak");

}]);

app.factory("getDatas",['$http',function($http){
  var docDatas = {content:null};
  return{
    docData:function(){
    docDatas=$http({
      method: 'GET',
      url: '/doctor/getDocData'
  }).then(function(response) {
      //alert(this.response.data.email);
      return response.data;
      //alert(this.docDatas.name);
    })
      
    return docDatas;

   },  
    
}
  
}]);
 
