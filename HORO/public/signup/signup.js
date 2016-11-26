/**
 * Created by Gaurang on 25-11-2016.
 */


indexPage.controller('signup', function($scope, $http,$state) {

    console.log("Inside Signup.");

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
                userName:$scope.userName,
                gender:$scope.gender,
                city:$scope.city,
                inputPassword:$scope.inputPassword,
                dob:$scope.dob,
                role:$scope.role
                
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