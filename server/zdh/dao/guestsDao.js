var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var async = require('async');
var $sql = require('./guestsSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    addguestsInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={}
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.addguestsInfo,[data.adminUserid,req.url,req.name,req.job,req.status],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data)
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            })
        })
    },
    selectguestsInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectguestsInfo,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);
            })
        })
    },
    // dellguestsInfo:function(req,callback){
    //     pool.getConnection(function(err,connection){
    //         connection.query($sql.dellguestsInfo,[req],function(err,results,fields){
    //             if(err) throw err;
    //             var msg="DELLSUCCESS";
    //             callback(msg)
    //         })
    //     })
    // },
    dellguestsInfoById:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectguestsInfoByid,[req],function(err,results,fields){
                        if(err) throw err;
                         data.url=results[0].guests_url;
                         callback(null,data)
                    })
                },function(data,callback){
                    connection.query($sql.dellguestsInfo,[data.url],function(err,results,fields){
                        if(err) throw err;
                        data.msg="DELLSUCCESS"
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