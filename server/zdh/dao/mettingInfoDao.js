var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./mettingInfoMapping');
var time=require('../util/TimeUtil');
var async = require('async');

var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertmeetingInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.insertmeetingInfo,[data.adminUserid,req.topic,req.Summary,req.url,req.datetimeStart,req.originalUrl],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    });
                },
                // function(data,callback){
                //     connection.query($sql.selectmeetingId,[data.adminUserid],function(err,results,fields){
                //         if(err) throw err;
                //         data.meetingID=results[0].metting_id;
                //         callback(null,data);
                //     });
                // },
                // function(data,callback){
                //     connection.query($sql.insertmeetingImageinfo,[data.meetingID,req.url],function(err,results,fields){
                //         if(err)throw err;
                //         data.msg1="SUCCESS"
                //         callback(null,data);
                //     })
                // }
            ],function(err,res){
                connection.release();	
                callback(res);
            });
        });
    },
    adminfindmettingList:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectadminUserid,[req],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.selectAllmeetingList,[data.adminUserid],function(err,results,fields){
                        if(err)throw err;
                        callback(null,results);
                    })
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            })
        });
    },
    dellmeetingList:function(req,callback){
        pool.getConnection(function(err,connection){
            data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.dellmeetingList,[req],function(err,results,fields){
                        if(err) throw err;
                         data.msg1="DELLSUCCESS"
                        callback(null,data)
                    })
                },function(data,callback){
                    connection.query($sql.deletecomminfobymettingid,[req],function(err,results,fields){
                        data.msg2="DELLSUCCESS";
                        callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            })
        });
    },
    insertrecommendInfo:function(req,req1,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.insertrecommendInfo,[data.adminUserid,req1],function(err,results,fields){
                        if(err)throw err;
                        data.msg="SUCCESS"
                        callback(null,data)
                    });
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            })
        })
    },
    selectmeetcomlistInfo:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectcommfromcommInfo,function(err,results,fields){
                if(err)throw err;
                connection.release();
                callback(results);
            })
        })
    },
    selectcommListBymetinfid:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectcommeetingList,[req],function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);
            })
        })
    },
    dellmeetingLists:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.deletecomminfobymettingid,[req],function(err,results,fields){
                if(err) throw err;
                var msg="DELLSUCCESS"
                connection.release();
                callback(msg);
            })
        })
    },
    wxselectmetList:function(callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.wxselectmetinfList,function(err,results,fields){
                if(err) throw err;
                connection.release();
                callback(results);
            })
        })
    }

}