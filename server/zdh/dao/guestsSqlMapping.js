var guestsInfo = {
    addguestsInfo:"insert into guests_info(user_id,guests_url,guests_name,guests_job,guests_status) values(?,?,?,?,?)",
    selectguestsInfo:"select * from guests_info",
    dellguestsInfo:"delete from guests_info where guests_url=?",
    selectguestsInfoByid:"select * from guests_info where guests_id=?"

};
module.exports = guestsInfo;
