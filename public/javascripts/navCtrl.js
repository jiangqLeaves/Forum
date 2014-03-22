/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('navCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.isLogin = false;
    $scope.myClick = function () {
        alert("you have clicked me");
    }

    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: './login.html',
            controller: 'loginCtrl',

            resolve: {
                isLogin: function () {
                    return $scope.status;
                }
            }
        });
        modalInstance.result.then(function (isLogin) {
            $scope.isLogin = isLogin;
        });
    };
    $scope.register = function () {
        var modalInstance = $modal.open({
            backdrop: true,
            templateUrl: './register.html',
            controller: 'registerCtrl',
            windowClass: 'test '
        })
    }
}]);