/**
 * Created by jiangqiang on 14-3-24.
 */
app.controller('topicDetailCtrl', ['$scope', '$sanitize', '$routeParams','Topic', function ($scope, $sanitize, $routeParams,Topic) {
    //$scope.topicDetail = {
    //    id: '',
    //    author:'左岸花开',
    //    theme: 'AngularJs教程',
    //    contents:'',
    //    time:'2014-01-23',
    //    lastEdit:'2014-01-25'
    //}
    alert($routeParams.id);
    Topic.get({topicId:$routeParams.id},function(_topic){
        $scope.topicDetail=_topic;
        $scope.contentHtml=markdown.toHTML(_topic.contents);
        })
    //alert(topicDetail.theme);
    //$scope.contentHtml=markdown.toHTML($scope.topicDetail.contents);

}])
