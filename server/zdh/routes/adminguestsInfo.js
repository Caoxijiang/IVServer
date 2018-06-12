var express = require('express');
var router = express.Router();
var guestsDao=require('../dao/guestsDao');
var deleteimages=require('../util/util').delete;

router.all("/dellguestsInfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.ID;
        guestsDao.dellguestsInfoById(ID,function(data){   
            if(data.msg=="DELLSUCCESS"){
                var urls=data.url;

                var fileName=urls.slice(48,72);
                var filepath="./public/images/guestsImage/"+fileName;
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

router.all('/selectguestsinfo',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        guestsDao.selectguestsInfo(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"查询失败"})
            }
        })
    }

})










module.exports = router;