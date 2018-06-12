// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./wxuserSqlMapping');
 var async=require('async')
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
 
//向前台返回JSON方法的简单封装
// var jsonWrite = function (res, ret) {
// 	if(typeof ret === 'undefined') {
// 		res.json({
// 			code:'1',
// 			msg: '操作失败'
// 		});
// 	} else {
// 		res(ret);
// 	}
// };
 
module.exports = {
	insertwxUserInfo: function (req,callback) {
		pool.getConnection(function(err, connection) {
			var data={};
			async.waterfall([
				function(callback){
					connection.query($sql.insertWxuserBaseInfo, [req.wxphoneNum], function(err, results, fields) {
						if (err) throw err;
						data.wxphoneNum=req.wxphoneNum;
						callback(null,data)
							
					});
				},function(data,callback){
					connection.query($sql.selectuserwxUserid ,[data.wxphoneNum],function(err, results, fields){
						if(err) throw err;
						data.userid=results[0].user_id;
						callback(null,data)
					});
				},function(data,callback){
					connection.query($sql.insertWxuserInfo,[data.userid,req.wxuserInfo.nickName,req.wxuserInfo.country,req.wxuserInfo.province,req.wxuserInfo.city,req.wxuserInfo.gender,req.wxuserInfo.language],function(err, results, fields){
						if(err) throw err;
						data.msg="SUCCESS"
						callback(null,data)
					});
				}
			],function(err,res){
				connection.release();
				callback(res);
			});

		});
	},
	selectwxphoneNUm:function(req,callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.selectuserwxUserid ,[req],function(err, results, fields){
				if(err) throw err;
				connection.release();
				callback(results[0])
			});
		})
	}

};
function error(){
	var err={};
	if(err!=null){
		console.log(err);
	}
}