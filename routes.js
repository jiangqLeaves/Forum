/**
 * Created by jiangqiang on 14-2-22.
 */
var UserCtrl = require('./controllers').userCtrl;
var TopicCtrl=require('./controllers').topicCtrl;

var routes = function (app) {
    app.get('/', function (req, res) {
        res.sendfile(app.get('views') + '/' + 'index.html');
    })

    app.post('/Topic',TopicCtrl.addTopic);
    app.get('/Topic/:topicId',TopicCtrl.getTopic);
    app.post('/Topic/:topicId',TopicCtrl.updateTopic);

    app.post('/user', UserCtrl.addUser);
    app.get('/user/:userID', UserCtrl.getUserInfo)
    app.post('/user/:userID', UserCtrl.editUser);

}

exports = module.exports = routes;