/**
 * Created by Gaurang on 25-11-2016.
 */

indexPage.controller('signup', function($scope, $http,$state) {

    console.log("Inside Signup.");
    $scope.invalid_register = true;
    $scope.valid_register = true;
    $scope.already_exists = true;

    $scope.register = function()
    {
        if($scope.Attendee==1) {
            $scope.role = 'attendee';
        }else{
            $scope.role = 'volunteer';
        }

        $http({
            method : "POST",
            url : '/signupForVolunteerAndAttendee',
            data: {
                first_name: $scope.first_name,
                last_name:$scope.last_name,
                userName:$scope.username,
                gender:$scope.gender,
                city:$scope.city,
                inputPassword:$scope.inputPassword,
                dob:$scope.dob,
                role:$scope.role
                
            }
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
                $scope.invalid_register = true;
                $scope.valid_register = false;
                window.location.assign("/");

            } else {
                console.log("Failure");
                $scope.invalid_register = false;
            }

        });
    }

});