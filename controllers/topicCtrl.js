/**
 * Created by jiangqiang on 14-2-19.
 */
var TopicModel = require('../models').topicModel;
var UserModel = require('../models').userModel;
var UserCtrl = require('./userCtrl');

var TopicCtrl = {

    addTopic: function (req, res, next) {
        var topic = req.body;
        var _topic = {
            theme: topic.theme,
            contents: topic.contents,
            type: 1,
            createTime: topic.createTime
        }
        var topicEntity = new TopicModel(_topic);
        topicEntity.save(function (err) {
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