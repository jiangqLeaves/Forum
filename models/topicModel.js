/**
 * Created by jiangqiang on 14-2-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var topicSchema = new Schema({
    author: ObjectId,
    theme: String,
    contents: String,
    createTime: {type: Date, default: Date.now},
    editTime:Date
});

exports = module.exports = mongoose.model("TopicModel", topicSchema);
