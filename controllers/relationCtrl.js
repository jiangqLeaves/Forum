/**
 * Created by jiangqiang on 14-6-15.
 */
var RelationModel = require('../models').relationModel
var relationCtrl = {
    follow: function (req, res, next) {
        var relation = {
            userID: req.params.userID,
            followID: req.session._id
        }

        RelationModel.create(relation, function (err, doc) {
            if (err) {
                res.send(400, { error: '数据格式错误！' });
            }
            else {
                res.send(200);
            }
        });
    }
}
exports.TopicCtrl = module.exports.relationCtrl = relationCtrl;
