var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var deleteimages=require('../util/util').delete;
router.all('/meetingList',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
        meetingeDao.adminfindmettingList(admin,function(result){
            if(result){
                res.send(result)
            }
        })
    }

})



router.all('/dellmeetingList',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         var id=req.query.id || req.body.id;
         var Meturls=req.query.Meturl || req.body.Meturl;
        meetingeDao.dellmeetingList(id,function(result){
            if(result.msg1=="DELLSUCCESS" || result.msg2=="DELLSUCCESS"){
                //deleteimages(Meturl)
                //res.send(deleteimages(Meturl))
                var Meturl=Meturls.slice(36,58);
                var filepath="./public/images/"+Meturl;
                console.log(filepath)
                deleteimages(filepath,function(data){
                    if(data){
                        res.send(data);
                    }
                })
               // console.log(JSON.stringify( deleteimages(Meturl)))
                //console.log(res.send(deleteimages(Meturl))

            }else{
                res.send({
                    msg:"删除失败"
                })
            }
        })
    }

})









module.exports = router;