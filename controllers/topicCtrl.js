/**
 * Created by jiangqiang on 14-2-19.
 */
var async = require('async');

var TopicModel = require('../models').topicModel;
var topicListMethods = require('./topicListCtrl').topicListMethods;

var TopicCtrl = {

    addTopic: function (req, res, next) {
        var topic = req.body;

        async.waterfall([
            function (callback) {
                var _topic = {
                    theme: topic.theme,
                    contents: topic.contents,
                    createTime: new Date()
                }
                var topicEntity = new TopicModel(_topic);
                topicEntity.save(function (err, doc) {
                    callback(null, doc)
                })
            },
            function (doc, callback) {
                console.log(doc)
                console.log(doc.createTime);
                _topic = {
                    topicId: doc._id,
                    replyTime: doc.createTime,
                    type: 1
                }
                topicListMethods.addTopic(_topic, function (err) {
                    callback(null, err)
                })
            }
        ],
            function (err, results) {
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

var TopicMethods = {
    getTopicInfoByID: function () {

    }
}


exports.TopicCtrl = module.exports.TopicCtrl = TopicCtrl;
exports.TopicMethods = module.exports.TopicMethods = TopicMethods;