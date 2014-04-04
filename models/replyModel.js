/**
 * Created by jiangqiang on 14-2-17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ReplySchema = new Schema({
    replyTopic:{type: ObjectId,index:true,unique:false},
    replyTo: ObjectId,
    author: {type: ObjectId, ref: 'UserModel'},
    contents: String,
    replyTime: {type: Date, default: Date.now}
});
ReplySchema.statics.getReplyList = function(topicId,cb){
    this.find({'replyTopic':topicId})
    .sort('_id')
    .populate({
        path: 'author',
        select: 'name level'
     })
    .exec(cb)

}

exports = module.exports = mongoose.model("ReplyModel", ReplySchema);

