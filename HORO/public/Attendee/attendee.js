//change this code

var AttendeeProfile = angular.module('AttendeeProfile', ['ui.router']);

AttendeeProfile.controller('AttendeeProfile', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/Get_profile',
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