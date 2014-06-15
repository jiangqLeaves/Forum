/**
 * Created by jiangqiang on 14-2-16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var topicSchema = new Schema({
    author: { type: ObjectId, ref: 'UserModel' },
    theme: String,
    contents: String,
    createTime: { type: Date, default: Date.now },
    editTime: Date,
    type: { type: String, index: true },
    clickCount: { type: Number, default: '0' },
    replyCount: { type: Number, default: '0' },
    replyTime: { type: Date, default: Date.now },
    replyer: { type: ObjectId, ref: 'UserModel' },
    isFinished: {type: Boolean, default: false},
    isEssence: {type: Boolean, default: false},
    isTop: {type: Boolean, default: false}
});
/**
 * 回复帖子
 * @param id 帖子id
 * @param cb 回调函数
 */
topicSchema.statics.replyTopic = function (id, replyerId, cb) {
    this.findByIdAndUpdate(id, { $inc: { replyCount: 1 }, $set: { replyer: replyerId, replyTime: Date.now() } })
        .exec(cb)
}
/**
 * 获取帖子信息并增加点击数
 * @param id 帖子id
 * @param cb 回调函数
 */
topicSchema.statics.getTopic = function (id, cb) {
    this.findByIdAndUpdate(id, { $inc: { clickCount: 1 } })
        .populate({
            path: 'author',
            select: 'name level'
        })
        .exec(cb)
}
/**
 * 主页面获取帖子列表
 * @param page 页码
 * @param topicType 帖子类型
 * @param noReply 是否恢复
 * @param cb 回调函数
 */
topicSchema.statics.getTopicList = function (page, topicType, noReply, keyword, cb) {
    var condition = {}
    condition.isFinished = true;
    if (topicType != '' && topicType != undefined) {
        condition.type = topicType;
    }
    if (noReply) {
        condition.replyCount = 0;
    }
    if (keyword != '') {
        condition.theme = new RegExp(keyword);
    }
    this
        .find(condition)
        .select('author theme replyTime clickCount replyCount replyer isTop isEssence')
        .sort({ isTop: 'desc', replyTime: 'desc' })
        .skip(20 * (page - 1)).limit(20)
        .populate({
            path: 'author',
            select: 'name level icon'
        })
        .populate({
            path: 'replyer',
            select: 'name level icon'
        })
        .exec(cb)
}
/**
 * 获取个人发布的贴子
 * @param page
 * @param id
 * @param cb
 */
topicSchema.statics.getPersonalTopicList = function (page, id, cb) {
    this
        .find()
        .where({author: id, isFinished: true})
        .select('author theme replyTime clickCount replyCount replyer isTop isEssence ')
        .sort({ isTop: 'desc', replyTime: 'desc' })
        .skip(20 * (page - 1)).limit(20)
        .populate({
            path: 'author',
            select: 'name level icon'
        })
        .populate({
            path: 'replyer',
            select: 'name level icon'
        })
        .exec(cb);
}
/**
 * 获取草稿箱
 * @param page
 * @param id
 * @param cb
 */
topicSchema.statics.getDraftTopicList = function (page, id, cb) {
    this
        .find()
        .where({author: id, isFinished: false})
        .select('author theme replyTime')
        .sort('-replyTime')
        .skip(20 * (page - 1)).limit(20)
        .exec(cb);
}

exports = module.exports = mongoose.model("TopicModel", topicSchema);
