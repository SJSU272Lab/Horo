/**
 * Created by Gaurang on 25-11-2016.
 */



indexPage.controller('signin', function($scope, $http,$state) {

    console.log("Inside signin");
    $scope.invalid_login = false;
    $scope.success_login = false;
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

            if (data.statusCode == 201) { //Host
                console.log("Success");
                $scope.invalid_login = false;
                $scope.success_login = true;

                window.location.assign("/attendeeProfile")//for Host
            }else if(data.statusCode == 200) { //volunteer
               console.log("Success");
               $scope.invalid_login = false;
               $scope.success_login = true;


               window.location.assign("/Profile");//for Host
           }
           else
            {
                console.log("Failure");
                $scope.invalid_login = true;
                $scope.success_login = false;

            }

        });
    }

});
