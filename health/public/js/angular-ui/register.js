var app = angular.module("registerform", ['ui.bootstrap']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("registerformController", ['$scope',function($scope){
$scope.password1="deepak";
  
}]);