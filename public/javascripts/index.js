/**
 * Created by jiangqiang on 14-3-8.
 */
var app = angular.module('indexModule', ['ui.bootstrap', 'ngRoute', 'ngSanitize','ngResource']);
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
app.factory('Topic',['$resource',function($resource){
    return $resource('/Topic/:topicId', null,
        {
            //'query':  {method:'GET', isArray:true},

            'save':{method:'POST'},
            'get':{method:'GET'},
        });
    }])

     //    // Define CreditCard class
     //var CreditCard = $resource('/user/:userId/card/:cardId',
     // {userId:123, cardId:'@id'}, {
     //  charge: {method:'POST', params:{charge:true}}
     // });
 
     //// We can retrieve a collection from the server
     //var cards = CreditCard.query(function() {
     //  // GET: /user/123/card
     //  // server returns: [ {id:456, number:'1234', name:'Smith'} ];
 
     //  var card = cards[0];
     //  // each item is an instance of CreditCard
     //  expect(card instanceof CreditCard).toEqual(true);
     //  card.name = "J. Smith";
     //  // non GET methods are mapped onto the instances
     //  card.$save();
     //  // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
     //  // server returns: {id:456, number:'1234', name: 'J. Smith'};
 
     //  // our custom method is mapped as well.
     //  card.$charge({amount:9.99});
     //  // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     //});
 
     //// we can create an instance as well
     //var newCard = new CreditCard({number:'0123'});
     //newCard.name = "Mike Smith";
     //newCard.$save();
     //// POST: /user/123/card {number:'0123', name:'Mike Smith'}
     //// server returns: {id:789, number:'0123', name: 'Mike Smith'};
     //expect(newCard.id).toEqual(789);
