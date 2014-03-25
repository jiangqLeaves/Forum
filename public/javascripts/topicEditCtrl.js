app.controller('topicEditCtrl', ['$scope','$sanitize','$routeParams','Topic', function ($scope,$sanitize,$routeParams,Topic) {
    if(!$routeParams.id)
        alert("ERRO")
    else
    alert($routeParams.id);
    $scope.topicDetail=Topic.get({topicId:$routeParams.id})
    $scope.contents='你可以使用 **Markdown** 在这里进行编写';
      $scope.$watch('contents',function(){
          $scope.contentHtml=markdown.toHTML($scope.contents);
          })
    }])