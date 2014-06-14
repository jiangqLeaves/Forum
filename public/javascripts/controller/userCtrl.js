/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('user', ['$scope', '$routeParams', 'Message', 'Sidebar', 'User', 'UserTopic', 'PubFunc',
    function ($scope, $routeParams, Message, Sidebar, User, UserTopic, PubFunc) {
        $scope.dealDate = PubFunc.dateToPre;
        $scope.user = User.get({ userId: $routeParams.id })

        $scope.saveChange = function () {
            $scope.user.$save(
                { userId: $routeParams.id },
                function (data) {
                    Message.success('保存成功');
                    $scope.user = User.get({ userId: $routeParams.id })
                },
                function (data) {
                    Message.error('保存失败，错误：' + data.error);
                })
        }

        UserTopic.query({userId: $routeParams.id },
            function (data) {
                $scope.userTopicList = data;
            });

    }])

app.controller('userDraft', ['$scope', '$routeParams', 'Message', 'Sidebar', 'Topic', 'UserTopic', 'PubFunc',
    function ($scope, $routeParams, Message, Sidebar, Topic, UserTopic, PubFunc) {
        $scope.dealDate = PubFunc.dateToPre;
        $scope.getTopicList = function () {
            UserTopic.query(
                function (data) {
                    $scope.draftTopicList = data;
                });
        }
        $scope.remove = function (index) {
            Topic.remove({ topicId: $scope.draftTopicList[index]._id },
                function (data) {
                    Message.success('删除成功');
                    $scope.getTopicList();
                },
                function (data) {
                    Message.success('删除失败');
                })
        }
        $scope.getTopicList();
    }])