/**
 * Created by jiangqiang on 14-3-24.
 */
app.controller('topicDetailCtrl', ['$scope', '$sanitize', '$routeParams', 'Topic', function ($scope, $sanitize, $routeParams, Topic) {

    Topic.get({topicId: $routeParams.id}, function (_topic) {
        $scope.topicDetail = _topic;
        $scope.contentHtml = markdown.toHTML(_topic.contents);
    })
}])
