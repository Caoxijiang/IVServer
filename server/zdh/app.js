var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser)
var session = require('express-session'); 
var swig=require('swig');
var index = require('./routes/index');
var sms = require('./routes/sms');
var weixin= require('./routes/weixin');
var wx_Pay=require('./routes/wxPay');
var orders=require('./routes/orders');
var imageserver=require('./imageserver/imageserver');
var image=require('./routes/image');
var adminligin=require('./routes/adminlogin');
var adminmetting=require('./routes/adminmeetingList')
var admincarousel=require("./routes/admincarousel");
var adminguestsInfo=require('./routes/adminguestsInfo');
var adminIntroductionInfo=require('./routes/adminIntroductionInfo');
var Introduction=require('./routes/Introduction');
var adminschedule=require('./routes/adminscheduleInfo');
var damincputilInfo=require('./routes/admincputilInfo');
var adminctInfo =require('./routes/adminctInfo.js');
var adminrecommendInfo=require('./routes/adminrecommend')
var news=require("./routes/news");
var guests=require("./routes/guests")
var schedule=require("./routes/schedule")
var adminticket=require('./routes/adminsticketInfo')
var mainuserInfo=require("./routes/mainuserinfo")
var wxsticket=require('./routes/sticket')
var adminorderInfo=require('./routes/adminorderInfo')
var admininvoice=require('./routes/admininvoiceinfo')
var invoice=require('./routes/invoice')
var wxctInfo=require("./routes/wxctInfo")
var admininviteInfo=require('./routes/admininviteinfo');
var invite=require('./routes/invite');
var productinfo=require('./routes/adminproductinfo')
var wxproductinfo=require('./routes/productinfo')
var redis = require('redis');
var adminmainuserinfo=require('./routes/adminmainuserinfo')
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB 
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes 
    normalizeTags: true, // Transform tags to lowercase 
    explicitArray: false // Only put nodes in array if >1 
  }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',swig.renderFile);
app.set('view engine', 'html');




app.use(session({
  secret: 'sessiontest',  // 用来对session id相关的cookie进行签名
  //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 100 * 10000  // 有效期，单位是毫秒
  }
}));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('sessiontest'));
app.use('/public', express.static('public'));


// app.use(function (req, res, next) {
//   var url = req.originalUrl;
//   if (url != "/" && !req.session.userName) {
//       return res.redirect("/");
//   }
//   next();
// });



app.use('/',adminligin);
app.use('/index', index);
app.use('/sms', sms);
app.use('/weixin',weixin);
app.use('/wxPay',wx_Pay);
app.use('/orders',orders);
//app.use("./imageserver/imageserver",imageserver);
app.use('/image',image);
app.use('/adminmetting',adminmetting);
app.use('/admincarousel',admincarousel);
app.use('/guests',adminguestsInfo)
app.use('/adminIntroductionInfo',adminIntroductionInfo)
app.use('/Introduction',Introduction);
app.use('/adminschedule',adminschedule);
app.use("/damincputilInfo",damincputilInfo);
app.use("/adminctInfo",adminctInfo)
app.use("/admincomm",adminrecommendInfo)
app.use("/news",news)
app.use('/guests',guests)
app.use('/schedule',schedule)
app.use("/adminticket",adminticket)
app.use("/mainuserInfo",mainuserInfo)
app.use("/sticket",wxsticket);
app.use("/adminorder",adminorderInfo)
app.use("/adminunvoice",admininvoice)
app.use("/invoice",invoice)
app.use("/wxctInfo",wxctInfo)
app.use("/admininvite",admininviteInfo)
app.use("/invite",invite)
app.use("/adminmainuserinfo",adminmainuserinfo);
app.use("/adminproductinfo",productinfo);
app.use("/productinfo",wxproductinfo)
//app.use('/redis',redis);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

module.exports = app;
