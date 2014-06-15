/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('user', ['$scope', '$routeParams', 'Message', 'Sidebar', 'User', 'UserTopic', 'PubFunc', 'Relation',
    function ($scope, $routeParams, Message, Sidebar, User, UserTopic, PubFunc, Relation) {
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

        $scope.isVisitor = false;
        $scope.$on('UserStatus', function (event, msg) {
            $scope.myUser = msg.user;
            if (!$scope.myUser._id)
                $scope.isVisitor = true
            else
                $scope.isVisitor = $scope.myUser._id == $routeParams.id ? true : false;
        })
        $scope.$emit('getUserStatus', '');
        $scope.isVisitor = false;
        $scope.follow = function () {
            var relation = new Relation();
            relation.$save({ userId: $routeParams.id }, function (data) {
                    Message.success('关注成功');
                    $scope.user = User.get({ userId: $routeParams.id })
                },
                function (data) {
                    Message.error('关注失败，错误：' + data.error);
                })
        }
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

app.controller('topicManagement', ['$scope', 'Topic', 'PubFunc', 'Sidebar', 'Message', function ($scope, Topic, PubFunc, Sidebar, Message) {
    $scope.dealDate = PubFunc.dateToPre;
    $scope.TotalItems = 0;
    $scope.CurrentPage = 1;
    $scope.maxSize = 5;
    $scope.keyword = ''
    $scope.getData = function () {
        Topic.query({ page: $scope.CurrentPage, keyword: $scope.keyword },
            function (data) {
                $scope.topicList = data.doc;
                $scope.TotalItems = data.count;
            });
    }
    $scope.remove = function (index) {
        Topic.remove({ topicId: $scope.topicList[index]._id },
            function (data) {
                Message.success('删除成功');
                $scope.getData();
            },
            function (data) {
                Message.success('删除失败');
            })
    }
    $scope.setEssence = function (index) {
        var topic = new Topic({isEssence: true})
        topic.$save({topicId: $scope.topicList[index]._id }, function (data) {
            Message.success('加精成功');
            $scope.getData();
        }, function (data) {
            Message.error('操作失败');
        })
    }
    $scope.setTop = function (index) {
        var topic = new Topic({isTop: !$scope.topicList[index].isTop})
        topic.$save({topicId: $scope.topicList[index]._id }, function (data) {
            Message.success('置顶成功');
            $scope.getData();
        }, function (data) {
            Message.error('操作失败');
        })
    }
    $scope.getData();
}])