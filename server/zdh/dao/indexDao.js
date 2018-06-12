var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./indexSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));
module.exports={
    admininsertCarouselInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.insertCarouselInfo,[data.adminUserid,req.url],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            })
        });
    },
    selectIndexCarouse:function(callback){
            pool.getConnection(function(err,connection){
                async.waterfall([
                    function(callback){
                        connection.query($sql.selectCarouseInfo,function(err,results,fields){
                            if(err) throw err;
                            callback(null,results)
                        });
                    }
                ],function(err,res){
                 connection.release();	
                    callback(res);
                })
            })     
    },
    dellCarouseById:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectCarouseInfobyid,[req],function(err,results,fields){
                        if(err) throw err;
                         data.url=results[0].carousel_url;
                         callback(null,data)
                    })
                },function(data,callback){
                    connection.query($sql.deleteCarouseInfo,[data.url],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS"
                        callback(null,data)
                    })
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            })
        })
    }
}

