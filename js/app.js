// Custom Javascript Code for App
var deviceData = [];
var labG = angular.module("labG",[]);

// configure the routes
  labG.config(function($routeProvider){
  	$routeProvider
  	  //Route for the homepage
  	  .when('/list/:type',{
  	  	templateUrl:'views/list.html',
  	  	controller:'listController'
  	  })
  	  //Route for the about page
  	  .when('/detail/:id',{
  	  	templateUrl:'views/detail.html',
  	  	controller:'detailController'
  	  })
  	  .otherwise({ redirectTo: '/list/'})
  });

  labG.controller('listController',function($scope,$routeParams,$http){
  	var serverUrl = "http://127.0.0.1:90/angular/devices.json";
  	var post = "";
    $http({method: 'GET', url: serverUrl }).
	  success(function(data, status, headers, config) {
	  	var devCount;
	  	var filteredDevices = [];
	  	var type = $routeParams.type;
	  	var allowedTypes = ['apple','blackberry','windows','android'];
	  	if(allowedTypes.contains(type))
	  	{
		  	// Procedure for Filtering According to Request Parameter
		  	for(i=0;i<data.length;i++)
		  	{
		  	  if(data[i].type.toLowerCase() == type)
		  	  	filteredDevices.push(data[i]);
		  	}
	  	}else
	  	{
	  		filteredDevices = data;
	  	}
	    
	  	deviceData = filteredDevices;
	  	
	    $scope.devices = filteredDevices;
	    $scope.noOfDevices = filteredDevices.length;
	    
	   // console.log(type);
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

  });

 labG.controller('detailController',function($scope,$routeParams,$http){
 	var backButton = document.getElementById("backButton");
 	backButton.style.display = "block";
 	$scope.id = $routeParams.id;
 	var recId = $routeParams.id;
 	
 	for(i=0;i<deviceData.length;i++)
 	{
 		if(deviceData[i].deviceId == recId)
 		{
 			$scope.id = deviceData[i].deviceName;
 			break;
 		}
 	}
 	//ngShow()
 });

// Custom Javascript Utility Functions

Array.prototype.contains = function(obj) {
var i = this.length;
while (i--) {
    if (this[i] == obj) {
        return true;
    }
}
return false;
}