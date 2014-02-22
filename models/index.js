/**
 * Created by jiangqiang on 14-2-15.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    else {
        console.log('connect to %s success!', config.db);
    }
});
require('./messageModel');
require('./replyModel');
require('./topicModel');
require('./userModel');
exports.messageModel = mongoose('messageModel');
exports.replyModel = mongoose('replyModel');
exports.topicModel = mongoose('topicModel');
exports.userModel = mongoose('userModel');

