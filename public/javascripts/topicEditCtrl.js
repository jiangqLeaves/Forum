app.controller( 'topicEditCtrl', ['$scope', '$sanitize', '$routeParams', '$location', 'Topic', 'Message',
    function ( $scope, $sanitize, $routeParams, $location, Topic, Message ) {
        var isNew = false;

        if ( !$routeParams.id ) {
            $scope.topicDetail = new Topic();
            $scope.topicDetail.contents = '你可以使用 **Markdown** 在这里进行编写';
            isNew = true;
        }
        else {
            $scope.topicDetail = Topic.get( { topicId: $routeParams.id });
            isNew = false
        }
        $scope.$watch( 'topicDetail.contents', function () {
            $scope.contentHtml = markdown.toHTML( $scope.topicDetail.contents );
        });
        $scope.save = function () {
            if ( isNew ) {
                $scope.topicDetail.creatTime = new Date();
            }
            else {
                $scope.topicDetail.editTime = new Date();
            }
            $scope.topicDetail.$save( function ( data ) {
                Message.success( '发布成功' );
                $location.path( '/Topic/' + data._id );
            }, function ( data ) {
                    Message.error( '发布失败，错误：' + data.error );
                })
        }
    }] )


