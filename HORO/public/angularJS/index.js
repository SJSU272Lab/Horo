var index = angular.module('index', ['ui.router']);
-index.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('index', {
        url : '/Index',
        views: {
            'header': {
                templateUrl : 'templates/profileHeader.html',
            },
            'content': {
                templateUrl : 'templates/Account.html',

            },
        }
    })
    $urlRouterProvider.otherwise('/');
});



account.controller('index', function($scope, $http,$state) {

    $scope.register = function()
    {
        $http({
            method : "POST",
            url : '/Register'
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }

        });
    }

});