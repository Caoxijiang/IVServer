var mysql = require('mysql');
var $conf = require('../conf/db');
var mysql = require('mysql');
var $util = require('../util/util');
var $sql = require('./ticketSqlMapping');
var async = require('async');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertticketInfo:function(req,callback){
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
                    connection.query($sql.insertticketinfo,[data.adminUserid,req.type,req.details,req.price,req.status,req.mark],function(err,results,fields){
                        if(err)throw err;
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
    selectAllticketInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllticketinfo,function(err,results,fields){
                if(err)throw err;
                connection.release();
                callback(results)
            })
        })
    },
    updatsticketInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updteticketinfoByticketid,[req.type,req.details,req.price,req.status,req.mark,req.ticketID],function(err,results,fields){
                if(err) throw err;
                var msg="UPDATASUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    dellticketInfoByID:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.dellticketinfobyticketid,[req],function(err,results,fields){
                if(err) throw err;
                var msg="DELLSUCCESS";
                connection.release();
                callback(msg)
            })
        })
    }
}