/**
 * Created by jiangqiang on 14-3-8.
 */
var app = angular.module('indexModule', ['ui.bootstrap', 'ngRoute', 'ngSanitize']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'topicListCtrl',
            resolve: {

            },
            templateUrl: 'topicList.html'
        })
        .when('/Topic/:id', {//主题详细
            controller: 'topicDetailCtrl',
            resolve: {

            },
            templateUrl: 'topicDetail.html'
        })
        .when('/Add', {//新增主题
            controller: 'topicEditCtrl',
            resolve: {

            },
            templateUrl: 'topicEdit.html'
        })
        .when('/Edit/:id', {//修改主题
            controller: 'topicEditCtrl',
            resolve: {

            },
            templateUrl: 'topicEdit.html'
        })
        .otherwise({ redirectTo: '/' });
}]);
/**
 * ngWidth:功能用法同calc(),解决移动设备部分浏览器不支持css3的calc()
 * 如：{ngWidth:100% - 20px;}
 */
app.directive('ngWidth', function () {
    return{
        restrict: 'C',
        link: function (scope, element, attrs) {
            var parentWidth = element.parent()[0].clientWidth;
            var cssStyle = attrs.ngWidth;
            var cssStyle = cssStyle.slice(' ');
            for (var mStyle in cssStyle) {
                if (mStyle.indexOf.indexOf('%') >= 0)
                    mStyle = parentWidth * parseFloat(mStyle).toFixed(2) / 100;
                if (mStyle.indexOf('px') >= 0)
                    mStyle = parseFloat(mStyle);
            }
            var cssResult
            switch (cssStyle[1]) {
                case '+':
                    cssResult = cssStyle[0] + cssStyle[2];
                case '-':
                    cssResult = cssStyle[0] - cssStyle[2];
            }
            attrs.ngWidth = +cssResult + "px";
        }
    }
})
