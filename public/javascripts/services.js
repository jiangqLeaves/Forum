/**
 * Created by jiangqiang on 14-4-18.
 */

/**
 * 服务：主题操作
 */
app.factory( 'Topic', ['$resource', function ( $resource ) {
    return $resource( '/Topic/:topicId' );
}] )
/**
 * 服务：用户操作
 */
app.factory( 'User', ['$resource', function ( $resource ) {
    return $resource( '/User/:userId' );
}] );
/**
 * 服务：用户登录注销
 */
app.factory( 'Login', ['$http', function ( $http ) {
    return {
        login: function ( data, success, error ) {
            $http.post( '/login', data )
                .success( success )
                .error( error )
        }
    }
}] );
/**
 * 服务：回复操作
 */
app.factory( 'Reply', ['$resource', function ( $resource ) {
    return $resource( '/Reply/:replyId' );
}] );