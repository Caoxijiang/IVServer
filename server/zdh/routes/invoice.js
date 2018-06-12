var express = require('express');
var router = express.Router();
var invoiceDao=require('../dao/invoiceDao');
var secret = require('../conf/secret').random;
var client=require("../Redis/RedisServer")
router.all('/add', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if( err){
        var status_err="err";
        res.send(status_err);
        }else{
            var Identityinfo=JSON.parse(req.query.Identityinfo);
            
           // console.log(JSON.parse(Identityinfo))
            invoiceDao.selectpersonalStatus(Identityinfo,function(data){
                if(data.length!=0){
                    for(var obj of data){
                        var arr=obj.invoice_status
                        break;
                    }
                    if(arr==0){
                        var status_err="err_1";
                        res.send(status_err)
                    }else{
                        invoiceDao.addinvoiceInfo(Identityinfo,function(data){
                            if(data=="SUCCESS"){
                                res.send(data)
                            }else{
                                var status_err="SERVERERR"
                                res.end(status_err);
                            }
                        })
                    }
  
              } else{
                    invoiceDao.addinvoiceInfo(Identityinfo,function(data){
                        if(data=="SUCCESS"){
                            res.send(data)
                        }else{
                            var status_err="SERVERERR"
                            res.end(status_err);
                        }
                    })
                }
            })
        }
  
    });
  })

  module.exports = router;