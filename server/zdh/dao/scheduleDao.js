var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./scheduleSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({}, $conf.mysql));



module.exports={
    insertscheduleInfo:function(req,callback){
        var myDate = new Date();
        var year= myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var mouth= myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
        var day= myDate.getDate(); //获取当前日(1-31)
       // var time = year + "-" + mouth + "-" + day + " ";
        if(req.info.days==26){
            day=26;
            mouth=6;
            var time = year + "-" + mouth + "-" + day + " ";
        }else if(req.info.days==27){
            day=27;
            mouth=6;
            var time = year + "-" + mouth + "-" + day + " ";
        }else if(req.info.days==28){
            day=28;
            mouth=6;
            var time = year + "-" + mouth + "-" + day + " ";
        }else if(req.info.days==29){
            day=29;
            mouth=6;
            var time = year + "-" + mouth + "-" + day + " ";
        }
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
                    connection.query($sql.addscheduleinfo,[data.adminUserid,req.info.days],function(err,results,fields){
                        if(err) throw err ;
                        //data.schedule_id=results.insertId;
                        callback(null,data);
                    });
                },function(data,callback){
                    connection.query($sql.addscheduleidinfo,[req.info.days],function(err,results2,fields){
                        if(err) throw err ;
                        data.schedule_time_id=results2.insertId;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.addscheduletimeinfo,[data.adminUserid,data.schedule_time_id,req.info.content,time+ req.info.dan,req.info.character],function(err,results2,fields){
                        if(err) throw err ;
                         data.msg="SUCCESS"
                         callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res)
            });
        });
    },
    // selectallscheduleInfo:function(req,callback){
    //     pool.getConnection(function(err,connection){
    //         var data={};
    //         async.waterfall([
    //             function(callback){
    //                 connection.query($sql2.selectadminUserid,[req],function(err,results,fields){
    //                     if(err) throw err;
    //                     data.adminUserid=results[0].user_id;
    //                     callback(null,data);
                        
    //                 })
    //             },function(data,callback){
    //                 connection.query($sql.selectscheduleidByuserid,[data.adminUserid],function(err,results,fields){
    //                     if(err) throw err;
    //                       data.schedule_ids=results;
    //                     //  for(var obj of results){
    //                     //     data.schedule_ids.unshift(obj.schedule_id)
                            
    //                     //  }
    //                      callback(null,data)
    //                 })
    //             },function(data,callback){
    //                 var ss=[];
    //                 for(var obj of data.schedule_id){
    //                    // ss.unshift(obj.schedule_id)
                        
    //                  }
    //                 connection.query($sql.selectscheduletimeidBysid,[obj],function(err,results,fields){
    //                     if(err) throw err;
    //                     data.schedule_time_id=[];
    //                     for(var obj of results){
    //                         data.schedule_time_id.unshift(obj.schedule_time_id)
    //                     }
    //                     callback(null,data)
    //                 });
    //             },function(data,callback){
    //                 connection.query($sql.selecttimeInfoByscheduleid,[data.schedule_time_id],function(err,results,fields){
    //                     if(err) throw err;
    //                     callback(null,results);
    //                 })
    //             }
    //         ],function(err,res){
    //             connection.release;
    //             callback(res)
    //         })
    //     })
    //},
    select2:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            connection.query($sql.selectscheduletimeidBysid,[req],function(err,results,fields){
                if(err) throw err;
                
                data.schedule_time_id=results;
                connection.release();
                callback(data);
            })                
        })
    },
    select3:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selecttimeInfoByscheduleid,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results)
            })
        })

    },
    deleteallschedule:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={}
            async.waterfall([
                function(callback){
                    connection.query($sql.dellallscheduleinfo,[req],function(err,results,fields){
                        if(err) throw err;
                        data.mgs1="SUCCESS";
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.dellalltimeId,[req],function(err,results,fields){
                        if(err) throw err;
                        data.msg2="SUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            })
        })
    },
    dellAlltimeinfoBytimeid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.dellalldaninfo,[req],function(err,results,fields){
                if(err) throw err;
                var msg="dellsuccess";
                connection.release();
                callback(msg)
            })
        })
    },
    delltimeInfoBytid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.dellalltimeIdBytid,[req],function(err,results,fields){
                if(err) throw err;
                var msg="DELLSUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    updatadaninfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.updatadanInfo,[req.concent,req.dan,req.character,req.ID],function(err,results,fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    }
}
