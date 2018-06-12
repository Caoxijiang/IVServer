var sms={
    selectphoneNum:"select * from user_phonebase where user_phoneNum=?",
    insertphoneNumBaseInfo:"insert into user_phonebase(user_phoneNum,user_phoneNumRole,user_phoneNumVip) values(?,0,0);",
    insertphoneInfo:"insert into user_phoneinfo(user_id) values(?)"
    
}
module.exports=sms;
