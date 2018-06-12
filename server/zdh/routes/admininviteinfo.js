var express = require('express');
var router = express.Router();
var admininviteDao=require('../dao/admininviteDao');
var deleteimages=require('../util/util').delete;
//查询全部邀请函   //admininvite/selectAllintive 
router.all("/selectAllintive",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        admininviteDao.selectAllinviteInfo(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})
//根据invite_id删除某个邀请函  /admininvite/dellintive 
router.all("/dellintive",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.ID;
        admininviteDao.dellinviteInfo(ID,function(data){
            if(data.msg=="DELLSUCCESS"){
                var urls=data.url;
                
                var fileName=urls.slice(43,72);
                var filepath="./public/images/inviteimage/"+fileName;
                console.log(filepath)
                deleteimages(filepath,function(data){
                    if(data){
                        res.send(data);
                    }
                })
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})


//根据invite_id更新某个邀请函    /admininvite/updateintive 
router.all("/updateintive",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var inviteinfo={};
        inviteinfo.ID=req.query.ID;
        inviteinfo.job1=req.query.job1;
        inviteinfo.job2=req.query.job2;
        inviteinfo.name=req.query.name;
        inviteinfo.url=req.query.url;
        inviteinfo.phone=req.query.phone;
        admininviteDao.dellinviteInfo(ID,function(data){
            if(data=="DELLSUCCESS"){
                res.send({msg:"DELLSUCCESS"})
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})




















module.exports = router;








