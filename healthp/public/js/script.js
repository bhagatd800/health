var app = angular.module("myapp", []);
app.controller("login_route", ['$scope', function($scope)  {
  $scope.routePatient = function(){

     $http.get("register/login");
  }
}]);
 