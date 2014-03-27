/**
 * Created by jiangqiang on 14-3-26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var topicListSchema = new Schema({
    topicId:ObjectId,
    replyId:ObjectId,
    replyTime:Date,
    type: Number,
    clickCount: {type:Number, default: 0},
    replyCount:{type:Number, default: 0}
});

exports = module.exports = mongoose.model("TopicListModel", topicListSchema);
