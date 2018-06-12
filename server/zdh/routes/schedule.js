var express = require('express');
var router = express.Router();
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
var scheduleDao=require('../dao/scheduleDao');
router.all('/wxschedule', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var ID=req.query.ID;
            scheduleDao.select2(ID,function(data){
             if(data.schedule_time_id.length!=0){
                 var tid=data.schedule_time_id;
     
                 var daninfo=[];
                 for( var obj of tid){
                     scheduleDao.select3(obj.schedule_time_id,function(res2){
                         if(res2){
                             daninfo.push(res2);
                             if(daninfo.length==tid.length){
                                 res.json(daninfo)
                             }
                         }
                     })
                 }   
     
                 // var tid=data.schedule_time_id;
                 
             }else{
                var status_err="SERVERERR"
                res.end(status_err);
             }
            })
        }
  
    });
  })



  
module.exports = router;