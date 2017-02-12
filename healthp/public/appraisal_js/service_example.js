var mainMod = angular.module('MainApp', []);
mainMod.controller('MainCtrl', ['$scope','dataShare',
    function ($scope,dataShare) {         
         $scope.text = 'Hey';
         $scope.send = function(){
           dataShare.sendData($scope.text);
         };

    }
]);
mainMod.controller('MainCtrl2', ['$scope','dataShare',
    function ($scope,dataShare) {         
         
                $scope.text = '';
                $scope.$on('data_shared',function(){
                            var text =  dataShare.getData();    
              $scope.text = text;
        });
    }
]);
mainMod.factory('dataShare',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});