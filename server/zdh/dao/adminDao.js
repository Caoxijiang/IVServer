var mysql = require('mysql');
var $conf = require('../conf/db');
var mysql = require('mysql');
var $util = require('../util/util');
var $sql = require('./adminSqlMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
   selectadminAccountAndPWD:function(req,callback){
        pool.getConnection(function(err,connection){
            async.waterfall([
                function(callback){
                    connection.query($sql.selectadminAccountAndPWD,[req.username],function(err,results,fields){
                        if(err)throw err;  
                        callback(null,results[0]);
                    });
             },
         ],function(err,res){
              connection.release();
                callback(res);
         })  
        });
     }
 }