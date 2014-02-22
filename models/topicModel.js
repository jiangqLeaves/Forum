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
    type:Number,
    createTime: {type: Date, default: Date.now},
    clickCount: {type: Date, default: 0}
});

mongoose.model("TopicModel", topicSchema);
