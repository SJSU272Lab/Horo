//change this code

var AttendeeProfile = angular.module('AttendeeProfile', ['ui.router']);

AttendeeProfile.controller('AttendeeProfile', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/view_profile_for_attendee',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");
            $scope.fname = data.Result[0].user_firstname;
            $scope.lname = data.Result[0].user_lastname;
            $scope.username = data.Result[0].username;
            $scope.city = data.Result[0].user_city;
            $scope.birthdate = data.Result[0].user_birthdate;
            $scope.gender = data.Result[0].user_gender;


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