var express = require('express');
var router = express.Router();
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
var productDao=require('../dao/adminproductDao');
//微信获取商品信息 /productinfo/productinfo
router.get('/productinfo', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{ 
            productDao.selectAllproduct(function(data){
                if(data.length!=0){
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