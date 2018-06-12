var schedule={
    addscheduleinfo:"insert into schedule_info(user_id,schedule_id) values(?,?)",
    addscheduleidinfo:"insert into schedule_timeid(schedule_id) values(?)",
    addscheduletimeinfo:"insert into schedule_timeinfo(user_id,schedule_time_id,schedule_time_content,schedule_time_dan,schedule_time_character) values(?,?,?,?,?)",
    selectscheduletimeidBysid:"select schedule_time_id from schedule_timeid where schedule_id=?",
    selecttimeInfoByscheduleid:"select * from schedule_timeinfo where schedule_time_id=?",
    selectscheduleidByuserid:"select schedule_id from schedule_info where user_id=? order by schedule_time_dan asc",
    dellallscheduleinfo:"delete  from schedule_info where  schedule_id=?",
    dellalltimeId:"delete  from schedule_timeid where schedule_id=?",
    dellalldaninfo:"delete  from schedule_timeinfo where schedule_time_id=? ",
    dellalltimeIdBytid:"delete  from schedule_timeid where schedule_time_id=?",
    updatadanInfo:"update schedule_timeinfo set schedule_time_content=?,schedule_time_dan=?,schedule_time_character=? where schedule_time_id=?"

}
module.exports=schedule;