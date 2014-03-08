/**
 * Created by jiangqiang on 14-2-22.
 */
var UserCtrl = require('./controllers').userCtrl;

var routes = function (app) {
    app.post('/user/add', UserCtrl.addUser);
    app.get('/user/get/:userID', UserCtrl.getUserInfo)
    app.post('/user/edit/:userID', UserCtrl.editUser);
    app.get('/', function (req, res) {
        res.sendfile(app.get('views') + '/' + 'index.html');
    })
}

exports = module.exports = routes;