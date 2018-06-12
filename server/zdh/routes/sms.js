var express = require('express');
var smsDao=require('../dao/smsDao')
var router = express.Router();
var Redis=require('redis');
var client=require("../Redis/RedisServer")
var secret = require('../conf/secret').random;
const SMSClient = require('@alicloud/sms-sdk')
router.all('/phonelogin', function(req, res, next) {
      var PhoneNumbers=req.query.phoneNumber || req.body.phoneNumber;  
      console.log(PhoneNumbers);
      var random=Math.random().toString().slice(-4).toString();
      var TemplateParam=String('{"code":'+ random +'}' )
      client.get(PhoneNumbers,function(err,result){
        if(result){
            res.status(200).json({
                code:1,
                msg:"最近1分钟内已有申请，不允许重复操作"
            })
        }else{      
            console.log("登陆验证码："+TemplateParam);
              // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
            var accessKeyId = 'LTAITtZfSpvTZYCr'
            var secretAccessKey = '3rBQlXQH3cWZbnEnTXM2g1pMnMhEld'
            //初始化sms_client
            var smsClient = new SMSClient({accessKeyId, secretAccessKey})
            //发送短信
              smsClient.sendSMS({
                  PhoneNumbers:PhoneNumbers ,
                  SignName: 'IEEE IV 2018',
                  TemplateCode: 'SMS_134080287',
                  TemplateParam: TemplateParam
            }).then(function (respance) {
                var Code=respance.Code
                if (Code === 'OK') {
                     res.json ({
                        code:2,
                        msg:"SUCCESS"
                    });
                    console.log(res)
                    //处理返回参数
                    SMSVerificationgetRedis(PhoneNumbers,random); 
                }
            }, function (err) {
                res.json({
                    code:err.code,
                    msg:err.code
                });
                console.log(err)
            })
        }
      })
             
});
router.all("/submitphoneInfo",function(req,res){
  var phonenumber=req.query.phoneNumber ||req.body.phoneNumber;
  var sms=req.query.code|| req.body.code;
  client.get(phonenumber,function(err,result){
      if(sms==result){
        smsDao.selectphoneNUm(phonenumber,function(data){
            if(data==undefined){
                smsDao.insertUserPhoneBaseInfo(phonenumber,function(datas){
                    if(datas.msg=="SUCCESS"){
                        res.send({
                            code:0,
                            phoneNum:phonenumber
                        });
                    }else{
                        res.send({
                            code:1,
                        })
                    }
                });
               
            }else if(data.user_phoneNumRole==1){
                res.send({
                    code:"ADMINTOKEN",
                    phoneNum:phonenumber
                })
            }  else{
                res.send({
                    code:3,
                    phoneNum:phonenumber,
                })
            }
        })
      }else{
        res.json({
            code:1,
            msg:"验证码错误"
        })
      }
  })

})

function generateMixed(n) {
    var chars = ['0','1','2','3','4','5','6','7','8','9'];    
    var res = "";
       for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*11);
           res += chars[id];
       }
       return res;
  }
function SMSVerificationgetRedis(phoneNum,sms){
    if(client){
        client.set(phoneNum,sms,Redis.print);
        client.expire(phoneNum,1*60); 
    }else{
        console.log('redis client instance is not exist.');
    }
}      

module.exports = router;
