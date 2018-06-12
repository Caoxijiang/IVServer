var mysql = require('mysql');
var $conf = require('../conf/db');
var mysql = require('mysql');
var $util = require('../util/util');
var $sql = require('./adminproductSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    addproduct:function(req,callback){
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
                    connection.query($sql.addproductinfo,[data.adminUserid,req.name,req.Instructions,req.details,req.imgurl,req.thimgurl,req.price],function(err,results,fields){
                        if(err)throw err;
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
    dellproduct:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectpoducturlByID,[req],function(err,results,fields){
                        if (err) throw err;
                        data.imgurl=results[0].product_img_url;
                        data.thimgurl=results[0].product_thumimg_url;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.dellproductinfo,[data.imgurl],function(err,results,fields){
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
    selectAllproduct:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectAllproduct,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);
            })
        })
    },
    updataproductByID:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updateproductByID,[req.name,req.Instructions,req.details,req.imgurl,req.thimgurl,req.price,req.ID],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS"
                connection.release();
                callback(msg)
            })
        })
    }
}