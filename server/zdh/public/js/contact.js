$().ready(function(){
    $("#ctsubmit").click(function(){
        //上传联系我们个人信息
        var formData = new FormData($( "#CtuploadForm" )[0]);  
        // var image=$("#ctavatarUrl")[0].files[0];
        // var image2=$("#ctavatarUrl")[1].files[1]
        // var a = new FormData();
        // a.append("image", image);
        // a.append("image2",image2);
        $.ajax({
            url:"/image/adminctInfo",
            data: formData,
            type: "POST",
            cache: false,
            processData: false,
            contentType:false,
            async: false,
            success:function(data){
                if(data){
                    alert(JSON.stringify(data))
                }
            }
        })
    })
    //获取联系我们信息
    $("#ctfsubmit").click(function(){
        $.ajax({
            url:"/adminctInfo/selectAllctinfo",
            success:function(data){
                if(data){
                    alert(JSON.stringify(data))
                }
            }
            
        })
    })
    //根据tppe_id删除
    $("#dellct").click(function(){
        var ID=23;
        $.ajax({
            url:"/adminctInfo/dellallctinfo",
            data:{
             ID:ID
            },
            success:function(data){
                 if(data){
                     alert(JSON.stringify(data))
                 }
            }
        })
    })
})