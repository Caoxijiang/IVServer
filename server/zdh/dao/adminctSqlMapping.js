var ctinfo={
    addctinfo:"insert into contactme_info(user_id,ct_name,ct_AvatarUrl,ct_CHjobname,ct_UNjobname,ct_phoneNum,ct_email,ct_wxNum,ct_QrcodeUrl) values(?,?,?,?,?,?,?,?,?)",
    selectAllctInfo:"select * from contactme_info where user_id=?",
    dellctinfobytypeid:"delete from contactme_info where ct_AvatarUrl=?",
    selectAllurl:"select ct_AvatarUrl,ct_QrcodeUrl from contactme_info where ct_type_id=?",
    wxselectAllctInfo:"select * from contactme_info"
}
module.exports=ctinfo;