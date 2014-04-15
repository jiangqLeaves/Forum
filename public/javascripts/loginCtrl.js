/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller( 'loginCtrl', ['$scope', '$modalInstance', 'Login', function ( $scope, $modalInstance, Login ) {
    $scope.status = false;
    $scope.login = {};
    $scope.ok = function () {
        Login.login( $scope.login,
            function ( data ) {
                var result = {};
                result.isLogin = true;
                result.user = data;
                $modalInstance.close( result );
            },
            function ( data ) {
                $scope.alerts.push( { msg: data.error });
            })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };
    $scope.alerts = [
    ];
    $scope.closeAlert = function ( index ) {
        $scope.alerts.splice( index, 1 );
    };
}] );