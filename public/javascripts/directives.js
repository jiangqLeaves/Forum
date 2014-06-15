/**
 * Created by jiangqiang on 14-4-18.
 */

/**
 *消息提示
 */
app.factory('Message', ['$document', '$compile', '$timeout', '$rootScope', function ($document, $compile, $timeout, $rootScope) {
    var scope = $rootScope.$new();
    scope.alerts = [];
    scope.closeAlert = function (index) {
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

    return {
        success: function (_msg) {
            scope.alerts.push({ type: 'success', msg: _msg })
            $timeout(function () {
                scope.alerts.shift();
            }, 5000)
        },
        error: function (_msg) {
            scope.alerts.push({ type: 'danger', msg: _msg })
            $timeout(function () {
                scope.alerts.shift();
            }, 5000)
        }
    }
}]);

app.directive('sidebar', ['$http', '$templateCache', 'Sidebar', function ($http, $templateCache, Sidebar) {
    //var scope={}
    //scope.sidebars=Sidebar.getSidebar();
    //window.console.log(scope.sidebars)
    return {
        restrict: 'E',
        template: '<div ng-repeat="sidebarItem in sidebars" class="slide" ng-include src="sidebarItem.tpl"></div>',
        link: function (_scope, element, attrs) {
            //window.console.log(scope)
            _scope.sidebars = Sidebar.getSidebar()
            window.console.log(_scope)
        }
    }

}])
app.factory('Sidebar', function () {
    var sidebars = [];
    var tplUrl = {
        noReply: 'sidebarNoReply.html',
        stars: 'sidebarStars.html'
    }
    return {
        setSidebar: function (sidebar) {
            sidebars.push({ tpl: tplUrl[sidebar] })
        },
        getSidebar: function () {
            return sidebars;
        },
        clear: function () {
            sidebars.length = 0;
        }
    }
})