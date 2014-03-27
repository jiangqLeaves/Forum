/**
 * Created by jiangqiang on 14-2-19.
 */
var async = require('async');

var TopicModel = require('../models').topicModel;
var topicListModel = require('../models').topicListModel;

var TopicCtrl = {

    addTopic: function (req, res, next) {
        var topic = req.body;
        var topicEntity = new TopicModel(topic);
        topicEntity.save(function (err, doc) {
            if (err) {
                console.log(err)
                res.send(400, { error: '数据格式错误' });
            }
            else {
                res.send(200);
                console.log('ok')
            }
        });
    },
    getTopic: function (req, res, next) {
        var topicId = req.params.topicId;

        TopicModel.findById(topicId, function (err, data) {
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
