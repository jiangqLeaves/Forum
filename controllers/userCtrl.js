/**
 * Created by jiangqiang on 14-2-19.
 */
var UserModel = require('../models').userModel;

var userCtrl = {
    register: function (req, res, next) {
        var user = req.body;
        UserModel.create(user, function (err, doc) {
            if (err) {
                res.send(400, { error: '数据格式错误！' });
            }
            else {
                var _doc={
                    _id:doc._id,
                    name:doc.name,
                    createTime:doc.createTime,
                    score:doc.score,
                    level:doc.level
                    }
                req.session._id=_doc._id;
                res.send(200,_doc);
            }
        });
    },

    login:function(req, res, next){
         var userName = req.body.loginName;
         var password=req.body.password;
         var condition='this.name=='+'\"'+userName+'\"'+'||'+'this.email=='+'\"'+userName+'\"';
        UserModel.find()
        .$where(condition)
        .exec(function(err,doc){
             if (err) {
                res.send(400, { error: '数据错误！' });
            }
            else {
                if(doc.length!=1)
                    res.send(400, { error: '用户不存在！' });
                else if(password!=doc[0].password)
                    res.send(400,{ error: '密码错误！' });
                else if(password==doc[0].password&&(userName=doc[0].name||userName==doc[0].email)){
                var _doc={
                    _id:doc[0]._id,
                    name:doc[0].name,
                    createTime:doc[0].createTime,
                    score:doc[0].score,
                    level:doc[0].level
                    }
                req.session._id=_doc._id;
                res.send(200,_doc);
                }
                else {
                    res.send(400,{ error: '未知错误！' });}
            }
        })
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


exports.userCtrl = module.exports.userCtrl = userCtrl;


