/**
 * Created by Gaurang on 30-11-2016.
 */
/**
 * Created by Gaurang on 30-11-2016.
 */
//change this code

NGO.controller('NGOAttendeePeopleList', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/getAllAttendeesInArea',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");

            $scope.attendeeList = data.result;
            /* $scope.fname = data.Result[0].user_firstname;
             $scope.lname = data.Result[0].user_lastname;
             $scope.username = data.Result[0].username;
             */

        } else {
            console.log("Failure");
        }

    });

    $http({
        method: "POST",
        url: '/getAllCoursesInArea',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");

            $scope.coursesInArea = data.result;
            /* $scope.fname = data.Result[0].user_firstname;
             $scope.lname = data.Result[0].user_lastname;
             $scope.username = data.Result[0].username;
             */

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