/**
 * Created by jiangqiang on 14-2-19.
 */
//var async = require('async');

var TopicModel = require('../models').topicModel;

var TopicCtrl = {
    /**
     * 新增帖子
     * @param req
     * @param res
     * @param next
     */
    addTopic: function (req, res, next) {
        var topic = req.body;
        var topicEntity = new TopicModel(topic);
        topicEntity.save(function (err, doc) {
            if (err) {
                console.log(err)
                res.send(400, { error: '数据格式错误' });
            }
            else {
                res.send({_id:doc._id});
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

    delTopic: function (req, res, next) {

    },

    updateTopic: function (req, res, next) {

    }
};


exports.TopicCtrl = module.exports.TopicCtrl = TopicCtrl;
