/**
 * Created by jiangqiang on 14-2-22.
 */
var async = require( 'async' );

var topicModels = require( '../models' ).topicModel;

var topicListCtrl = {
    getTopicList: function ( req, res, next ) {

        var page = req.query.page;
        var type = req.query.typeId;

        async.parallel( [
            function ( cb ) {
                topicModels.getTopicList( page, function ( err, doc ) {
                    cb( null, { err: err, doc: doc });
                });
            },
            function ( cb ) {
                topicModels.count( function ( err, count ) {
                    cb( null, { err: err, count: count });
                })
            }],
            function ( err, results ) {
                if ( err || results[0].err || results[1].err ) {
                    res.send( 400, { error: '«Î«Û¥ÌŒÛ' });
                }
                else {
                    res.set( 'Cache-Control', 'no-cache' );
                    res.send({ "doc": results[0].doc, "count": results[0].count });
                }
            });
    }
};

exports.topicListCtrl = module.exports.topicListCtrl = topicListCtrl;
