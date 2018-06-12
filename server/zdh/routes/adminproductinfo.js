var express = require('express');
var router = express.Router();
var productDao=require('../dao/adminproductDao');
var deleteimages=require('../util/util').delete;
//获取所有商品信息  /adminproductinfo/selectproductList
router.all("/selectproductList",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        productDao.selectAllproduct(function(data){
            if(data.length!=0){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })       
    }
})

//更新商品信息  /adminproductinfo/updataproduct
router.all("/updataproduct",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var productinfo={}
        productinfo.name=req.query.name;
        productinfo.Instructions=req.query.Instructions;
        productinfo.details=req.query.details;
        productinfo.imgurl=req.query.imgurl;
        productinfo.thimgurl=req.query.thimgurl;
        productinfo.ID=req.query.ID
        productinfo.price=req.query.price;
        productDao.updataproductByID (productinfo,function(data){
            if(data=="SUCCESS"){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })       
    }
})


//删除商品信息 /adminproductinfo/dellallproductinfo
router.all("/dellallproductinfo",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var ID=req.query.ID;
        productDao.dellproduct(ID,function(data){
            if(data.msg=="SUCCESS"){
                var urls=[];
                var arr1=[]
                var fileName1=data.imgurl.slice(48,72);
                var fileName2=data.thimgurl.slice(48,72);
                var filepath1="./public/images/productimag/"+fileName1;
                var filepath2="./public/images/productimag/"+fileName2;
             
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