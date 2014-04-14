/**
 * Created by jiangqiang on 14-2-16.
 */

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
    clickCount: {type: Number, default: '0'},
    replyCount:{type: Number, default: '0'},
    replyTime:{type: Date, default: Date.now},
    replyer:{type: ObjectId, ref: 'UserModel'}
});

topicSchema.statics.replyTopic=function(id,cb){
    this.findByIdAndUpdate( id,{ $inc: { replyCount: 1 }})
        .exec(cb)
}
/**
 * 获取帖子信息并增加点击数
 * @param id 帖子id
 * @param cb 回调函数
 */
topicSchema.statics.getTopic=function(id,cb){
    this.findByIdAndUpdate( id,{ $inc: { clickCount: 1 }})
        .populate({
        path: 'author',
        select: 'name level'
        })
        .exec(cb)
}
/**
 * 获取帖子列表
 * @param page 页数
 * @param cb 回调函数
 */
topicSchema.statics.getTopicList=function(page,cb){
    this.find()
    .select('author theme replyTime clickCount replyCount replyer')
    .sort('-replyTime')
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
