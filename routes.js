/**
 * Created by jiangqiang on 14-2-22.
 */
var UserCtrl = require('./controllers').userCtrl;
var TopicCtrl = require('./controllers').topicCtrl;
var TopicListCtrl = require('./controllers').topicListCtrl;
var ReplyCtrl = require('./controllers').replyCtrl;
var RelationCtrl=require('./controllers').relationCtrl;

var routes = function (app) {

    app.get('/', function (req, res) {
        res.sendfile(app.get('views') + '/' + 'index.html');
    })

    app.get('/Topic', TopicListCtrl.getTopicList)
    app.post('/Topic', TopicCtrl.addTopic);
    app.get('/Topic/:topicId', TopicCtrl.getTopic);
    app.post('/Topic/:topicId', TopicCtrl.updateTopic);
    app.delete('/Topic/:topicId', TopicCtrl.deleteTopic);

    app.get('/UserTopic/:userID', TopicListCtrl.getUserTopicList)
    app.get('/UserTopic', TopicListCtrl.getDraftTopicList)

    app.post('/user', UserCtrl.register);
    app.get('/User',UserCtrl.getUserList);
    app.get('/user/:userID', UserCtrl.getUserInfo);
    app.post('/user/:userID', UserCtrl.editUser);

    app.get('/reply', ReplyCtrl.getReplyList);
    app.post('/reply', ReplyCtrl.addReply);

    app.post('/login', UserCtrl.login);
    app.post('/logout', UserCtrl.logout);
    app.post('/status', UserCtrl.loginStatus);

    app.post('/Relation/:userID',RelationCtrl.follow)

}

exports = module.exports = routes;