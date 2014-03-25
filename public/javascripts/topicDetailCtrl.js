/**
 * Created by jiangqiang on 14-3-24.
 */
app.controller('topicDetailCtrl', ['$scope', '$sanitize', '$routeParams', function ($scope, $sanitize, $routeParams) {
    $scope.topicDetail = {
        id: '',
        author:'左岸花开',
        theme: 'AngularJs教程',
        contents:'',
        time:'2014-01-23',
        lastEdit:'2014-01-25'
    }
}])
