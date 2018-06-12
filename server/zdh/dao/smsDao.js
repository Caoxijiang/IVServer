var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./smsSqlMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
module.exports={
    insertUserPhoneBaseInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.insertphoneNumBaseInfo,[req],function(err,results,fields){
                        if(err) throw err;
                        data.phoneNum=req;
                        callback(null,data);
                    });
                },function(data,callback){
                    connection.query($sql.selectphoneNum ,[data.phoneNum],function(err,results,fields){
                        if(err)throw err;
                        data.userid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.insertphoneInfo,[data.userid],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release;
                callback(res)
            });
        });
    },
    selectphoneNUm:function(req,callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.selectphoneNum ,[req],function(err, results, fields){
				if(err) throw err;
				callback(results[0])
			});
		})
	}
}
 