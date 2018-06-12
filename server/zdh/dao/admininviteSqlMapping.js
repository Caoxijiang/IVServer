var invite={
    addinvite:"insert into admin_InvitedInfo(user_id,Invited_name,Invited_job1,Invited_job2,Avatar_url,Invited_phone) values(?,?,?,?,?,?)",
    selectAllinvite:"select * from admin_InvitedInfo",
    dellinviteByID:"delete from admin_InvitedInfo where Avatar_url=?",
    updatainviteInfo:"update admin_InvitedInfo set Invited_name=?,Invited_job1=?,Invited_job2=?,Avatar_url=?,Invited_phone=? where Invited_id=?",
    selecturlByID:"select Avatar_url from admin_InvitedInfo where Invited_id=?"
}
module.exports=invite;