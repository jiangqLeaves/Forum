/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller( 'navCtrl', ['$scope', '$modal', 'Message', function ( $scope, $modal, Message ) {
    $scope.isLogin = false;
    $scope.isAdmin = false;
    $scope.myClick = function () {
        alert( "you have clicked me" );
    }

    $scope.login = function () {
        var modalInstance = $modal.open( {
            templateUrl: './login.html',
            controller: 'loginCtrl',
        });
        modalInstance.result.then( function ( resultData ) {
            var msg = {
                isLogin: resultData.isLogin,
                isAdmin: false
            };
            $scope.$emit( "setUserStatus", msg );
            $scope.User = resultData.user;
        });
    };
    $scope.register = function () {
        var modalInstance = $modal.open( {
            backdrop: true,
            templateUrl: './register.html',
            controller: 'registerCtrl',
            windowClass: 'register '

        });
        modalInstance.result.then( function ( resultData ) {
            var msg = {
                isLogin: resultData.isLogin,
                isAdmin: false
            };
            $scope.$emit( 'setUserStatus', msg );
            $scope.User = resultData.user;
        });
    }
    $scope.$on( 'UserStatus', function ( event, msg ) {
        $scope.isLogin = msg.isLogin;
        $scope.isAdmin = msg.isAdmin;
    })
}] );