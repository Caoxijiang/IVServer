var express = require('express');
var router = express.Router();
var cputilDao=require("../dao/cputilDao");
var deleteimages=require('../util/util').delete;


router.all("/cpAllselect",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var admin=req.session.userName;
        cputilDao.selectAllcputilinfo(function(data){
            if(data){
                res.send({msg:"SUCCESS",data})
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})

router.all("/dellcpinfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.cpid;
        cputilDao.dellcpinfoBycpid(ID,function(data){   
            if(data.msg=="DELLCPSUCCESS"){
                var urls=data.url;

                var fileName=urls.slice(53,72);
                var filepath="./public/images/cputilimage/"+fileName;
                console.log(filepath)
                deleteimages(filepath,function(data){
                    if(data){
                        res.send(data);
                    }
                })
            }else{
                res.send({msg:"服务器错误"})
            }
        })
    }
})


















module.exports = router;