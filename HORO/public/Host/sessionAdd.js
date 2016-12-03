account.controller('sessionAdd', function($scope, $http,$state) {



    $http({
        method : "POST",
        url : '/getAllCourseList'
    }).success(function(data) {

        $scope.allCourse= data.allCourse;


    });

    $scope.uploadSession= function()
    {
        var courseName= $("#courseName").val();

        $http({
            method : "POST",
            url : '/setSessionDetails',
            data: {

                courseId: courseName,
                sessionTitle: $scope.sessionTitle,
                sessionDate: $scope.sessionDate,
                sessionDuration: $scope.sessionDuration,
                sessionLocation:$scope.sessionLocation,
                sessionDetail:$scope.sessionDetails,

            }
        }).success(function(data) {
            if (data.statusCode == 200) {

                console.log("Success while adding new course")

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


    $scope.addSessions = function()
    {
        window.location.assign("/sessionland")
    }

});