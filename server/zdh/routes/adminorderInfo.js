var express = require('express');
var router = express.Router();
var ordersDao=require('../dao/ordersDao');

router.all("/selectorderList",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        ordersDao.selectAlloeder(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })       
    }
})













module.exports = router;