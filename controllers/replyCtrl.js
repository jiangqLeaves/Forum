/**
 * Created by jiangqiang on 14-2-22.
 */
var ReplyModel=require('../models').replyModel;

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
        ReplyModel.create(reply,function(err,doc){
            if (err) {
                res.send(400, { error: '«Î«Û¥ÌŒÛ' });
            }
            else {
                res.send(doc);
            }
        })
    }
};


exports.replyCtrl = module.exports.replyCtrl = replyCtrl;