/**
 * Created by jiangqiang on 14-2-22.
 */
//var async = require('async');

var topicModels = require('../models').topicModel

var topicListCtrl = {
    getTopicList: function (req, res, next) {
        topicModels.getTopicList(0,function (err, doc) {
                if (err) {
                    res.send(400)
                }
                else {
                    res.set('Cache-Control', 'no-cache');
                    res.send(doc);
                }
            })
    }
};

exports.topicListCtrl = module.exports.topicListCtrl = topicListCtrl;
