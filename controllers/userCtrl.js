/**
 * Created by jiangqiang on 14-2-19.
 */
var async = require('async');

var UserModel = require('../models').userModel;

var userCtrl = {
    register: function (req, res, next) {
        var user = req.body;
        UserModel.create(user, function (err, doc) {
            if (err) {
                res.send(400, { error: '数据格式错误！' });
            }
            else {
                var _doc = {
                    _id: doc._id,
                    name: doc.name,
                    createTime: doc.createTime,
                    score: doc.score,
                    level: doc.level
                }
                req.session._id = _doc._id;
                res.send(200, _doc);
            }
        });
    },
    logout: function (req, res, next) {
        req.session._id = null;
        res.send(200);
    },
    login: function (req, res, next) {
        var userName = req.body.loginName;
        var password = req.body.password;
        var condition = 'this.name==' + '\"' + userName + '\"' + '||' + 'this.email==' + '\"' + userName + '\"';
        UserModel.find()
            .$where(condition)
            .exec(function (err, doc) {
                if (err) {
                    res.send(400, { error: '数据错误！' });
                }
                else {
                    if (doc.length != 1)
                        res.send(400, { error: '用户不存在！' });
                    else if (password != doc[0].password)
                        res.send(400, { error: '密码错误！' });
                    else if (password == doc[0].password && ( userName = doc[0].name || userName == doc[0].email )) {
                        var _doc = {
                            _id: doc[0]._id,
                            name: doc[0].name,
                            createTime: doc[0].createTime,
                            score: doc[0].score,
                            level: doc[0].level,
                            isAdmin: doc[0].isAdmin
                        }
                        req.session._id = _doc._id;
                        res.send(200, _doc);
                    }
                    else {
                        res.send(400, { error: '未知错误！' });
                    }
                }
            })
    },
    loginStatus: function (req, res, next) {
        if (req.session._id)
            UserModel.findById(req.session._id, function (err, doc) {
                if (err)
                    res.send(400)
                else {
                    var _doc = {
                        _id: doc._id,
                        name: doc.name,
                        createTime: doc.createTime,
                        score: doc.score,
                        level: doc.level,
                        isAdmin: doc.isAdmin
                    }
                    req.session._id = _doc._id;
                    res.send(200, _doc);
                }
            })
        else
            res.send(400);
    },


    getUserInfo: function (req, res, next) {
        var userID = req.params.userID;

        UserModel.getUserInfo(userID, function (err, doc) {
            //if ( !doc._id )
            //    res.send( 400, { error: "您所查看的用户信息不存在" })
            //else 
            if (err) {
                res.send(400, { error: "请求错误" })
            }
            else {
                res.send(doc);
            }
        });
    },
    editUser: function (req, res, next) {
        var userID = req.session._id
        var userEntity = req.body;
        UserModel.setUserInfo(userID, userEntity, function (err, doc) {
            var resData = {
                _id: doc._id,
                name: doc.name,
                score: doc.score,
                level: doc.level,
                details: doc.details,
                createTime: doc.createTime
            }
            if (err) {
                res.send(400, { error: "数据错误" });
            }
            else {
                res.send(resData);
            }
        })
    },
    getUserList: function (req, res, next) {
        UserModel.getUserList(function (err, doc) {
            if (err) {
                res.send(400, { error: "数据错误" });
            }
            else {
                res.send(doc);
            }
        })

    }
};


exports.userCtrl = module.exports.userCtrl = userCtrl;


