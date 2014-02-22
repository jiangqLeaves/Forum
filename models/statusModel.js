/**
 * Created by jiangqiang on 14-2-22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var statusSchema = new Schema({
    userID: {type: ObjectId, index: true},
    reason: String,
    unlockedTime: Date
});

exports = module.exports = mongoose.model('statusModel', statusSchema);