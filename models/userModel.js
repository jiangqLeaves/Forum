/**
 * Created by jiangqiang on 14-2-15.
 */
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema( {
    name: { type: String, index: true, unique: true },
    password: String,
    email: { type: String, index: true, unique: true },
    createTime: { type: Date, default: Date.now },
    score: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    followers: [ObjectId],
    following: [ObjectId],
    details: {
        name: String,
        city: String,
        homePage: String,
        company: String,
        motto: String,
        birth: { type: Date, default: Date.now },
        sex: { type: String, enum: ['男', '女'] },
        description: String
    }
});
UserSchema.statics.register = function ( user, cb ) {
    this.create( user, cb );
}
UserSchema.statics.getUserInfo = function ( id, cb ) {
    this.findOne( { _id: id })
        .select( 'name createTime score level details' )
        .exec( cb );
}
UserSchema.statics.setUserInfo = function ( id, data, cb ) {
    this.update( { _id: id }, { $set: { details: data.details } }, cb )
}
UserSchema.statics.addScore = function ( id, score, cb ) {
}

exports = module.exports = mongoose.model( 'UserModel', UserSchema );
