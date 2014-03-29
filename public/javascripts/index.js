/**
 * Created by jiangqiang on 14-3-8.
 */
var app = angular.module('indexModule', ['ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngResource']);
/**
 * 路由配置
 */
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
 * 指令
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
/**
 * 服务：主题操作
 */
app.factory('Topic', ['$resource', function ($resource) {
    return $resource('/Topic/:topicId');
}])
/**
 * 服务：用户操作
 */
app.factory('User',['$http',function($http){
    return{
        register:function(cb){

        }
    }
}])
app.factory('PubFunc', function () {
        var PubFunc = {};
        PubFunc.dateToPre = function (date) {
            var returnVal = '';
            try {
                var nowTime = Date.now();
                var preTime = (new Date(date)).getTime();
                var timeGap = parseFloat(nowTime - preTime) / 1000;
                if (timeGap != null && timeGap != '') {
                    if (timeGap < 60 * 10) {
                        returnVal = '刚刚';
                    }
                    else if (timeGap >= 60 * 10 && timeGap < 60 * 60) {
                        returnVal = parseInt(timeGap / 60.0) + '分钟前';
                    }
                    else if (timeGap >= 60 * 60 && timeGap < 60 * 60 * 24) {
                        returnVal = parseInt(timeGap / 3600.0) + '小时前';
                    }
                    else if (timeGap >= 60 * 60 * 24 && timeGap < 60 * 60 * 24 * 30) {
                        returnVal = parseInt(timeGap / 86400.0) + '天前'
                    }
                    else if (timeGap >= 60 * 60 * 24 * 30 && timeGap < 60 * 60 * 24 * 30 * 6) {
                        returnVal = parseInt(timeGap / 2592000.0) + '个月前'
                    }
                    else if (timeGap >= 60 * 60 * 24 * 30 * 6) {
                        var _date = new Date(date)
                        returnVal = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
                    }
                }
            }
            catch (e) {
            }
            return returnVal;
        }
        return PubFunc;
    }
)

