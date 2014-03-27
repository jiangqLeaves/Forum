/**
 * Created by jiangqiang on 14-2-22.
 */
var TopicListModel = require('../models').topicListModel;

var topicListCtrl = {
    getTopicList: function (req, res, next) {

    }
};
var topicListMethods = {
    addTopic: function (topic, callback) {
        var topicListEntity = new TopicListModel(topic);
        if (typeof callback === 'function')
            topicListEntity.save(callback);
        else
            topicListEntity.save();
    },
    replyTopic: function () {

    },
    setTopTopic: function () {

    }
}
exports.topicListCtrl = module.exports.topicListCtrl = topicListCtrl;
exports.topicListMethods = module.exports.topicListMethods = topicListMethods;