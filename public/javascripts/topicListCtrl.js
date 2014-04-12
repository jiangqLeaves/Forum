/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('topicListCtrl', ['$scope', 'Topic','PubFunc','Sidebar', function ($scope, Topic,PubFunc,Sidebar) {
    $scope.dealDate=PubFunc.dateToPre;
    $scope.topicList=Topic.query();
    $scope.isLogin = false;
    $scope.isAdmin=false;
    $scope.$on('UserStatus',function(event, msg){
        $scope.isLogin=msg.isLogin;
        $scope.isAdmin=msg.isAdmin;
    });
    $scope.$emit('getUserStatus', '');
    Sidebar.setSidebar('noReply');
}])