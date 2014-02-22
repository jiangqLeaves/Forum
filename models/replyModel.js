/**
 * Created by jiangqiang on 14-2-17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ReplySchema = new Schema({
    author: ObjectId,
    contents: String,
    replyTopic: {type: ObjectId, index: true},
    replyTo: ObjectId,
    replyTime: {type: Date, default: Date.now}
});

exports = module.exports = mongoose.model('ReplyModel', ReplySchema);

