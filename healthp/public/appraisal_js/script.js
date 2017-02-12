var app = angular.module("myapp", []);





app.controller("ListController0", ['$scope','$rootScope',function($scope,$rootScope)  {

$rootScope.progressBar=0;
$rootScope.progressBarValue=0;

  }]);

app.controller("ListController1", ['$scope','$http','getUserData',function($scope,$http,getUserData)  {

$scope.getData=function(){

getUserData.getDatas().then(function(data){
  $scope.data=data;
  
});

}

}]);


app.controller("ListController2", ['$scope','getAverage', '$rootScope','$http',function($scope,getAverage,$rootScope,$http)  {
  $scope.subjectAverages = [{
    'subjectName': '',
    'yearSem': '',
    'studentsAppeared': '',
     'studentsPassed':'',
     'percentage':'',
     'average':'',
     'facultyComment':'',
     'point':''
  }];
 
 $scope.calculatePercentage = function(val) {
    val.percentage = (parseFloat(val.studentsPassed)*100)/parseFloat(val.studentsAppeared);
    $scope.calAverage();
  };

  $scope.addNew = function(personalDetail) {
    $scope.subjectAverages.push({
      'subjectName': "",
    'yearSem': "",
    'studentsAppeared': "",
     'studentsPassed':"",
     'percentage':""
     
    });
  };
  $scope.parseFloat = function(value) {
    return parseFloat(value);
  };
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.subjectAverages.splice( index, 1);
    $scope.calAverage();
    // if no rows left in the array create a blank array
    if ($scope.subjectAverages.length() === 0){
      $scope.subjectAverages = [];
      $scope.calAverage();
    }
    
  };

  $scope.calAverage=function()
  {
    var total =0;
    angular.forEach($scope.subjectAverages,function(item){
      total += item.percentage;
    });
    $scope.subjectAverages[0].average = (total/$scope.subjectAverages.length).toFixed(2);

    if($scope.subjectAverages[0].average>=90)
      $scope.subjectAverages[0].point=20;
    else if(($scope.subjectAverages[0].average>=80)&&($scope.subjectAverages[0].average<90))
      $scope.subjectAverages[0].point=15;
    else if(($scope.subjectAverages[0].average>=70)&&($scope.subjectAverages[0].average<80))
      $scope.subjectAverages[0].point=10;
    else if(($scope.subjectAverages[0].average>=60)&&($scope.subjectAverages[0].average<70))
      $scope.subjectAverages[0].point=5;
    else
      $scope.subjectAverages[0].point=0;
}

  $scope.save=function(){

     
 $rootScope.progressBarValue=($rootScope.progressBarValue+$scope.subjectAverages[0].point);
 $rootScope.progressBar=(10/8)*$rootScope.progressBarValue;
 getAverage.subAverage($scope.subjectAverages[0].average);

 $http({
    url: 'appraisal/subaverage',
    method: "POST",
    data: $scope.subjectAverages,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  
}  

}]);




//***************************************LIST CONTROLLER 3***********************************************************




app.controller("ListController3", ['$scope','getAverage','$rootScope','$http', function($scope,getAverage,$rootScope,$http) {
  $scope.proctoringAverages = [{
    'studentAlloted': '',
    'yearSem': '',
    'studentsAppeared': '',
     'studentsPassed':'',
     'percentage':'',
     'average':'',
     'facultyComment':'',
     'point':''
  }];


  $scope.calculatePercentage = function(val) {
    val.percentage = (parseFloat(val.studentsPassed)*100)/parseFloat(val.studentsAppeared);
    $scope.calAverage();
  };

  $scope.addNew = function(proctoringAverage) {
    $scope.proctoringAverages.push({
    'studentAlloted': "",
    'yearSem': "",
    'studentsAppeared': "",
     'studentsPassed':"",
     'percentage':""
     
    });
  };
  $scope.parseFloat = function(value) {
    return parseFloat(value);
  };
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.proctoringAverages.splice( index, 1);
    $scope.calAverage();
    // if no rows left in the array create a blank array
    if ($scope.proctoringAverages.length() === 0){
      $scope.proctoringAverages = [];
      $scope.calAverage();
    }
    
  };

  $scope.calAverage=function()
  {
    var total =0;
    angular.forEach($scope.proctoringAverages,function(item){
      total += item.percentage;
    })
    $scope.proctoringAverages[0].average = (total/$scope.proctoringAverages.length).toFixed(2);
    if($scope.proctoringAverages[0].average>=90)
      $scope.proctoringAverages[0].point=20;
    else if(($scope.proctoringAverages[0].average>=80)&&($scope.proctoringAverages[0].average<90))
      $scope.proctoringAverages[0].point=15;
    else if(($scope.proctoringAverages[0].average>=70)&&($scope.proctoringAverages[0].average<80))
      $scope.proctoringAverages[0].point=10;
    else if(($scope.proctoringAverages[0].average>=60)&&($scope.proctoringAverages[0].average<70))
      $scope.proctoringAverages[0].point=5;
    else
      $scope.proctoringAverages[0].point=0;

  }


    $scope.save=function(){
      $rootScope.progressBarValue=($rootScope.progressBarValue+$scope.proctoringAverages[0].point);
      $rootScope.progressBar=(10/8)*$rootScope.progressBarValue;
    //alert($scope.subjectAverages[0].average);
    getAverage.proctoringAverage($scope.proctoringAverages[0].average);
    //alert(subjectAverages[0].average);
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.proctoringAverages,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

}]);




//*********************************************LISTCONTROLLER 4*********************************

app.controller("ListController4", ['$scope', 'getAverage','$rootScope','$http',function($scope,getAverage,$rootScope,$http) {
  $scope.studentFeedbacks = [{
    'subjectName': '',
    'yearSem': '',
      'studentsAppeared': '',
     'studentsPassed':'',
     'percentage':'',
     'average':'',
     'facultyComment':'',
     'point':''
  }];


  $scope.calculatePercentage = function(val) {
    val.percentage = (parseFloat(val.studentsPassed)*100)/parseFloat(val.studentsAppeared);
    $scope.calAverage();
  };

  $scope.addNew = function(studentFeedback) {
    $scope.studentFeedbacks.push({
      'subjectName': "",
    'yearSem': "",
    'studentsAppeared': "",
     'studentsPassed':"",
     'percentage':""
     
    });
  };
  $scope.parseFloat = function(value) {
    return parseFloat(value);
  };
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.studentFeedbacks.splice( index, 1);
    $scope.calAverage();
    // if no rows left in the array create a blank array
    if ($scope.studentFeedbacks.length() === 0){
      $scope.studentFeedbacks = [];
      $scope.calAverage();
    }
    
  };

  $scope.calAverage=function()
  {
    var total =0;
    angular.forEach($scope.studentFeedbacks,function(item){
      total += item.percentage;
    });
    $scope.studentFeedbacks[0].average = (total/$scope.studentFeedbacks.length).toFixed(2);
      if($scope.studentFeedbacks[0].average>=90)
      $scope.studentFeedbacks[0].point=20;
    else if(($scope.studentFeedbacks[0].average>=80)&&($scope.studentFeedbacks[0].average<90))
      $scope.studentFeedbacks[0].point=15;
    else if(($scope.studentFeedbacks[0].average>=70)&&($scope.studentFeedbacks[0].average<80))
      $scope.studentFeedbacks[0].point=10;
    else if(($scope.studentFeedbacks[0].average>=60)&&($scope.studentFeedbacks[0].average<70))
      $scope.studentFeedbacks[0].point=5;
    else
      $scope.studentFeedbacks[0].point=0;

  
  }


      $scope.save=function(){
    //alert($scope.subjectAverages[0].average);
    $rootScope.progressBarValue=($rootScope.progressBarValue+$scope.studentFeedbacks[0].point);
 $rootScope.progressBar=(10/8)*$rootScope.progressBarValue;
    //alert(subjectAverages[0].average);
    $rootScope.progressBar=($rootScope.progressBar+$scope.studentFeedbacks[0].point);
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.studentFeedbacks,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };
}]);



