$().ready(function(){
    $("#submit").click(function () {
        var topic=$('#topic').val().ser;
        var Summary=$('#Summary').val();
        var datetimeStart=$("#datetimeStart").val();
        alert(datetimeStart)
        var image=$("#fileId")[0].files[0];
        console.log(image);
        if(topic==''|| Summary==''||image==undefined || datetimeStart==""){
            
            alert('请选择上传信息');
        }else{
            var a = new FormData();
            a.append("image", image);
            a.append("id", 1);
            // a.append("topic",$('#topic').val());
            a.append("datetimeStart",datetimeStart);
            var formData = new FormData($( "#uploadForm" )[0]);  
        //   alert(JSON.stringify(formData));
            $.ajax({ 
                url: "/image/uploadImage", 
                type: "POST", 
                data: formData, 
                processData: false, // 不要对data参数进行序列化处理，默认为true
                contentType: false, // 不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
                xhr: function(){
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){
                      myXhr.upload.addEventListener('progress',function(e) {
                        if (e.lengthComputable) {
                          var percent = Math.floor(e.loaded/e.total*100);
                          if(percent <= 100) {
                          //  $("#uploadForm").progress('set progress', percent);
                            $("#uploadForm").html('已上传：'+percent+'%');
                          }
                          if(percent >= 100) {
                            $("#uploadForm").html('文件上传完毕，请等待...');
                            $("#uploadForm").addClass('success');
                          }
                        }
                      }, false);
                    }
                    return myXhr;
                },
                success: function(res){ 
                    // 请求成功
                    alert(res.msg)
                },
                error: function(res) {
                    // 请求失败
                    alert(res.msg)
                    console.log(res);
                }
            }); 
             
        
        
        
        
        
        
        
        
        
        
        
        
            // $.ajax({
            //     url:"/image/uploadImage",
            //     data: formData,
            //     type: "POST",
            //     cache: false,
            //     processData: false,
            //     contentType:false,
            //     async: false,
            //     success: function (result) {
            //         alert(result)
            //     }
            //     //cache 上传文件不需要缓存，所以设置false
            //     //processData 因为data值是FormData对象，不需要对数据处理
            //     //contentType 因为是由form表单构造的FormData对象，且已声明了属性enctype，所以为false
            // })
        }

    })
})