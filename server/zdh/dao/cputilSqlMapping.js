var cputilInfo={
    insertcputilinfo:"insert into cp_utilinfo(user_id,cputil_name,cputil_type,cputil_url) values(?,?,?,?)",
    selectAllcputil:"select * from cp_utilinfo",
    selectcp:"select * from cp_utilinfo where cputil_id=?", 
    deletecpbycpbyurl:"delete from cp_utilinfo where cputil_url=?",
    selectcpurlbycpid:"select cputil_url from cp_utilinfo where cputil_id=?"
}

module.exports=cputilInfo;