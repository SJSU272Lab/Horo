var editprofile = angular.module('EditUserProfile', ['ui.router']);
-editprofile.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('EditUserProfile', {
        url : '/EditProfile',
        views: {
            'header': {
                templateUrl : 'templates/profileHeader.html',
            },
            'content': {
                templateUrl : 'templates/EditProfile.html',

            },
        }
    })
    $urlRouterProvider.otherwise('/');
});



editprofile.controller('edituserprofile', function($scope, $http,$state) {

    $scope.Init = function()
    {

        $http({
            method : "POST",
            url : '/view_profile',
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }

        });
    }

    $scope.UpdateProfile = function()
    {
        var RegisterCredentials = {
            "first_name" : $scope.first_name,
            "last_name" : $scope.last_name,
            "gender" : $scope.gender,
            "city"  : $scope.city,
            "description" : $scope.description
        };

        console.log("Hello!!!");
        $http({
            method : "POST",
            url : '/edit_profile',
            data : RegisterCredentials
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
                window.location.assign("/Profile");
            } else {
                console.log("Failure");1
            }

        });
    }

    $scope.Profile = function()
    {
        window.location.assign("/Profile");
    }

    $scope.Account = function()
    {
        window.location.assign("/Account");
    }

});