//***********************************************LIST CONTROLLER 5******************************************************





app.controller("ListController5", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.researchPublications = [{
    'researchPaper': "Scopus/SCI",
    'no_Paper': '',
    'maxMark': 20,
    'obtainedMarks':'',
    'facultyComment':''
     
  },
  {
    'researchPaper': "National/International Journal",
    'no_Paper': '',
    'maxMark': 15,
    'obtainedMarks':''
  },
  {
    'researchPaper': "Reputed Conference",
    'no_Paper': '',
    'maxMark': 10,
    'obtainedMarks':''
     
  },
  {
    'researchPaper': "Journal/Conference",
    'no_Paper': '',
    'maxMark': 5,
    'obtainedMarks':''
     
  },
  {
    'researchPaper': "No Journal/Conference",
    'no_Paper': '',
    'maxMark': 0,
    'obtainedMarks':''
     
  }

  ];

$scope.save=function(){
   
   
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.researchPublications,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };  
  }]);



//***************************************LISTCONTROLLER 6***************************************




app.controller("ListController6", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.scopusDetails = [{
    'JournalDetail': '',
    'JournalNumber': '',
    'reviewDetail': '',
     'author':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(scopusDetail) {
    $scope.scopusDetails.push({
      'JournalDetail': "",
    'JournalNumber': "",
    'reviewDetail': "",
     'author':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.scopusDetails.splice( index, 1);
    $scope.calAverage();
    // if no rows left in the array create a blank array
    if ($scope.scopusDetails.length() === 0){
      $scope.scopusDetails = [];
      
    }
    
  };

  $scope.save=function(){
   
    
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.scopusDetails,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);



//***************************************LISTCONTROLLER 7****************************************************




app.controller("ListController7", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.nationalJournals = [{
    'JournalDetail': '',
    'JournalNumber': '',
    'reviewDetail': '',
     'author':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(nationalJournal) {
    $scope.nationalJournals.push({
      'JournalDetail': "",
    'JournalNumber': "",
    'reviewDetail': "",
     'author':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.nationalJournals.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.nationalJournals.length() === 0){
      $scope.nationalJournals = [];
      
    }
    
  };
  $scope.save=function(){
   
    
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.nationalJournals,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);



//*****************************************LISTCONTROLLER 8*******************************************


app.controller("ListController8", ['$scope', '$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.reputedConferences = [{
    'title': '',
    'type': '',
    'detail': '',
     'author':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(reputedConference) {
    $scope.reputedConferences.push({
      'title': "",
    'type': "",
    'detail': "",
     'author':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.reputedConferences.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.reputedConferences.length() === 0){
      $scope.reputedConferences = [];
      
    }
    
  };
  $scope.save=function(){
   
   
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.reputedConferences,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);


//******************************************LISTCONTROLLER 9*********************************************




app.controller("ListController9", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.journalConferences = [{
    'title': '',
    'type': '',
    'detail': '',
     'author':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(journalConference) {
    $scope.journalConferences.push({
      'title': "",
    'type': "",
    'detail': "",
     'author':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.journalConferences.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.journalConferences.length() === 0){
      $scope.journalConferences = [];
      
    }
    
  };
  $scope.save=function(){
   
   
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.journalConferences,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);



//**********************************************LISTCONTROLLER 10*********************************************


app.controller("ListController10", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.chapterBooks = [{
    'title': '',
    'publisher': '',
    'issnNumber': '',
     'author':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(chapterBook) {
    $scope.chapterBooks.push({
      'title': "",
    'publisher': "",
    'issnNumber': "",
     'author':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.chapterBooks.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.chapterBook.length() === 0){
      $scope.chapterBooks = [];
      
    }
    
  };
    $scope.save=function(){
   
    
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.chapterBooks,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);


//*****************************************LISTCONTROLLER 11***************************************************


app.controller("ListController11", ['$scope', '$rootScope','$http',function($scope,$rootScope,$http) {
  $scope.workshops = [{
    'program': '',
    'duration': '',
    'datePlace': '',
     'organization':'',
     'facultyComment':''
     
  }];


 

  $scope.addNew = function(workshop) {
    $scope.workshops.push({
      'program': "",
    'duration': "",
    'datePlace': "",
     'organization':""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.workshops.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.workshops.length() === 0){
      $scope.workshops= [];
      
    }
    
  };
    $scope.save=function(){
   
   
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.workshops,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };

  
}]);



//****************************************************LISTCONTRILLER 12*********************************


app.controller("ListController12", ['$scope', 'getAverage','$rootScope','$http',function($scope,getAverage,$rootScope,$http) {
  $scope.import_data=function(){

 $scope.subAverage= getAverage.getsubAverage(); 
 $scope.proctoringAverages=getAverage.getproctoringAverage();
 $scope.studentFeedback=getAverage.getstudentFeedback();
 $scope.facultyComment='';
}
  $scope.save=function(){
   
  $scope.allAverage=[{
  'subAverage':$scope.subAvg,
  'proctoringAverages':$scope.proctoringAvg,
  'studentFeedback':$scope.studentFeed,
  'facultyComment':$scope.facultyComment

 }];
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.allAverage,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };



}]);



//*****************************************LISTCONTROLLER13*******************************************



app.controller("ListController13", ['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
  $scope.additions = [{
    'responsibility': '',
    'assignedBy': '',
    'duration': '',
    'facultyComment':''
     
  }];


 

  $scope.addNew = function(addition) {
    $scope.additions.push({
      'responsibility': "",
    'assignedBy': "",
    'duration': ""
     
     
    });
  };
  
  $scope.removeRow=function(index){       
       // remove the row specified in index
    $scope.additions.splice( index, 1);
    
    // if no rows left in the array create a blank array
    if ($scope.additions.length() === 0){
      $scope.additions= [];
      
    }
    
  };
  $scope.save=function(){
   
   
     $http({
    url: '/apprasel',
    method: "POST",
    data: $scope.additions,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(data){ //.success is deprecated,so use .then
    alert("done");
})
  .catch(function(err){//using .catch instead of .error as it is deprecated
    console.log("Error in request =>", err)
});
  };
  
}]);



//***************************************SERVICE********************************************************




app.service('getAverage', function() {
  var subAverages=0;
  var proctoringAverages=0;
  var studentFeedbacks=0;
  return{
   subAverage:function (sub) {
      this.subAverages=sub;
      
    },
    getsubAverage:function(){
      return this.subAverages;
    },

    proctoringAverage:function(pro){
        this.proctoringAverages=pro;
        //alert(proctoringAverages);
    },
     getproctoringAverage:function(){
      return this.proctoringAverages;
    },
    studentFeedback:function(feedback){
      this.studentFeedbacks=feedback;
      //alert(studentFeedbacks);
    },
     getstudentFeedback:function(){
      return this.studentFeedbacks;
    }

  };
});


app.factory("getUserData",['$http',function($http){
  
  return{
    getDatas:function(){
    docDatas=$http({
      method: 'GET',
      url: '/appraisal/getData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return docDatas;

   }  
    
}
  
}]);


