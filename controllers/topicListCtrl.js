/**
 * Created by jiangqiang on 14-2-22.
 */
var async = require('async');

var topicModels = require('../models').topicModel;

var topicListCtrl = {
        getTopicList: function (req, res, next) {

            var page = req.query.page || 1;
            var type = req.query.typeId || '';
            var noReply = req.query.noReply || '';
            var keyword = req.query.keyword || '';

            async.parallel([
                function (cb) {
                    topicModels.getTopicList(page, type, noReply, keyword, function (err, doc) {
                        cb(null, { err: err, doc: doc });
                    });
                },
                function (cb) {
                    topicModels.count({type: type, isFinished: true}, function (err, count) {
                        cb(null, { err: err, count: count });
                    })
                }],
                function (err, results) {
                    if (err || results[0].err || results[1].err) {
                        res.send(400, { error: '数据错误' });
                    }
                    else {
                        res.set('Cache-Control', 'no-cache');
                        res.send({ "doc": results[0].doc, "count": results[1].count });
                    }
                });
        },
        getUserTopicList: function (req, res, next) {
            var userID = req.params.userID;
            topicModels.getPersonalTopicList(1, userID, function (err, doc) {
                if (err) {
                    res.send(400, { error: "请求错误" })
                }
                else {
                    res.send(doc);
                }
            })
        },
        getDraftTopicList: function (req, res, next) {
            var userID = req.session._id
            topicModels.getDraftTopicList(1, userID, function (err, doc) {
                if (err) {
                    res.send(400, { error: "请求错误" })
                }
                else {
                    res.send(doc);
                }
            })
        }
    }
    ;

exports.topicListCtrl = module.exports.topicListCtrl = topicListCtrl;
