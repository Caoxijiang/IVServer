var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('././invoiceSqlMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));
module.exports={
    addinvoiceInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertinvoiceInfo,[req.type,req.head,req.rec,req.content,req.amount,req.info,req.recipient,req.phoneNum,req.address,req.Identity],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();	
                callback(msg);
            })
        })
    },
    selectallinvoiceInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllnvoiceInfo,function(err,results,fields){
                if(err) throw err;
                connection.release();	
                callback(results);
            })
        })
    },
    selectinvoiceBystatus:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectinvoiceBystatus,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();	
                callback(results);
            })
        })
    },  
    updateinvoicestatus:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updatainvoiceinfostatus,[req.status,req.ID],function(err,results,fields){
                if(err) throw err;
                connection.release();	
                callback(results);
            })
        })
    },
    selectpersonalStatus:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectpersonalstatus,[req.Identity],function(err,results,fields){
                if(err) throw err;
                connection.release();	
                callback(results);
            })
        })
    }
}
