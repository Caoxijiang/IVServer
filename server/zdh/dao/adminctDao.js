var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./adminctSqlMapping');
var async = require('async');
var $sql2 = require('./mettingInfoMapping');
var pool  = mysql.createPool($util.extend({},$conf.mysql));
module.exports={
    insertctInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data=[];
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err) throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.addctinfo,[data.adminUserid,req.ctname,req.ctavatarUrl,req.ctChJname,req.ctUnJname,req.ctphone,req.ctemail,req.ctwxnum,req.ctQrurl],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            })
        })
    },
    selectAllctinfoByuserid:function(req,callback){
        pool.getConnection(function(err,connection){
            var data=[];
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req],function(err,results,fields){
                        if(err) throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.selectAllctInfo,[data.adminUserid],function(err,results,fields){
                        if(err) throw err;
                        callback(null,results)
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            })
        })
    },
    dellctinfoBytypeid:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
               function(callback){
                    connection.query($sql.selectAllurl,[req],function(err,results,fields){
                        if(err) throw err;
                        data.Aurl=results[0].ct_AvatarUrl;
                        data.Qurl=results[0].ct_QrcodeUrl;
                        callback(null,data)
                    })
               },function(data,callback){
                   connection.query($sql.dellctinfobytypeid,[data.Aurl],function(err,results,fields){
                    if(err) throw err;
                    data.msg="DELLSUCCESS";
                    callback(null,data)
                   })
               }     
            ],function(err,res){
                connection.release();
                callback(res); 
            })
        })
    },
    wxselectctAllInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.wxselectAllctInfo,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results); 
            })
        })
    }
}
