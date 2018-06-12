var express = require('express');
var router = express.Router();
var IntroductionDao=require('../dao/IntroductionDao');
router.get("/add",function(req,res){
   // console.log(req)
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var IntroductionInfo=req.query;
         var admin=req.session.userName;
         IntroductionInfo.admin=admin;
         IntroductionDao.addInfo(IntroductionInfo,function(result){
            if(result.msg){
                res.send({msg:"添加成功"})
            }else{
                res.send({msg:"添加失败"})
            }
        })
    }


})

//获取大会简介
router.all("/select",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        //var admin=req.session.userName;
        IntroductionDao.selectInfo(function(data){          
            if(data){
                res.send(data)
            }else{
                res.send({msg:"获取简介失败"})
            }
        })
    }
});


router.get("/dell",function(req,res){
    // console.log(req)
     if(req.originalUrl != "/" && !req.session.userName){
         res.redirect("/");
     }else{
          var topic=req.query.topic;
         // var admin=req.session.userName;
         // IntroductionInfo.admin=admin;
          IntroductionDao.deleteInfo(topic,function(result){
            if(result=="DELLSUCCESS"){
                res.send({msg:"删除成功"})
            }else{
                res.send({msg:"删除失败"})
            }
          })
     }
 
 
 })



























module.exports = router;