var express = require('express');
var router = express.Router();
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
var mainUserinfoDao=require('../dao/mainuserInfoDao');
//获取所有媒体注册信息   /adminmainuserinfo/mediaAlllist
router.all('/mediaAlllist',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         mainUserinfoDao.selectAllmediaInfo(function(data){
             if(data){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})
//获取所有学生注册信息   /adminmainuserinfo/stuAlllist
router.all('/stuAlllist',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         mainUserinfoDao.selectAllStuInfo(function(data){
             if(data){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})
////获取所有VIP注册信息  /adminmainuserinfo/vipAlllist
router.all('/vipAlllist',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         mainUserinfoDao.selectAllVIPInfo(function(data){
             if(data){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})

////获取所有非vip注册信息 /adminmainuserinfo/novipAlllist
router.all('/novipAlllist',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         mainUserinfoDao.selectAllNOVIPInfo(function(data){
             if(data){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})

//根据 mark获取对应的信息  /adminmainuserinfo/novipmark
router.all('/novipmark',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         var mark=req.query.mark;
         mainUserinfoDao.selectAllnovipmark(mark,function(data){
             if(data){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})


//根据查到的id修改状态     /adminmainuserinfo/updatapmark
router.all('/updatapmark',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var inviteInfo={}
         inviteInfo.ID=req.query.ID
         inviteInfo.status=req.query.status;
         mainUserinfoDao.updatestatusinvitebyid(inviteInfo,function(data){
             if(data=="SUCCESS"){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})



//   更新特邀媒体/adminmainuserinfo/updatamedia
router.all('/updatamedia',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var inviteInfo={}
         inviteInfo.ID=req.query.ID
         inviteInfo.status=req.query.status;
         mainUserinfoDao.updatemediastatusinvitebyid(inviteInfo,function(data){
             if(data=="SUCCESS"){
                 res.send(data)
             }else{
                 res.send({msg:"ERR"})
             }
         })
    }

})

































module.exports = router;