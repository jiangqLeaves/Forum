/**
 * Created by jiangqiang on 14-2-19.
 */
var UserModel = require('../models').userModel;

var userCtrl = {
    addUser: function (req, res, next) {
        var user = req.body;
        var userEntity = new UserModel(user);
        userEntity.save(function (err) {
            if (err) {
                res.send(400, { error: '数据格式错误！' });
            }
            else {
                res.send(200);
            }
        });
    },
    activateAccount: function (req, res, next) {

    },
    getUserInfo: function (req, res, next) {
        var userID = req.params.userID;

        UserModel.findById(userID, function (err, data) {
            if (err) {
                res.send(400)
            }
            else {
                res.send(data);
            }
        });
    },
    editUser: function (req, res, next) {
        var userID = req.params.userID;
        var userEntity = req.body;
        UserModel.update({_id: userID}, userEntity, function (err, numberAffected, raw) {
            if (err) {
                res.send(400);
            }
            else {
                res.send(200);
            }
        })

    },
    lockUser: function (req, res, next) {
    }
};
var userMethods = {
    getNameByID: function (id) {
        var userName='';
        UserModel.findOne({_id: id}, ['name'], function (err, docs) {
            userName = docs.name;
        })
        return userName;
    },
    activateByMail: function () {

    }
}

exports.userCtrl = module.exports.userCtrl = userCtrl;
exports.userMethods = module.exports.userMethods = userMethods;


