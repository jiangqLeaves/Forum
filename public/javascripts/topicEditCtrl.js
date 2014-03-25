app.controller('topicEditCtrl', ['$scope', '$sanitize', '$routeParams', 'Topic', function ($scope, $sanitize, $routeParams, Topic) {
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
            $scope.topicDetail.id = 'asdsd1234sda1sad'
        }
        else {
            $scope.topicDetail.editTime = new Date();
        }
        $scope.topicDetail.$save();
    }

}])


