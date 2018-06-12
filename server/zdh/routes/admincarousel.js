var express = require('express');
var router = express.Router();
var indexDao=require('../dao/indexDao')
var deleteimages=require('../util/util').delete;
router.all('/selectcarousel',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        indexDao.selectIndexCarouse(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"查询失败"})
            }
        })
    }

})



router.all("/dellcarousel",function(req,res){

    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.carouselid;
        indexDao.dellCarouseById(ID,function(data){   
            if(data.msg){
                var urls=data.url;

                var fileName=urls.slice(45,67);
                var filepath="./public/images/webImage/"+fileName;
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