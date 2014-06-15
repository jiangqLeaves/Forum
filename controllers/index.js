/**
 * Created by jiangqiang on 14-2-22.
 */
var controllers = {
    userCtrl: require('./userCtrl').userCtrl,
    topicCtrl:require('./topicCtrl').TopicCtrl,
    topicListCtrl:require('./topicListCtrl').topicListCtrl,
    replyCtrl:require('./replyCtrl').replyCtrl,
    relationCtrl:require('./relationCtrl').relationCtrl
}

exports = module.exports = controllers;