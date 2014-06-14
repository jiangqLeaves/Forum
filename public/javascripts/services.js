/**
 * Created by jiangqiang on 14-4-18.
 */

/**
 * 服务：主题操作
 */
app.factory('Topic', ['$resource', function ($resource) {
    return $resource('/Topic/:topicId', null,
        { 'query': { method: 'GET' } }
    );
}])
/**
 * 服务：个人帖子主题操作
 */
app.factory('UserTopic', ['$resource', function ($resource) {
    return $resource('/UserTopic:userId');
}])
/**
 * 服务：用户操作
 */
app.factory('User', ['$resource', function ($resource) {
    return $resource('/User/:userId');
}]);
/**
 * 服务：用户登录注销
 */
app.factory('Login', ['$http', function ($http) {
    return {
        login: function (data, success, error) {
            $http.post('/login', data)
                .success(success)
                .error(error)
        },
        status: function (data, success, error) {
            $http.post('/status', data)
                .success(success)
                .error(error)
        },
        logout:function (data, success, error) {
            $http.post('/logout', data)
                .success(success)
                .error(error)
        }
    }
}]);
/**
 * 服务：回复操作
 */
app.factory('Reply', ['$resource', function ($resource) {
    return $resource('/Reply/:replyId');
}]);