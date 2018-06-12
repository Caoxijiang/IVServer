var express = require('express');
var router = express.Router();
var ticketeDao=require('../dao/ticketDao');
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
router.all("/wxsticket",function(req,res){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            ticketeDao.selectAllticketInfo(function(data){
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