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

var models = {
    messageModel: require('./messageModel'),
    replyModel: require('./replyModel'),
    topicModel: require('./topicModel'),
    userModel: require('./userModel'),
    statusModel: require('./statusModel')
}


exports = module.exports = models;
