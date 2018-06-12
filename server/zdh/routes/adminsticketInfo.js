var express = require('express');
var router = express.Router();
var ticketeDao=require('../dao/ticketDao');

router.all("/addticketInfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ticketInfo={};
        ticketInfo.type=req.query.type;
        ticketInfo.details=req.query.details;
        ticketInfo.price=req.query.price;
        ticketInfo.status=req.query.status;
        ticketInfo.admin=req.session.userName;
        ticketInfo.mark=req.query.mark;
        ticketeDao.insertticketInfo(ticketInfo,function(data){
            if(data.msg=="SUCCESS"){
                res.send({msg:"售票信息上传成功"})
            }else{
                res.send({msg:"ERR"})
            }
        })
   }
})


router.all("/updataticketInfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ticketInfo={};
        ticketInfo.type=req.query.type;
        ticketInfo.details=req.query.details;
        ticketInfo.price=req.query.price;
        ticketInfo.status=req.query.status;
        ticketInfo.ticketID=req.query.ticketID;
        ticketInfo.mark=req.query.mark;
        ticketeDao.updatsticketInfo(ticketInfo,function(data){
            if(data=="UPDATASUCCESS"){
                res.send({msg:"SUCCESS"})
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})

router.all("/dellticketInfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ticketID=req.query.ticketID;
        ticketeDao.dellticketInfoByID(ticketID,function(data){
            if(data=="DELLSUCCESS"){
                res.send({msg:"删除成功"})
            }else{
                res.send({msg:"删除失败"})
            }
        })
    }
})

router.all("/selectticketInfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        ticketeDao.selectAllticketInfo(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })
    } 
})


















module.exports = router;