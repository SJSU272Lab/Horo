/**
 * Created by Gaurang on 30-11-2016.
 */
/**
 * Created by Gaurang on 30-11-2016.
 */
//change this code

NGO.controller('NGOCourseList', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/getAllCoursesWithHostsInArea',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");
            $scope.hostList = data.result;


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