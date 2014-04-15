/**
 * Created by jiangqiang on 14-3-24.
 */
app.controller( 'topicDetailCtrl', ['$scope', '$sanitize', '$routeParams', 'Topic', 'Reply', function ( $scope, $sanitize, $routeParams, Topic, Reply ) {
    var replyListData = [];
    Topic.get( { topicId: $routeParams.id }, function ( _topic ) {
        $scope.topicDetail = _topic;
        $scope.contentHtml = markdown.toHTML( _topic.contents );
    });
    Reply.query( { topicId: $routeParams.id }, function ( _reply ) {
        replyListData = _reply;
        $scope.replyList = formatReply( _reply );
    })
    var reply = new Reply();
    $scope.replyTopic = function () {
        reply.replyTopic = $routeParams.id;
        reply.contents = $scope.reply.contents;
        reply.$save( function ( _reply ) {
            replyListData.push( _reply )
            $scope.replyList = formatReply( replyListData );
            $scope.reply.contents = '';
        })
    };
    $scope.isLogin = false;
    $scope.isAdmin = false;
    $scope.$on( 'UserStatus', function ( event, msg ) {
        $scope.isLogin = msg.isLogin;
        $scope.isAdmin = msg.isAdmin;
    });
    $scope.$emit( 'getUserStatus', '' );
    function formatReply( reply ) {
        var _reply = [];
        for ( var i = 0; i < reply.length; i++ ) {
            reply[i].contentHtml = markdown.toHTML( reply[i].contents );
            if ( reply[i].replyTo == undefined ) {
                _reply.push( reply[i] )
            }
            else {
                var index = getReplyIndex( _reply, reply[i], 0, _reply.length );
                if ( index != null ) {
                    if ( _reply[index].childReply == undefined )
                        _reply[index].childReply = [];
                    _reply[index].childReply.push( reply[i] )
                }
            }
        }
        return _reply;
    }
    function getReplyIndex( replyList, reply, start, end ) {
        var middle = parseInt( ( end + start ) / 2 );
        if ( replyList[middle] == reply.replyTo )
            return middle;
        else if ( replyList[middle] < reply.replyTo )
            return getReplyIndex( replyList, reply, middle, end )
        else if ( replyList[middle] > reply.replyTo )
            return getReplyIndex( replyList, reply, start, middle )
        else
            return null;

    }
}] );
