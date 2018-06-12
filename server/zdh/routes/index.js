var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var indexDao=require('../dao/indexDao')
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")

router.get('/mettinginfo', function(req, res, next) {
  var token=req.query.token;
  client.get(token,function(err,value){
    if( err){
      var status_err="err";
      res.send(status_err);
      }else{ 
            meetingeDao.selectmeetcomlistInfo(function(data){
              if(!data.length==0){
                  var arr=[];
                  for(var obj of data){
                      meetingeDao.selectcommListBymetinfid(obj.metting_id,function(ress){
                          if(ress){
                              arr.push(ress)
                              if(arr.length==data.length){
                                  res.send(arr)
                              }
                          }
                      })
                  }
              }else{
                var status_err="SERVERERR";
                res.end(status_err);
              }
          })
      }

  });
})


router.get('/carouselinfo', function(req, res, next) {
  var token=req.query.token || req.body.token;
  client.get(token,function(err,value){
    if( err){
      var status_err="err";
      res.send(status_err);
      }else{ 
        indexDao.selectIndexCarouse(function(data){
              if(data){
                res.send(data);
              }else{
                var status_err="SERVERERR"
                res.end(status_err);
              }
            });
      }

  });
})




module.exports = router;
//http://192.168.2.102:3006/public/images/1518060481184.png
