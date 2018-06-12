var express = require('express');
var client=require("../Redis/RedisServer")
var fs=require("fs");
var router = express.Router();
var formidable = require("formidable");
// var imageInfo=require("../dao/imagesDao");
var secret = require('../conf/secret').random;
var url=require('../conf/imageconf').url;
var meetingeDao=require('../dao/mettinginfoDao');
var indexDao=require('../dao/indexDao');
var guestsDao=require('../dao/guestsDao');
var cputilDao=require('../dao/cputilDao');
var ctDao=require('../dao/adminctDao')
var inviteDao=require('../dao/admininviteDao')
var productDao=require('../dao/adminproductDao')
var deleteimages=require('../util/util').delete;
//文章上传
router.all('/uploadImage', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                      //  console.log(file, file.size);
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var meetingInfo={};
                                   meetingInfo.url=url+uploadDir.replace(".","");
                                   meetingInfo.topic=fields.topic;
                                   meetingInfo.Summary=fields.Summary;
                                   meetingInfo.datetimeStart=fields.datetimeStart.toString();
                                   meetingInfo.admin=req.session.userName;
                                   meetingInfo. originalUrl=fields.originalUrl;
                                   meetingeDao.insertmeetingInfo(meetingInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"会议信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)
                                        }
                                   })

                            }
                       })
           
                   }
                }

               }
            });
        } 

     });
     //轮播上传
     router.all('/CarouseluploadImage', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/webImage/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                      //  console.log(file, file.size);
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/webImage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var CarouselInfo={};
                                   CarouselInfo.url=url+uploadDir.replace(".","");
                                   CarouselInfo.admin=req.session.userName;
                                   indexDao.admininsertCarouselInfo(CarouselInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"轮播上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });

     //嘉宾上传
     router.all('/guestsInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/webImage/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                      //  console.log(file, file.size);
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/guestsImage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var guestsInfo={};
                                   guestsInfo.url=url+uploadDir.replace(".","");
                                   guestsInfo.admin=req.session.userName;
                                   guestsInfo.name=fields.name;
                                   guestsInfo.job=fields.job;
                                   guestsInfo.status=fields.status;
                                   guestsDao.addguestsInfo(guestsInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"嘉宾信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });



     //合作伙伴上传
     router.all('/cputilInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/cputilimage/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                      //  console.log(file, file.size);
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/cputilimage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var cputilInfo={};
                                   cputilInfo.cpurl=url+uploadDir.replace(".","");
                                   cputilInfo.admin=req.session.userName;
                                   cputilInfo.cpname=fields.companyname;
                                   cputilInfo.cptype=fields.companyType;
                                   cputilDao.insertcputilinfo(cputilInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"合作单位信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });


     //个人联系方式
     router.all('/adminctInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/touchImages/"; //改变临时目录
            
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                    var arr=[];
                    var index =1;

                    var ctinfo={}
                    
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";  
                               break;
                       }
                       
                       if(fName.length<=0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime();
                           var uploadDir1 = "./public/images/touchImages/"+newName+fName;
                    try {    
                        if(files.ctavatarUrl.path==file.path){
                            var newctavatarUrl= fs.renameSync(files.ctavatarUrl.path,uploadDir1); 
                            var ctavatarUrl=url+uploadDir1.replace(".","")
                            ctinfo.ctavatarUrl=ctavatarUrl;
                        }else{
                            var newcctQrurl=fs.renameSync(files.ctQrurl.path,uploadDir1)
                            var ctQrurl=url+uploadDir1.replace(".","");
                            ctinfo.ctQrurl=ctQrurl;
                        }                        
                       
                    } catch (error) {
                        res.send({msg:"图片存入服务器失败"});
                    }
                    
                       
                   }

                }
                ctinfo.admin=req.session.userName;
                ctinfo.ctname=fields.ctname;
                ctinfo.ctChJname=fields.ctChJname;
                ctinfo.ctUnJname=fields.ctUnJname;
                ctinfo.ctphone=fields.ctphone;
                ctinfo.ctemail=fields.ctemail;
                ctinfo.ctwxnum=fields.ctwxnum;
                ctDao.insertctInfo(ctinfo,function(data){
                    if(data.msg=="SUCCESS"){
                        res.send({msg:"发表成功"})
                    }else{
                        res.send({msg:"发表失败"})
                    }
                })
               }
            });
        } 

     });





     //邀请函上传 image/inviteInfo
     router.all('/inviteInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/inviteimage/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/inviteimage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var inviteInfo={};
                                   inviteInfo.url=url+uploadDir.replace(".","");
                                   inviteInfo.admin=req.session.userName;
                                   inviteInfo.name=fields.invitename;
                                   inviteInfo.job1=fields.job1;
                                   inviteInfo.job2=fields.job2;
                                   inviteInfo.phone=fields.phone;
                                   inviteDao.insertinviteInfo(inviteInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"邀请函信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });





     //添加商品 /images/productInfo
     router.all('/productInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/productimag/"; //改变临时目录
            
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                    var arr=[];
                    var index =1;

                    var productinfo={}
                    
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";  
                               break;
                       }
                       
                       if(fName.length<=0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime();
                           var uploadDir1 = "./public/images/productimag/"+newName+fName;
                    try {    
                        if(files.imgurl.path==file.path){
                            var newimgurl= fs.renameSync(files.imgurl.path,uploadDir1); 
                            var imgurl=url+uploadDir1.replace(".","")
                            productinfo.imgurl=imgurl;
                        }else{
                            var newcthimgurl=fs.renameSync(files.thimgurl.path,uploadDir1)
                            var thimgurl=url+uploadDir1.replace(".","");
                            productinfo.thimgurl=thimgurl;
                        }                        
                       
                    } catch (error) {
                        res.send({msg:"图片存入服务器失败"});
                    }
                    
                       
                   }

                }
                productinfo.admin=req.session.userName;
                productinfo.name=fields.name;
                productinfo.Instructions=fields.Instructions;
                productinfo.details=fields.details;
                productinfo.price=fields.price;
                productDao.addproduct(productinfo,function(data){
                    if(data.msg=="SUCCESS"){
                        res.send({msg:"发表成功"})
                    }else{
                        res.send({msg:"发表失败"})
                    }
                })
               }
            });
        } 

     });










module.exports = router;