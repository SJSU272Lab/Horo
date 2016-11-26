/**
 * Created by Gaurang on 25-11-2016.
 */



indexPage.controller('signin', function($scope, $http,$state) {

    console.log("Inside signin");

    $scope.signin = function()
    {
       $http({
            method : "POST",
            url : '/signinForVolunteerAndAttendee',
            data: {
                username: $scope.username,
                password:$scope.password
            }
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }

        });
    }

});
