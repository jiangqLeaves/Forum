/**
 * Created by jiangqiang on 14-2-22.
 */
var controllers = {
    userCtrl: require('./userCtrl').userCtrl,
    topicCtrl:require('./topicCtrl').TopicCtrl,
    topicListCtrl:require('./topicListCtrl').topicListCtrl
}

exports = module.exports = controllers;