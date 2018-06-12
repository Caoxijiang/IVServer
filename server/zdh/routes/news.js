var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var indexDao=require('../dao/indexDao')
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")




router.get('/wxnews', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
           meetingeDao.wxselectmetList(function(data){
                if(data){
                    res.send(data)
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
           })
        }
  
    });
  })
  




















module.exports = router;