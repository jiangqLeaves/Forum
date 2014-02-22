/**
 * Created by jiangqiang on 14-2-15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    name: {type: String, index: true, unique: true},
    loginName: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    createTime: {type: Date, default: Date.now },
    score: {type: Number, default: 0 },
    level: {type: Number, default: 0},
    followers: [ObjectId],
    following: [ObjectId],
    details: {
        birth: {type: Date, default: Date.now},
        sex: {type: String, enum: ['男', '女']},
        description: String
    }
});

mongoose.model('UserModel', UserSchema);
