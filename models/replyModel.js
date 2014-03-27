/**
 * Created by jiangqiang on 14-2-17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ReplySchema = new Schema({
    author: {type: ObjectId, ref: 'UserModel'},
    contents: String,
    replyTime: {type: Date, default: Date.now}
});

exports = module.exports =ReplySchema;

