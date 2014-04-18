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
/**
*��½������
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
/**
*ע�������
*/
app.controller( 'registerCtrl', ['$scope', '$modalInstance', 'User', function ( $scope, $modalInstance, User ) {

    $scope.user = new User();

    $scope.status = false;
    $scope.isRedAgreement = true;
    $scope.errMsg = {
        loginName: '��������û�����ʽ����ȷ��������3-18λ֮���Ӣ���ַ�',
        email: '������������ʽ����ȷ',
        password: '������������ʽ����ȷ��������6-18λ֮���Ӣ���ַ�',
        passwordChecked: '��������������벻һ��'
    }
    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };
    //����ǿ��У��
    var progressbarMsg = {
        value: [0, 25, 50, 75, 100],
        type: ['', 'danger', 'warning', 'info', 'success'],
        msg: ['', '����ȫ', 'һ��', '��ȫ', '�ǳ���ȫ']
    }
    $scope.$watch(
        function () {
            return $scope.user.password
        },
        function ( newValue, oldValue, scope ) {
            if ( newValue === oldValue ) return;
            var passwordLv = 0;
            if ( $scope.user.password.match( /[a-z]/ig ) ) {
                passwordLv++;
            }
            if ( $scope.user.password.match( /[0-9]/ig ) ) {
                passwordLv++;
            }
            if ( $scope.user.password.match( /(.[^a-z0-9])/ig ) ) {
                passwordLv++;
            }
            if ( $scope.user.password.length > 12 ) {
                passwordLv++;
            }
            $scope.pgbVlaue = progressbarMsg.value[passwordLv],
            $scope.pgbType = progressbarMsg.type[passwordLv],
            $scope.pgbMsg = progressbarMsg.msg[passwordLv]
    }, true );
    $scope.userRegister = function () {
        $scope.user.$save( function ( data ) {
            var result = {};
            result.isLogin = true;
            result.user = data;
            $modalInstance.close( result );
        })
    };

}] );