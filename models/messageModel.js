/**
 * Created by jiangqiang on 14-2-17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MessageSchema = new Schema({
    msgType: {type: String, enum: ['at', 'follow', 'reply', 'replyIn']},
    msgTo: {type: ObjectId, index: true},
    msgFrom: ObjectId,
    isRead: {type: Boolean, default: false}
});

mongoose.model('MessageModel',MessageSchema);
