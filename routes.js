/**
 * Created by jiangqiang on 14-2-22.
 */
var UserCtrl = require('./controllers').userCtrl;

var routes = function (app) {
    app.post('/user/add', UserCtrl.addUser);
    app.get('/user/get/:userID',UserCtrl.getUserInfo)
    app.post('/user/edit/:userID',UserCtrl.editUser);
}

exports = module.exports = routes;