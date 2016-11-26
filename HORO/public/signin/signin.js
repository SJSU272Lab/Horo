/**
 * Created by Gaurang on 25-11-2016.
 */



indexPage.controller('signin', function($scope, $http,$state) {

    console.log("Inside signin");

    $scope.register = function()
    {
        $http({
            method : "POST",
            url : '/Register'
        }).success(function(data) {

            if (data.statusCode == 200) {
                console.log("Success");
            } else {
                console.log("Failure");
            }

        });
    }

});
