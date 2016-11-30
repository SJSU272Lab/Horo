//change this code



AttendeeProfile.controller('attendeeCourseStatus', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/getCourseStatus',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success"+ data);


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