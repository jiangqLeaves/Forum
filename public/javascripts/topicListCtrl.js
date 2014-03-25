/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('topicListCtrl', ['$scope', '$document', function ($scope, $document) {
    var testa = $document;
    $scope.topicList = [
        { id: '53314507d048d7380cc0915b', theme: '忽然听哈迪斯噶个人', reply: '11', click: '123', replyName: '左岸花开开开开', lastReplyTime: '16个小时前' },
        { id: '123asdff4as1', theme: '请问我热热沃尔沃tertiary', reply: '234', click: '1124', replyName: '左岸花开', lastReplyTime: '20天前' },
        { id: 'sd421fsa1353', theme: '沃尔沃惹我认为', reply: '11', click: '123', replyName: '左岸花开', lastReplyTime: '6个月前' },
        { id: 'sd421fsa1353', theme: '火热让他为二位说分手的范围', reply: '22', click: '33', replyName: '左岸花开', lastReplyTime: '2年前' }
    ]
}])