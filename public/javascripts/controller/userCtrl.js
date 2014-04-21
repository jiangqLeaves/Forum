/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller( 'user', ['$scope', '$routeParams', 'Message', 'Sidebar', 'User', function ( $scope, $routeParams, Message, Sidebar, User ) {

    $scope.user = User.get( { userId: $routeParams.id })

    $scope.saveChange = function () {
        $scope.user.$save(
            { userId: $routeParams.id },
            function ( data ) {
                Message.success( '保存成功' );
            },
            function ( data ) {
                Message.error( '保存失败，错误：' + data.error );
            })
    }
}] )