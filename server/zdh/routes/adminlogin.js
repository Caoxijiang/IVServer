/**
 * Created by Kay on 2016/3/8.
 */
var secret = require('../conf/secret');
var userSession=require('../conf/userSessionStore').items;
var express = require('express');
var router = express.Router();
var Redis=require('redis');
var adminDao=require('../dao/adminDao');
var client=require('../Redis/RedisServer');

router.all('/',function(req,res){
        
    res.render('admin/adminlogin',{})
})
router.all('/admin',function(req,res){
    var info=req.body || req.query;
    var admininfo={};
     admininfo.username=info.username;
     admininfo.pwd=info.pwd;
    
    adminDao.selectadminAccountAndPWD(admininfo,function(data){
        if(!data){
            res.send({msg:"无管理员账号"})
        }else if(data.admin_account!=info.username || data.admin_pwd!=info.pwd){
            res.send({msg:"登陆失败，请检查账号和密码"})
        }else {
              req.session.userName = req.body.username;
              //req.session.userName = "admin";
              res.send({msg:"href"})
        }
    })

    
})

router.all('/welcome',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/welcome')
   }
   
    
})

router.all('/module',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/module')
   }
   
    
})

router.all('/myManage',function(req,res){
    console.log(req.session.userName)
   if(req.originalUrl != "/" && !req.session.userName){
     res.redirect("/");
   }else{
    res.render('admin/myManage')
   }
   
    
})


function adminStatusSaveRedis(admintoken,sms){
    if(client){
        client.set(admintoken,sms);
        client.expire(admintoken,10*60); 
    }else{
        console.log('redis client instance is not exist.');
    }
} 

function sessionStatus(url,userName,next){
    if(url!='/' && !userName){
        return res.redirect("/");
    }
    next();
}



module.exports = router;