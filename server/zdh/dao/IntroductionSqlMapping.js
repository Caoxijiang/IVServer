
var Introduction={
    add:"insert into introduction_info(user_id,topic,time,address,money,Introduction) values(?,?,?,?,?,?)",
    select:"select * from introduction_info",
    delete:"delete from introduction_info where topic=?"
};
module.exports = Introduction;