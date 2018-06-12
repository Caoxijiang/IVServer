var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var deleteimages=require('../util/util').delete;

router.all("/insertcomminfo",function(req,res,next){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var comminfo={};
        comminfo.admin=req.session.userName;
        comminfo.metid=req.query.metid;
        var arr=[];
        for(var obj of comminfo.metid){
            meetingeDao.insertrecommendInfo(comminfo,obj,function(data){
                if(data.msg=="SUCCESS"){
                    arr.push(data.msg);
                    if(arr.length==comminfo.metid.length){
                        res.send({msg:"SUCCESS"})
                    }else{
                        console.log("强力推荐添加失败");
                    }
                }else{
                    res.send({msg:"err"})
                }
            })
        }


    }
})

router.all("/selectcomminfo",function(req,res ){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        meetingeDao.selectmeetcomlistInfo(function(data){
            if(data){
                var arr=[];
                for(var obj of data){
                    meetingeDao.selectcommListBymetinfid(obj.metting_id,function(ress){
                        if(ress){
                            arr.push(ress)
                            if(arr.length==data.length){
                                res.send(arr)
                            }
                        }
                    })
                }
            }else{
                res.send({msg:"无信息"})
            }
        })
    }
})


router.all("/dellcomminfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.metid;
        meetingeDao.dellmeetingLists(ID,function(data){
            if(data=="DELLSUCCESS"){
                res.send({msg:"删除成功"})
            }else{
                res.send({msg:"删除失败"})
            }
        })
    }
})










module.exports = router;