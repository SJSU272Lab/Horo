var indexPage = angular.module('indexPage', ['ui.router']);
indexPage.config(function($stateProvider, $urlRouterProvider) {
    //$locationProvider.html5Mode(true);
    /*$stateProvider.state('index', {
        url : '/Index',
        views: {
            'header': {
                templateUrl : 'templates/profileHeader.html',
            },
            'content': {
                templateUrl : 'templates/Account.html',

            },
        }
    })*/

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('signin', {
            url:'/signin',
            templateUrl: '/signin/signin.html',
            controller: 'signin',
            params : { listings : null}

        })
        /*.state('signup', {
            url:'/signup',
            signup: '/signup/signup.html',
            controller: 'signup',
            params : { listings : null}

        })*/


});


indexPage.controller('viewProfile', function($scope, $http,$state) {

    console.log("Inside viewProfile");
    $scope.sessionNotConnected = true;
    $scope.sessionActive = false;
    $http({
        method : "POST",
        url : '/getSessiondata',
    }).success(function(data) {

        if (data.username != undefined) {

            $scope.sessionUserName = data.username;
            $scope.sessionNotConnected = false;
            $scope.sessionActive = true;

        } else {
            $scope.sessionNotConnected = true;
            $scope.sessionActive = false;
        }

    });

    $scope.Profile = function()
    {
        window.location.assign("/Profile");
    }


});

indexPage.controller('loginSiginup', function($scope, $http,$state) {

    console.log("Inside viewProfile");
    $scope.sessionNotConnected = true;
    $scope.sessionActive = false;
    $http({
        method : "POST",
        url : '/getSessiondata',
    }).success(function(data) {

        if (data.username != undefined) {

            $scope.sessionUserName = data.username;
            $scope.sessionNotConnected = false;
            $scope.sessionActive = true;

        } else {
            $scope.sessionNotConnected = true;
            $scope.sessionActive = false;
        }

    });

    $scope.Profile = function()
    {
        window.location.assign("/Profile");
    }


});






