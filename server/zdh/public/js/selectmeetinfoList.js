$().ready(function(){
    $("#test1").on('click',function(){
        alert(11)
        $.ajax({
            url:"/adminmetting/meetingList",
            type: "get",
            success:function(data){
                if(data){
                    alert(data)
                }else{
                    console("123131321");
                }
            }
        })
    })
})