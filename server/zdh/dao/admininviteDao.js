var mysql = require('mysql');
var $conf = require('../conf/db');
var mysql = require('mysql');
var $util = require('../util/util');
var $sql = require('./admininviteSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertinviteInfo:function(req,callback){
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
                    connection.query($sql.addinvite,[data.adminUserid,req.name,req.job1,req.job2,req.url,req.phone],function(err,results,fields){
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
    selectAllinviteInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllinvite,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);

            })
        })
    },
    dellinviteInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selecturlByID,[req],function(err,results,fields){
                        if(err) throw err;
                        data.url=results[0].Avatar_url;
                        callback(null,data)
                    })
                },function(data,callback){
                    connection.query($sql.dellinviteByID,[data.url],function(err,results,fields){
                        if(err) throw err;
                        data.msg="DELLSUCCESS";
                        callback(null,data)
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res)
            })
        })
    },
    updateinviteInfoByID:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updatainviteInfo,[req.name,req.job1,req.job2,req.url,req.phone,req.ID],function(err,results,fields){
                if(err) throw err;
                var msg="UPDATESUCCESS";
                connection.release();
                callback(msg);
            })
        })
    } 
}