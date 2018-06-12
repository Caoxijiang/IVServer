var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./ordersSqlMapping');
var time=require('../util/TimeUtil');
var async = require('async');
var time=require('../util/TimeUtil');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

   module.exports = {
    insertInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertorderInfo,[req.Num,req.total,req.tname,req.phoneNum,time.formatTime(req.startTime,"Y-M-D h:m:s")],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)     
            })
        })
    },
    selectAlloeder:function(callback){
        pool.getConnection(function(err,connection){
        connection.query($sql.selectAllorderInfo,function(err,results,fields){
            if(err) throw err;
            connection.release();
            callback(results) 
 
            })
        })
    },
    selectorderByphoneNum:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectorderByphoneNum,[req.phoneNum],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)

            })
        })
    },
    updataorderstatus:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updateorderstatus,[req.status,time.Format(req.time_end),req.out_trade_no],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)

            })
        })
    },
    wxselecPayokorders:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.wxselectlistbyphone,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)

            })
        })
    }
}