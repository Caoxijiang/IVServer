var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./mainuserInfoSqlMapping');
var async=require('async')


var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports={
    insertmedia:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertmediaInfo,[req.name,req.phone,req.email,req.util,req.job,req.platform,req.mark],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertStu:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertStuInfo,[req.name,req.phone,req.email,req.school,req.stuNum,req.mark],function(err, results, fields){
                if(err) throw err;
                var msg ="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertVip:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertVipInfo,[req.name,req.phone,req.email,req.util,req.job,req.VipNum,req.mark],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertnoVip:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertnoVipInfo,[req.name,req.phone,req.email,req.util,req.job,req.mark],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg) 
            })
        })
    },
    selectmainInfobyphone:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectVipmainbyphone,[req.phone],function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectmainNVInfobyphone:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectNVipmainbyphone,[req.phone],function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectmainStuInfobyphone:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectStumainbyphone,[req.phone],function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },

    selectmainmediaInfobyphone:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectmediamainbyphone,[req.phone],function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectAllmediaInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllmediaInfo,function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectAllVIPInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllVip,function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectAllNOVIPInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllnoVipInfo,function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectAllStuInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllStu,function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    selectAllnovipmark:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectmarkinfo,[req],function(err, results, fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })
    },
    updatestatusinvitebyid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updatestatusbymark,[req.status,req.ID],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    updatemediastatusinvitebyid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updatmediabymark,[req.status,req.ID],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    }

}