var express = require('express');
var router = express.Router();
var scheduleDao=require('../dao/scheduleDao');


router.all("/addschedule",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var scheduleInfo={};
        scheduleInfo.admin=req.session.userName;
        scheduleInfo.info=req.query;
        scheduleDao.insertscheduleInfo(scheduleInfo,function(data){
            if(data.msg=="SUCCESS"){
                res.send({msg:"提交成功"})
            }else{
                res.send({msg:"提交失败"})
            }
        })
    }
});



router.all("/selectschedule",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
       // var admin=req.session.userName;
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
            
        }else{
            res.send({msg:"查询失败"})
        }
       })

    }
}) 



router.all("/dellschedule",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
       // var admin=req.session.userName;
       var ID=req.query.ID
       scheduleDao.select2(ID,function(data){
        if(data){
            var tid=data.schedule_time_id;
            var msg=[];
            for( var obj of tid){
                scheduleDao.dellAlltimeinfoBytimeid(obj.schedule_time_id,function(res2){
                    if(res2=="dellsuccess"){
                        scheduleDao.deleteallschedule(ID,function(res3){
                            if(res3.mgs1=="SUCCESS" && res3.msg2=="SUCCESS"){
                                msg.push(res3)
                                if(msg.length==tid.length){
                                    res.send({msg:"success"})
                                }
                                
                            }
                        })
                    }
                })
            }
            // if(ree.ree=="dellsuccess"){
            //     scheduleDao.deleteallschedule(Id,function(res3){
            //         if(res3.msg1=="SUCCESS" && res3.msg1=="SUCCESS" ){
                    
            //         }
            //     })
            // }
            // var tid=data.schedule_time_id;
            
           // console.log(daninfo)
        }else{
            res.end({msg:"err"})
        }
       })

    }
})


router.all("/delltimeId",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.ID;
        scheduleDao.dellAlltimeinfoBytimeid(ID,function(data){
            if(data=="dellsuccess"){
                scheduleDao.delltimeInfoBytid(ID,function(data2){
                    if(data2=="DELLSUCCESS"){
                         res.send({msg:"SUCCESS"})
                    }
                })
               
            }else{
                res.send({msg:"err"})
            }
        })
    }
})

router.all("/updatadaninfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var daninfo={};
        var ID=req.query.ID;
        var concent=req.query.concent;
        var dan =req.query.dan;
        var character=req.query.character;
        daninfo.ID=ID;
        daninfo.concent=concent;
        daninfo.dan=dan;
        daninfo.character=character;
        scheduleDao.updatadaninfo(daninfo,function(data){
            if(data.msg="UPDATASUCCESS"){
                res.send({msg:"更新成功"})
            }else{
                res.send({msg:"更新失败"});
            }
        })
    }
})








module.exports = router;