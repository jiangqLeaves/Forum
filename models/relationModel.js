/**
 * Created by jiangqiang on 14-2-22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var relationSchema = new Schema({
    userID: {type: ObjectId, index: true},
    followID: {type: ObjectId},
    date: {type: Date, default: Date.now}
});

exports = module.exports = mongoose.model('relationModel', relationSchema);