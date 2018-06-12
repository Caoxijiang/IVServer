var mainuserInfo={
    insertmediaInfo:"insert into main_mediaInfo(media_name,media_phone,media_email,media_util,media_job,media_platform,media_status,media_mark) values(?,?,?,?,?,?,1,?)",
    insertnoVipInfo:"insert into main_novipinfo(noVip_name,noVip_phone,noVip_email,noVip_util,noVip_job,novip_status,novip_mark) values(?,?,?,?,?,1,?)",
    insertVipInfo:"insert into main_vipinfo(ticket_name,ticket_phone,ticket_email,ticket_util,ticket_job,ticket_VIPnum,ticket_status,ticket_mark) values(?,?,?,?,?,?,1,?)",
    insertStuInfo:"insert into main_stuinfo(stu_name,stu_phone,stu_email,stu_school,stu_stuNum,stu_status,stu_mark) values(?,?,?,?,?,1,?)",
    selectVipmainbyphone:"select * from main_vipinfo where ticket_phone=?",
    selectNVipmainbyphone:"select * from main_novipinfo where noVip_phone=?",
    selectStumainbyphone:"select * from main_stuinfo where stu_phone=?",
    selectmediamainbyphone:"select * from main_mediaInfo where media_phone=?",
    selectAllmediaInfo:"select * from main_mediaInfo",
    selectAllnoVipInfo:"select * from main_novipinfo",
    selectAllVip:"select * from main_vipinfo",
    selectAllStu:"select * from main_stuinfo",
    selectmarkinfo:"select * from main_novipinfo where noVip_mark",
    updatestatusbymark:"update main_novipinfo set novip_mark=status where ticket_id=?",
    updatmediabymark:"update main_mediaInfo set media_status=? where ticket_id=?"
}
module.exports=mainuserInfo;