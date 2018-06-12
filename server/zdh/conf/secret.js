var uuid = require('node-uuid');  
exports.random =function(){
    return uuid.v1();
 }