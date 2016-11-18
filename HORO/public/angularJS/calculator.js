console.log("Inside Calculator AJS.");

var calculator = angular.module('calculator',[]);



calculator.controller('calculator',function($scope, $http){
	
	$scope.numberOne = 0;
	$scope.numberTwo = 0;
	
	
	
	$scope.clickedProcessor = function(operation) {
			
		
		console.log("Inside processor function:");
		
		
			$scope.message= '';
			
			console.log("numberOne :: " + $scope.numberOne);
			console.log("numberTwo :: " + $scope.numberTwo);
			console.log("operation :: " + operation);
	
			/*if (isNaN($scope.numberOne) && angular.isNumber($scope.numberOne) ) 
			{
				$scope.message= "Please enter valid number";
				$scope.result = "";
				
			}
			else{*/
					
					if(operation=='add'){
						$scope.url='/getAddition'		
					}else if(operation=='subtract'){
						$scope.url='/getSubtraction'
					}else if(operation=='multiply'){
						$scope.url='/getMultiplication'
					}else if(operation=='divide'){
						$scope.url='/getDivision'
					}
					
					
					$http({
						method : "POST",
						url : $scope.url,
						data : {
							"numberOne" : $scope.numberOne,
							"numberTwo" : $scope.numberTwo,
						}
					}).success(function(data) {
			
						$scope.result = data.resultOfOperation; 
						console.log("data :: " + $scope.result);
					}).error(function(error) {
						$scope.message = error;
						//$scope.invalid_login = true;
					});	
				
			//}		
	};
	
	
	
	$scope.clear= function(){
		$scope.numberOne = 0;
		$scope.numberTwo = 0;
		$scope.result = "";
		$scope.message = "";
		
	}
});