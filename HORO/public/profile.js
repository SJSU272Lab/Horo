var profile = angular.module('UserProfile', ['ui.router']);
profile.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('UserProfile', {
        url : '/Profile',
        views: {
            'header': {
                templateUrl : 'templates/profileHeader.html',
            },
            'content': {
                templateUrl : 'templates/profileContent.html',

            },
        }
    })
    $urlRouterProvider.otherwise('/');
});


profile.controller('userprofile', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/view_profile',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");
            $scope.fname = data.Result[0].user_firstname;
            $scope.lname = data.Result[0].user_lastname;
            $scope.username = data.Result[0].username;


        } else {
            console.log("Failure");
        }

    });


    $scope.Account = function () {
        window.location.assign("/Account");
    }

    $scope.EditProfile = function () {
        window.location.assign("/EditProfile");
    }

});