/**
 * Created by jiangqiang on 14-3-8.
 */
var app = angular.module('indexModule', ['ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngResource','ngAnimate']);
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
 *根控制器
 */
app.controller('rootCtrl',['$scope',function($scope){
    var UserStatus={
            isLogin:false,
            isAdmin:false
        }
    $scope.$on('setUserStatus',function (event, msg) {
        UserStatus.isLogin=msg.isLogin;
        UserStatus.isAdmin=msg.isAdmin;
        $scope.$broadcast("UserStatus", UserStatus);
      });
    $scope.$on('getUserStatus',function (event, msg) {
        $scope.$broadcast("UserStatus", UserStatus);
      });
}])

/**
 * 服务：主题操作
 */
app.factory('Topic', ['$resource', function ($resource) {
    return $resource('/Topic/:topicId');
}])
/**
 * 服务：用户操作
 */
app.factory('User',['$resource',function($resource){
    return $resource('/User/:userId');
}]);
/**
 * 服务：用户登录注销
 */
app.factory('Login',['$http',function($http){
    return{
        login:function(data,success,error){
            $http.post('/login',data)
            .success(success)
            .error(error)
            }
        }
}]);
/**
 * 服务：回复操作
 */
app.factory('Reply',['$resource',function($resource){
    return $resource('/Reply/:replyId');
}]);
/**
 *消息提示
 */
app.factory('Message',['$document','$compile','$timeout','$rootScope',function($document,$compile,$timeout,$rootScope){
    var scope=$rootScope.$new();
    scope.alerts=[];
    scope.closeAlert = function(index) {
        scope.alerts.splice(index, 1);
    };
    var body = $document.find('body').eq(0);
    var angularDomEl = angular.element('<alert>{{alert.msg}}</alert>');
    angularDomEl.attr('ng-repeat', 'alert in alerts');
    angularDomEl.attr('type', 'alert.type');
    angularDomEl.attr('close', 'closeAlert($index)');
    angularDomEl.addClass('slide message');

    var alertDomEl = $compile(angularDomEl)(scope);
    body.append(alertDomEl);

    return{
        success:function(_msg){
            scope.alerts.push({type:'success',msg:_msg})
            $timeout(function(){
                     scope.alerts.shift();   
                    },5000)
        },
        error:function(_msg){
            scope.alerts.push({type:'danger',msg:_msg})
             $timeout(function(){
                     scope.alerts.shift();   
                    },5000)
        }    
    }
}]);

app.directive('sidebar',['$http','$templateCache','Sidebar',function($http,$templateCache,Sidebar){
    //var scope={}
    //scope.sidebars=Sidebar.getSidebar();
    //window.console.log(scope.sidebars)
    return{
      restrict: 'E',
      template : '<div ng-repeat="sidebarItem in sidebars" class="slide" ng-include src="sidebarItem.tpl"></div>',
      link : function(_scope, element, attrs) {
          //window.console.log(scope)
          _scope.sidebars=Sidebar.getSidebar()
          window.console.log(_scope)
          }
    }
        
 }])
 app.factory('Sidebar',function(){
     var sidebars=[];
     var tplUrl={
         noReply:'sidebarNoReply.html'
         }
     return{
         setSidebar:function(sidebar){
             sidebars.push({tpl:tplUrl[sidebar]})
         },
         getSidebar:function(){
             return sidebars;
             }
     }
 })
/**
 * 服务: 公用方法
 */
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
})

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
