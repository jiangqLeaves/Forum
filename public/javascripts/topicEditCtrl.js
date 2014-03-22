app.controller('topicEditCtrl', ['$scope','$sanitize', function ($scope) {
    $scope.contents='你可以使用 **Markdown** 在这里进行编写';
      $scope.$watch('contents',function(){
          $scope.contentHtml=markdown.toHTML($scope.contents);
          })
    }])