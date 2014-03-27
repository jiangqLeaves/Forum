/**
 * Created by jiangqiang on 14-2-22.
 */
var async = require('async');

var topicModels = require('../models').topicModel

var topicListCtrl = {
    getTopicList: function (req, res, next) {
        topicModels
            .find()
            .sort('editTime')
            .exec(function (err, doc) {
                if (err) {
                    res.send(400)
                }
                else {
                    res.send(doc);
                }
            })
    }
};

exports.topicListCtrl = module.exports.topicListCtrl = topicListCtrl;
