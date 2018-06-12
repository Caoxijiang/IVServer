var express = require('express');
var router = express.Router();
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
var mainUserinfoDao=require('../dao/mainuserInfoDao');

router.all("/media",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var mediainfo={}
            mediainfo.name=req.query.name;
            mediainfo.phone=req.query.phone;
            mediainfo.email=req.query.email;
            mediainfo.util=req.query.util;
            mediainfo.job=req.query.job
            mediainfo.platform=req.query.platform;
            mediainfo.mark=req.query.mark
            mainUserinfoDao.selectmainmediaInfobyphone(mediainfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    mainUserinfoDao.insertmedia(mediainfo,function(data){
                        if(data=="SUCCESS"){
                            res.send({msg:"SUCCESS"});
                        }else{   
                            var status_err="SERVER";
                            res.send(status_err);
                        }
                    })
                }
            })

        }
  
    });
})


router.all("/Stu",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Stuinfo={}
            Stuinfo.name=req.query.name;
            Stuinfo.phone=req.query.phone;
            Stuinfo.email=req.query.email;
            Stuinfo.school=req.query.school;
            Stuinfo.stuNum=req.query.stuNum;
            Stuinfo.mark=req.query.mark;
            mainUserinfoDao.selectmainStuInfobyphone(Stuinfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    mainUserinfoDao.insertStu(Stuinfo,function(data1){
                        if(data1=="SUCCESS"){
                            res.send({msg:"SUCCESS"});
                        }else{
                            var status_err="SERVER";
                            res.send(status_err);
                        }
                    })
                }
            })

        }
  
    });
})

router.all("/Vip",function(req,res){
    //var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Vipinfo={}
            Vipinfo.name=req.query.name;
            Vipinfo.phone=req.query.phone;
            Vipinfo.email=req.query.email;
            Vipinfo.util=req.query.util;
            Vipinfo.job=req.query.job;
            Vipinfo.VipNum=req.query.VipNum;
            Vipinfo.mark=req.query.mark;
            mainUserinfoDao.selectmainInfobyphone(Vipinfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    mainUserinfoDao.insertVip(Vipinfo,function(data1){
                        if(data1=="SUCCESS"){
                    res.send({msg:"SUCCESS"});
                }else{
                        var status_err="SERVER";
                        res.send(status_err);
                }
            })
                }
            })

            

        }
  
    });
})


router.all("/noVip",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var noVip={}
            noVip.name=req.query.name;
            noVip.phone=req.query.phone;
            noVip.email=req.query.email;
            noVip.util=req.query.util;
            noVip.job=req.query.job;
            noVip.mark=req.query.mark;
            mainUserinfoDao.selectmainNVInfobyphone(noVip,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    mainUserinfoDao.insertnoVip(noVip,function(data){
                        if(data=="SUCCESS"){
                            res.send({msg:"SUCCESS"});
                        }else{
                            var status_err="SERVER";
                            res.send(status_err);
                        }
                    })
                }
            })

        }
  
    });
})





router.all("/selectmedia",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var mediainfo={}
            mediainfo.phone=req.query.phone;
            mainUserinfoDao.selectmainmediaInfobyphone(mediainfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    res.send({msg:"不存在"}); 
                }
            })

        }
  
    });
})


router.all("/selectStu",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Stuinfo={}
            Stuinfo.phone=req.query.phone;
            mainUserinfoDao.selectmainStuInfobyphone(Stuinfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data}); 
                }else{
                    res.send({msg:"不存在"});
                }
            })

        }
  
    });
})


router.all("/selectVip",function(req,res){
    //var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Vipinfo={}
            Vipinfo.phone=req.query.phone;
            mainUserinfoDao.selectmainInfobyphone(Vipinfo,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    res.send({msg:"不存在"});
                }
            })

            

        }
  
    });
})


router.all("/selectnoVip",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var noVip={}
            noVip.phone=req.query.phone;
            mainUserinfoDao.selectmainNVInfobyphone(noVip,function(data){
                if(data.length!=0){
                    res.send({msg:"已存在",data:data});
                }else{
                    res.send({msg:"不存在"});
                }
            })

        }
  
    });
})





module.exports = router