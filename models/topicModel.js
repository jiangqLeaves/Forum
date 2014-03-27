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
    replyTime: {type: Date, default: Date.now},
    type: {type: String, index: true},
    reply: [ReplySchema],
    clickCount: {type: Number, default: 0}
});

exports = module.exports = mongoose.model("TopicModel", topicSchema);
