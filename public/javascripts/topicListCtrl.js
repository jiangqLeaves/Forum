/**
 * Created by jiangqiang on 14-3-8.
 */
app.controller('topicListCtrl', ['$scope', function ($scope) {
    $scope.topicList = [
        { id: '123sfd1as3da', theme: '忽然听哈迪斯噶个人', reply: '11', click: '123', lastReplyTime: '18:12' },
        { id: '123asdff4as1', theme: '请问我热热沃尔沃tertiary', reply: '234', click: '1124', lastReplyTime: '17:00' },
        { id: 'sd421fsa1353', theme: '沃尔沃惹我认为', reply: '11', click: '123', lastReplyTime: '03-12' },
        { id: 'sd421fsa1353', theme: '火热让他为二位说分手的范围', reply: '22', click: '33', lastReplyTime: '2013-12-03' }
    ]
}])