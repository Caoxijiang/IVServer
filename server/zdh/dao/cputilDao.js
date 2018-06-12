var mysql = require('mysql');
var $conf = require('../conf/db');
var mysql = require('mysql');
var $util = require('../util/util');
var $sql = require('./cputilSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));
module.exports={
    insertcputilinfo:function(req,callback){
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
                    connection.query($sql.insertcputilinfo,[data.adminUserid,req.cpname,req.cptype,req.cpurl],function(err,results,fields){
                        if(err) throw err;
                         data.msg="SUCCESS";
                         callback(null,data)
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res)
            })

        })
    },
    selectAllcputilinfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllcputil,function(err,results,fields){
                if(err) throw err;
                
                connection.release();
                callback(results)
            })

        })
    },
    dellcpinfoBycpid:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectcpurlbycpid,[req],function(err,results,fields){
                        if(err) throw err;
                        data.url=results[0].cputil_url;
                        callback(null,data)
                    })
                },function(data,callback){
                    connection.query($sql.deletecpbycpbyurl,[data.url],function(err,results,fields){
                        if(err) throw err;
                         data.msg="DELLCPSUCCESS";
                        callback(null,data)
        
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res)
            })

        })
    }
}