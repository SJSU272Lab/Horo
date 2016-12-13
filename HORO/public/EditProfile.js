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

});



editprofile.controller('edituserprofile', function($scope, $http) {

    $scope.Init = function()
    {

        $http({
            method : "POST",
            url : '/view_profile',
        }).success(function(data) {

            if (data.statusCode == 200) {

                $scope.first_name = data.Result[0].user_firstname;
                $scope.last_name = data.Result[0].user_lastname;
                //$scope.gender = data.Result[0].user_gender;
                $scope.city = data.Result[0].user_city;

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

    $scope.hostCourseStatus = function () {
        window.location.assign("/HostCourseStatus");
    }

    $scope.sessionLand = function () {
        window.location.assign("/sessionland");
    }

});