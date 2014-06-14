/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('navCtrl', ['$scope', '$modal', '$location' , 'Message', 'Login', function ($scope, $modal, $location, Message, Login) {
    $scope.isLogin = false;
    $scope.isAdmin = false;
    $scope.keyword = '';


    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: './login.html',
            controller: 'loginCtrl'
        });
        modalInstance.result.then(function (resultData) {
            var msg = {
                isLogin: resultData.isLogin,
                isAdmin: false
                //user: resultData.user
            };
            $scope.$emit("setUserStatus", msg);
            $scope.User = resultData.user;
        });
    };
    $scope.register = function () {
        var modalInstance = $modal.open({
            backdrop: true,
            templateUrl: './register.html',
            controller: 'registerCtrl',
            windowClass: 'register '

        });
        modalInstance.result.then(function (resultData) {
            var msg = {
                isLogin: resultData.isLogin,
                isAdmin: false,
                user: resultData.user
            };
            $scope.$emit('setUserStatus', msg);
            $scope.User = resultData.user;
        });
    }
    $scope.logout = function () {
        Login.logout('',
            function (data) {
                var msg = {
                    isLogin: false,
                    isAdmin: false,
                    user: null
                };
                $scope.$emit("setUserStatus", msg);
                $location.path('/#')
            }
        )
    };
    $scope.$on('UserStatus', function (event, msg) {
        $scope.isLogin = msg.isLogin;
        $scope.isAdmin = msg.isAdmin;
        $scope.User = msg.user;
    })

    $scope.search = function () {
        $scope.$emit('searchClick', $scope.keyword);
    }
}
])
;
/**
 *登录控制器
 */
app.controller('loginCtrl', ['$scope', '$modalInstance', 'Login', function ($scope, $modalInstance, Login) {
    $scope.status = false;
    $scope.login = {};
    $scope.ok = function () {
        Login.login($scope.login,
            function (data) {
                var result = {};
                result.isLogin = true;
                result.user = data;
                $modalInstance.close(result);
            },
            function (data) {
                $scope.alerts.push({ msg: data.error });
            })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.alerts = [
    ];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);
/**
 *注册控制器
 */
app.controller('registerCtrl', ['$scope', '$modalInstance', 'User', function ($scope, $modalInstance, User) {

    $scope.user = new User();

    $scope.status = false;
    $scope.isRedAgreement = true;
    $scope.errMsg = {
        loginName: '请输入3-18之间的英文字符',
        email: '请输入合法的邮箱',
        password: '请输入6-10位之间的英文字符、数字',
        passwordChecked: '两次密码输入不一致'
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    var progressbarMsg = {
        value: [0, 25, 50, 75, 100],
        type: ['', 'danger', 'warning', 'info', 'success'],
        msg: ['', '危险', '一般', '安全', '非常安全']
    }
    $scope.$watch(
        function () {
            return $scope.user.password
        },
        function (newValue, oldValue, scope) {
            if (newValue === oldValue) return;
            var passwordLv = 0;
            if ($scope.user.password.match(/[a-z]/ig)) {
                passwordLv++;
            }
            if ($scope.user.password.match(/[0-9]/ig)) {
                passwordLv++;
            }
            if ($scope.user.password.match(/(.[^a-z0-9])/ig)) {
                passwordLv++;
            }
            if ($scope.user.password.length > 12) {
                passwordLv++;
            }
            $scope.pgbVlaue = progressbarMsg.value[passwordLv],
                $scope.pgbType = progressbarMsg.type[passwordLv],
                $scope.pgbMsg = progressbarMsg.msg[passwordLv]
        }, true);
    $scope.userRegister = function () {
        $scope.user.$save(function (data) {
            var result = {};
            result.isLogin = true;
            result.user = data;
            $modalInstance.close(result);
        })
    };

}]);