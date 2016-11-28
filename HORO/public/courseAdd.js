account.controller('courseAdd', function($scope, $http,$state) {

    $scope.getCourseTypeCategory= function()
    {

        $http({
            method : "POST",
            url : '/getCourseCategory'
        }).success(function(data) {

            $scope.courseCategory = data.courseCategory;

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

});