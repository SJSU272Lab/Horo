account.controller('courseAdd', function($scope, $http,$state) {



        $http({
            method : "POST",
            url : '/getCourseCategory'
        }).success(function(data) {

            $scope.courseCategories = data.courseCategory;


        });

        $scope.uploadCourse = function()
        {
            var courseCategory = $("#courseCategory").val();

            $http({
                method : "POST",
                url : '/setCourseDetails',
                data: {
                    courseName:$scope.courseName,
                    courseCategory:courseCategory,
                    courseStartDate:$scope.courseStartDate,
                    courseEndDate:$scope.courseEndDate,
                    courseLanguage:$scope.courseLanguage,
                    courseLectures:$scope.courseLectures,
                    courseDetails:$scope.courseDetails
                }
            }).success(function(data) {
                if (data.statusCode == 200) {

                    console.log("Success while adding new course")

                } else {
                    console.log("Failure");
                }
            });

            
        }

});