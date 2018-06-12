var express = require('express');
var router = express.Router();
var ctinfoDao=require("../dao/adminctDao");
var deleteimages=require('../util/util').delete;

router.all("/selectAllctinfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var admin=req.session.userName;
        ctinfoDao.selectAllctinfoByuserid(admin,function(data){
            if(data){
                res.send(data)
            }else{
                var msg="ERR";
                res.send(msg)
            }
        })
    }
})

router.all("/dellallctinfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.ID;
        ctinfoDao.dellctinfoBytypeid(ID,function(data){
            if(data.msg=="DELLSUCCESS"){
                var urls=[];
                var arr1=[]
                var fileName1=data.Aurl.slice(48,72);
                var fileName2=data.Qurl.slice(48,72);
                var filepath1="./public/images/touchImages/"+fileName1;
                var filepath2="./public/images/touchImages/"+fileName2;
             
                urls.push(filepath1);
                urls.push(filepath2);
                var index=urls.length;
                    for(var obj of urls){
                        deleteimages(obj,function(data){
                            if(data){
                                arr1.push(data)
                                if(arr1.length==2){
                                    res.send({msg:"SUCCESS"});
                                }
                            }
                      })   
                    }
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})


















module.exports = router;