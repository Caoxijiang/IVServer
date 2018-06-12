var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./IntroductionSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var time=require('../util/TimeUtil');
var async = require('async');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports = {
    addInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err) throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.add,[data.adminUserid,req.topic,req.time,req.address,req.money,req.Introduction],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            });
        });
    },
    // selectInfo:function(req,callback){
    //     pool.getConnection(function(err,connection){
    //         var data={};
    //         async.waterfall([
    //             function(callback){
    //                 // connection.query($sql2.selectadminUserid,[req],function(err,results,fields){
    //                 //     if(err) throw err;
    //                 //     data.adminUserid=results[0].user_id;
    //                 //     callback(null,data);
    //                 // })
    //             },function(data,callback){
    //                 connection.query($sql.select,,function(err,results,fields){
    //                     if(err) throw err;
    //                     callback(null,results);
    //                 })
    //             }
    //         ],function(err,res){
    //             connection.release();	
    //             callback(res);
    //         })
    //     });
    // },

    selectInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.select,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },

    deleteInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.delete,[req],function(err,results,fields){
                if(err) throw err;
                var msg="DELLSUCCESS";
                connection.release();	
                callback(msg);
            })
        });
    }
}