/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('registerCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.status = false;

    $scope.isRedAgreement = true;
    $scope.errMsg = {
        loginName: '您输入的用户名格式不正确，请输入3-18位之间的英文字符',
        email: '您输入的邮箱格式不正确',
        password: '您输入的密码格式不正确，请输入6-18位之间的英文字符',
        passwordChecked: '您两次输入的密码不一致'
    }
    $scope.user = {
        loginName: '',
        email: '',
        password: '',
        passwordChecked: ''
    }
    $scope.ok = function () {
        $scope.status = true;
        $modalInstance.close($scope.status);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.progressbarValue = 50;
    //密码强度校验
    var progressbarMsg = {
        value: [0, 25, 50, 75, 100],
        type: ['', 'danger', 'warning', 'info', 'success'],
        msg: ['aa', '不安全', '一般', '安全', '非常安全']
    }
    $scope.$watch(function () {
        return $scope.user.password
    }, function (newValue, oldValue, scope) {
        //if (newValue === oldValue) return;
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
}]);