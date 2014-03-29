app.controller('topicEditCtrl', ['$scope', '$sanitize', '$routeParams', '$location', 'Topic',
    function ($scope, $sanitize, $routeParams, $location, Topic) {
        var isNew = false;

        if (!$routeParams.id) {
            $scope.topicDetail = new Topic();
            $scope.topicDetail.contents = '你可以使用 **Markdown** 在这里进行编写';
            isNew = true;
        }
        else {
            $scope.topicDetail = Topic.get({topicId: $routeParams.id});
            isNew = false
        }
        $scope.$watch('topicDetail.contents', function () {
            $scope.contentHtml = markdown.toHTML($scope.topicDetail.contents);
        });
        $scope.save = function () {
            if (isNew) {
                $scope.topicDetail.creatTime = new Date();
            }
            else {
                $scope.topicDetail.editTime = new Date();
            }
            $scope.topicDetail.$save(function (data) {
                $location.path('/Topic/'+data._id);
            })
        }
    }])


