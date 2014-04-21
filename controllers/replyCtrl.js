/**
 * Created by jiangqiang on 14-2-22.
 */
var async=require('async');

var ReplyModel=require('../models').replyModel;
var TopicModel=require('../models').topicModel;

var replyCtrl={
    getReplyList:function(req, res, next){
        var topicId=req.query.topicId;
        ReplyModel.getReplyList(topicId,function(err,doc){
            if (err) {
                res.send(400, { error: '«Î«Û¥ÌŒÛ' });
            }
            else {
                res.send(doc);
            }
        })
    },
    addReply:function(req,res,next){
        var reply = req.body;
        var topicId=reply.replyTopic;
        reply.author=req.session._id;

        async.parallel([
        function(cb){
            ReplyModel.create(reply,function(err,doc){
                cb(null,[err,doc]);
            })
        },
        function(cb){
            TopicModel.replyTopic(topicId,reply.author,function(err,doc){
                cb(null,[err,doc]);
            })
        }],
        function(err, results){
            if (err||results[0][0]||results[1][0]) {
                res.send(400, { error: '«Î«Û¥ÌŒÛ' });
            }
            else {
                res.send(results[0][1]);
            }
        });
    }
};

exports.replyCtrl = module.exports.replyCtrl = replyCtrl;