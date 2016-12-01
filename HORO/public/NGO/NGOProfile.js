/**
 * Created by Gaurang on 30-11-2016.
 */
//change this code

var NGO = angular.module('NGO', ['ui.router']);

NGO.controller('NGOProfile', function($scope, $http,$state) {


    $http({
        method: "POST",
        url: '/NGOview_profile',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");
           /* $scope.ngo_name = data.Result[0].ngo_name;
            $scope.ngo_description = data.Result[0].ngo_description;
            $scope.ngo_website = data.Result[0].ngo_website;
            $scope.ngo_contactno = data.Result[0].ngo_contactno;
            $scope.ngo_city = data.Result[0].ngo_city;
            $scope.ngo_addressline1 = data.Result[0].ngo_addressline1;

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