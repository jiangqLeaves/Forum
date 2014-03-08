/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('loginCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.status = false;
    $scope.ok = function () {
        $scope.status = true;
        $modalInstance.close($scope.status);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);