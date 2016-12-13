var account = angular.module('account', ['ui.router']);
-account.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('account', {
        url : '/Account',
        views: {
            'header': {
                templateUrl : 'templates/profileHeader.html',
            },
            'content': {
                templateUrl : 'templates/Account.html',

            },
        }
    })
    /*$urlRouterProvider.otherwise('/');*/
});


account.controller('editaccountprofile', function($scope, $http) {

    $scope.change_password = function()
    {

        $http({
            method : "POST",
            url : '/change_passoword'
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }

        });
    }

    $scope.Profile = function()
    {
        window.location.assign("/Profile");
    }

    $scope.EditProfile = function()
    {
        window.location.assign("/EditProfile");
    }


    $scope.hostCourseStatus = function()
    {
        window.location.assign("/HostCourseStatus")
    }

    $scope.sessionLand = function () {
        window.location.assign("/sessionland");
    }

});
