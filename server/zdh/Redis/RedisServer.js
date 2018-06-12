var redis = require("redis");
var client = redis.createClient();
client.on('connect',function(err){
    if(err){
        console.log("连接Redis失败"+err)
    }
        console.log("连接Redis成功")
});
module.exports = client;