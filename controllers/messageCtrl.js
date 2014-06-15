/**
 * Created by jiangqiang on 14-2-22.
 */
var MessageModel = require('../models').messageModel;
var messageCtrl = {
    follow: function (req, res, next) {
        var relation = {

        }

        MessageModel.create(relation, function (err, doc) {
            if (err) {
                res.send(400, { error: '数据格式错误！' });
            }
            else {
                res.send(200);
            }
        });
    }
}
exports.TopicCtrl = module.exports.messageCtrl = messageCtrl;