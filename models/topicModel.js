/**
 * Created by jiangqiang on 14-2-16.
 */
var ReplySchema = require('./replyModel');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var topicSchema = new Schema({
    author: {type: ObjectId, ref: 'UserModel'},
    theme: String,
    contents: String,
    createTime: {type: Date, default: Date.now},
    editTime: Date,
    type: {type: String, index: true},
    reply: [ReplySchema],
    clickCount: {type: Number, default: '0'},
    replyCount:{type: Number, default: '0'},
    replyTime:Date,
    replyer:{type: ObjectId, ref: 'UserModel'}
});
topicSchema.statics.getTopic=function(id,cb){
    this.findByIdAndUpdate( id,{ $inc: { clickCount: 1 }},cb)
    }


topicSchema.statics.getTopicList=function(page,cb){
    this
    .find()
    .select('author theme replyTime clickCount replyCount replyer')
    .sort('replyTime')
    .skip(0).limit(20)
    .populate({
        path: 'author',
        select: 'name level'
        })
    .populate({
        path: 'replyer',
        select: 'name level'
        })
    .exec(cb)
    }
exports = module.exports = mongoose.model("TopicModel", topicSchema);
