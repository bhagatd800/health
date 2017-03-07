var app = angular.module("myapp", ['ui.bootstrap']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("tabController", ['$scope','getDatas','postDatas','changePassword','postSymptom','getResult','getAppointments','declineAppointments','setAppointments','getApprovedAppointments','checkPasswords', function($scope,getDatas,postDatas,changePassword,postSymptom,getResult,getAppointments,declineAppointments,setAppointments,getApprovedAppointments,checkPasswords)  {

$scope.getDocData=function(){  
getDatas.docData().then(function(data){
  $scope.data=data;
  
});

}
$scope.password="deepak";
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;



  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy'];


  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

$scope.setAppointmentId=function(data){
  $scope.id=data;
};

$scope.setAppointment=function(){
  
 
   $scope.setAppointmentData=[{
    'id':$scope.id,
    'date':$scope.dt,
    'time':$scope.mytime
  }];
 // alert($scope.setAppointmentData[0].id);
  setAppointments.postData($scope.setAppointmentData);
  getAppointments.getData().then(function(data){
  $scope.appointmentData= data;
  });
  getApprovedAppointments.getData().then(function(data){
  $scope.approvedAppointmentData= data;


});
};



$scope.save=function(){
  postDatas.postDocData($scope.data);
};

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

$scope.declineAppointment=function(datas){
  if(confirm("request will be declined")){
  declineAppointments.postData(datas);
  getAppointments.getData().then(function(data){
  $scope.appointmentData= data;

});
}
};

$scope.getApprovedAppointment=function(){
  getApprovedAppointments.getData().then(function(data){
  $scope.approvedAppointmentData= data;
});

$scope.disabled=false;
}
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

      $scope.disease="Sorry no result Found";
      $scope.disabled=false;
    }
    else{
      $scope.disease="Symptom shows "+" "+$scope.diseases.Disease+".";
      $scope.disabled=false;
    }

   })
}
};
$scope.getAppointment=function(){
getAppointments.getData().then(function(data){
 $scope.appointmentData= data;
});

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
}]);



app.factory("getDatas",['$http',function($http){
  
  return{
    docData:function(){
    docDatas=$http({
      method: 'GET',
      url: '/doctor/getDocData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return docDatas;

   }  
    
}
  
}]);
app.factory("getAppointments",['$http',function($http){
  
  return{
    getData:function(){
    Datas=$http({
      method: 'GET',
      url: '/appointment/getAppointmentData'
  }).then(function(response) {
      
      return response.data;
      
    })
      
    return Datas;

   }  
    
}
  
}]);

app.service("postDatas",['$http',function($http){
return{
  postDocData:function(docData){
  $http({
    url: '/doctor/update_profile',
    method: "POST",
    data: docData,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(resp){
    if(resp.data.errorcode==1){
    alert("Updated Successfully");
  }
  if(resp.data.errorcode==0){
    alert("some thing went wrong please try again");
  }
})

}
}
}]);
app.service("changePassword",['$http',function($http){

return{
  updatePassword:function(password){
  $http({
    url: '/doctor/update_password',
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

 app.service("setAppointments",['$http',function($http){

 return{
  postData:function(data){
  $http({

    url: '/appointment/approveAppointment',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
})

}
}
}]);

app.service("declineAppointments",['$http',function($http){
return{
  postData:function(data){

    //alert(password.password1);
  $http({
    url: '/appointment/declineAppointment',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
})

}
}
}]);
 app.factory("getApprovedAppointments",['$http',function($http){
  
  return{
    getData:function(){
    datas=$http({
      method: 'GET',
      url: '/appointment/getApprovedAppointment'
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
    url: '/doctor/checkPassword',
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