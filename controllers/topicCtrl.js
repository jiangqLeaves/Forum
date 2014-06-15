/**
 * Created by jiangqiang on 14-2-19.
 */
var async = require('async');

var TopicModel = require('../models').topicModel;
var MessageModel = require('../models').messageModel;
var UserModel = require('../models').userModel;

var TopicCtrl = {
    /**
     * 新增帖子
     * @param req
     * @param res
     * @param next
     */
    addTopic: function (req, res, next) {
        var topic = req.body;
        topic.author = req.session._id;
        if (req.body.isFinished) {
            UserModel.addScore(topic.author, 10, function (err, doc) {
            })
        }
        var topicEntity = new TopicModel(topic);
        topicEntity.save(function (err, doc) {
            if (err) {
                console.log(err)
                res.send(400, { error: '数据格式错误' });
            }
            else {
                res.send({_id: doc._id});
            }
        });
    },
    /**
     * 获取帖子信息
     * @param req
     * @param res
     * @param next
     */
    getTopic: function (req, res, next) {
        var topicId = req.params.topicId;
        TopicModel.getTopic(topicId, function (err, data) {
            if (err) {
                res.send(400)
            }
            else {
                res.send(data);
            }
        });

    },

    deleteTopic: function (req, res, next) {
        var topicId = req.params.topicId;
        TopicModel.findByIdAndRemove(topicId, function (err, data) {
            if (err) {
                res.send(400)
            }
            else {
                res.send(200);
            }
        })
    },

    updateTopic: function (req, res, next) {
        var topicId = req.params.topicId;
        if (req.body.isEssence != undefined) {
            var topic = {
                isEssence: req.body.isEssence
            }
        }

        else if (req.body.isTop != undefined) {
            var topic = {
                isTop: req.body.isTop
            }
        }
        else {

            var topic = {
                theme: req.body.theme,
                contents: req.body.contents,
                createTime: req.body.createTime,
                editTime: req.body.editTime,
                type: req.body.type,
                isFinished: req.body.isFinished
            }
//            if (topic.isFinished) {
//                UserModel.addScore(req.session._id, 10, function (err, doc) {
//                })
//            }
        }
        TopicModel.findOneAndUpdate({_id: topicId}, topic, function (err, data) {
            if (err) {
                res.send(400)
            }
            else {
                res.send(data);
            }
        });
    }
};


exports.TopicCtrl = module.exports.TopicCtrl = TopicCtrl;
