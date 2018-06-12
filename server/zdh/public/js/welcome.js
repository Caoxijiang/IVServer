/**
 * Created by Jackie on 2018-05-10.
 */
$(document).ready(function(){
    window.onload = function(){ 
        　　$("#newsAdd-btn").click();     
          //  uploadImg();
        
        } 

     //JavaScript代码区域
     layui.use('element', function(){
        var element = layui.element;

    });
$("#newsAdd-btn").click(function(){
   
    //$(this).css("background-color",)
    var addNews =  '<div class="news-box"><div class="news-title">'+
        '<h2>添加新闻</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<div class="date-style">'+
        '<div class="layui-inline">'+
        '<label class="layui-form-label">日期</label>'+
        '<div class="layui-input-inline">'+
        ' <input type="text" id="datetimeStart" name="datetimeStart" class="layui-input" placeholder="yyyy-MM-dd">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="news-name ipt-title date-style">'+
        '<div class="input-group">'+
        '<input type="text" class="form-control" id="topic"   name="topic" maxlength="20"  placeholder="标题（5-20个字符）" aria-describedby="basic-addon2">'+
       //'<span class="input-group-addon" id="basic-addon2">0/30</span>'+
        '</div>'+
        '</div>'+

        '<div class="layui-form-item">'+
            '<label class="layui-form-label" style="width:102px;">原文地址</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="originalUrl" name="originalUrl" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
            '</div>'+
        '</div>'+

        '<textarea class="news-textarea date-style" id="Summary"  name="Summary"  rows="3" cols="30" maxlength="120" placeholder="请输入摘要内容(最多120字符)"  ></textarea>'+
    
        '<div class="upImgBox">'+
        '<label class="layui-form-label" style="padding:0px;font-size:12px;color:#888;width:120px;float:right;display:inline-block;">(图片尺寸为151*90)</label>'+
       '<input id="image" type="file" style="display:inline-block;"  >'+//onchange="preview(this)"
       '<div id="preview"></div>'+
        '</div>'+
        '<div class="news-btn date-style">'+
        '<button id="uploadNews" class="btn btn-danger">发表</button>'+
        '</div>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(addNews);
       //常规用法
       laydate.render({
        elem: '#datetimeStart'
    });
    $("#uploadNews").on("click",function(){
       if( $("#datetimeStart").val()==""||$("#username").val()==""||$("#topic").val()== ""||$("#Summary").val()==""||$("#image").val()==""||$("#originalUrl").val()==""){
        layer.msg('您的内容不能为空', {
            icon: 1,
            time: 1000
          });
       }
        var formData = new FormData();
        formData.append("datetimeStart", $("#datetimeStart").val());
        formData.append("username", $("#username").val());
        formData.append("originalUrl", $("#originalUrl").val());
        formData.append("topic", $("#topic").val());
        formData.append("Summary", $("#Summary").val());
        formData.append("image", $("#image")[0].files[0]);
        $.ajax({
            url:'/image/uploadImage',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if(data.msg=="会议信息上传成功"){
                      $("#newsManage-btn").click();
                      layer.msg('会议信息上传成功', {
                        icon: 1,
                        time: 1000
                      });
                }else{
                    layer.msg('您的操作有误', {
                        icon: 1,
                        time: 1000
                      });
                }             
            }
        });
    })
     $("#image").on("change",function(){
         var file = this;
        var prevDiv = document.getElementById('preview');
        if (file.files && file.files[0]) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
            }
            reader.readAsDataURL(file.files[0]);
        } else {
            prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        }
     })


})

$("#newsManage-btn").on('click',function(){
    var  newsManage =  '<div class="news-box"><div class="news-title">'+
    '<h2>新闻管理</h2>'+
    '</div>'+
    '<div class="news-content">'+
    '<table class="table-box table-sort " id="newsTable">'+
    '<thead>'+
    '  <tr >'+
    '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
    '   <th style="text-align: center;">标题</th>'+
    '   <th style="text-align: center;">摘要</th>'+
    '   <th style="text-align: center;">原文地址</th>'+
    '   <th style="text-align: center;">图片</th>'+
    '   <th style="text-align: center;">开始时间</th>'+
    '    <th style="text-align: center;">操作</th>'+
    '  </tr>'+
    '   </thead>'+
    '<tbody></tbody>'
    '   </table>'+
    '</div></div>'
$(".news-box").remove();
$(".main-right").append(newsManage);
        $.ajax({
        type:"get",
        url:"/adminmetting/meetingList",
        async:true,
        success:function(data){
             ;
            $(data).each(function(index,element){
                 index+=1;
                var  newsManageTR =  '<tr class="metting">'+
                 '<td>'+index+'</td>'+
                 '<td>'+element.metting_topic+'</td>'+
                 '<td>'+element.metting_Summary+'</td>'+
                 '<td>'+element.metting_original+'</td>'+
                 '<td><img src="'+element.metting_imageUrl+'"/></td>'+
                 '<td>'+element.metting_startTime+'</td>'+
                 '<td >'+
                 //'<button class="btn btn-danger">修改</button>'+
                 '<button id="delNes-btn" data-id="'+element.metting_id+'"   data-img="'+element.metting_imageUrl+'" class="btn btn-primary">删除</button>'+
                 '</td>'+
                 '</tr>'         
            $("#newsTable tbody").append(newsManageTR);
            })
            //删除新闻接口
            $("#newsTable").on("click","#delNes-btn",function(){
               var getImgUrl = $(this).attr("data-img");
               var getImgId = $(this).attr("data-id");
               var _imgThis = $(this);
            $.ajax({
                type:"post",
                url:"/adminmetting/dellmeetingList",
                data:{
                    "id" : getImgId,
                    "Meturl" :getImgUrl
                },
                success:function(data){
                   ;
                  if(data == 1){
                    _imgThis.parent().parent().remove();
                  }else{
                    layer.msg('您的操作有误+'+data+'', {
                        icon: 1,
                        time: 1000
                      });
                  }
                }
            })
            })                  
        }   
        
    });
    
})
$("#addLive").on("click",function(){
    var addLive =  '<div class="news-box"><div class="news-title">'+
        '<h2>添加直播</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<div class="news-name ipt-title">'+
        '<div class="input-group">'+
        '<span class="input-group-addon" id="basic-addon2">标题</span>'+
        '<input type="text" class="form-control " placeholder="标题（5-30个字符）" aria-describedby="basic-addon2">'+
        // '<span class="input-group-addon" id="basic-addon2">0/30</span>'+
        '</div>'+
        '</div>'+
        '<textarea class="news-textarea"  rows="3" cols="30" maxlength=""  placeholder="请输入内容"></textarea>'+
        '<div class="layui-upload">'+
        '<button type="button" class="layui-btn" id="test1" style="margin: 10px 42px;">上传图片</button>'+
        '<div class="layui-upload-list"  style="margin: 10px 42px;">'+
        '<img class="layui-upload-img news-upImg" id="demo1">'+
        '<p id="demoText"></p>'+
        '</div></div>'+
        '<div class="news-btn">'+
        '<button class="btn btn-danger"  style="margin: 10px 15px;">发表</button>'+
        '</div>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(addLive);
   
})
$("#liveManage").on("click",function(){
    var addNews =  '<div class="news-box"><div class="news-title">'+
        '<h2>添加新闻</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<div class="news-name">'+
        '<div class="input-group">'+
        '<input type="text" class="form-control" placeholder="标题（5-30个字符）" aria-describedby="basic-addon2">'+
        '<span class="input-group-addon" id="basic-addon2">0/30</span>'+
        '</div>'+
        '</div>'+
        '<textarea class="news-textarea"  rows="3" cols="30" maxlength=""></textarea>'+
        '<div class="news-btn">'+
        '<button class="btn btn-danger">发表</button>'+
        '<button class="btn btn-default">存草稿</button>'+
        ' <button class="btn btn-default">预览</button>'+
        ' <button class="btn btn-default">取消</button>'+
        '</div>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(addNews);
})
$("#liveManage-btn").on('click',function(){
    var  liveManage =  '<div class="news-box"><div class="news-title">'+
        '<h2>直播管理</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<table class="table-box table-sort " id="newsTable">'+
        '<thead>'+
        '  <tr >'+
        '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
        '   <th style="text-align: center;">标题</th>'+
        '   <th style="text-align: center;">内容</th>'+
        '    <th style="text-align: center;">操作</th>'+
        '  </tr>'+
        '   </thead>'+
        '   <tbody>'+
        '   <tr>'+
        '   <td>1</td>'+
        '   <td>IEEE IV 2018</td>'+
        '<td>人工职能作为新一轮产业变革的核心驱动力，将进一步释放历次科技革命和产业变革积蓄的巨大能量，并创造新的强大引擎，随着互联网，大数据，云计算物联网等</td>'+
        '<td ><button class="btn btn-danger">修改</button><button class="btn btn-primary">删除</button><button class="btn btn-warning">审核</button></td>'+
        '   </tr>'+
        '   <tr>'+
        '   <td>2</td>'+
        '   <td>IEEE IV 2018</td>'+
        '<td>人工职能作为新一轮产业变革的核心驱动力，将进一步释放历次科技革命和产业变革积蓄的巨大能量，并创造新的强大引擎，随着互联网，大数据，云计算物联网等</td>'+
        '<td ><button class="btn btn-danger">修改</button><button class="btn btn-primary ">删除</button><button class="btn btn-warning">审核</button></td>'+
        '   </tr>  <tr>'+
        '   <td>3</td>'+
        '   <td>IEEE IV 2018</td>'+
        '<td>人工职能作为新一轮产业变革的核心驱动力，将进一步释放历次科技革命和产业变革积蓄的巨大能量，并创造新的强大引擎，随着互联网，大数据，云计算物联网等</td>'+
        '<td ><button class="btn btn-danger">修改</button><button class="btn btn-primary ">删除</button><button class="btn btn-warning">审核</button></td>'+
        '   </tr>  <tr>'+
        '   <td>4</td>'+
        '   <td>IEEE IV 2018</td>'+
        '<td>人工职能作为新一轮产业变革的核心驱动力，将进一步释放历次科技革命和产业变革积蓄的巨大能量，并创造新的强大引擎，随着互联网，大数据，云计算物联网等</td>'+
        '<td ><button class="btn btn-danger">修改</button><button class="btn btn-primary ">删除</button><button class="btn btn-warning">审核</button></td>'+
        '   </tr>'+
        '  </tbody>'+
        '   </table>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(liveManage);
})
        //图片显示
        function preview() {
              alert(234666);
        //     var prevDiv = document.getElementById('preview');
        //     if (file.files && file.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = function (evt) {
        //             prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
        //         }
        //         reader.readAsDataURL(file.files[0]);
        //     } else {
        //         prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        //     }
        }
        function delNews(which){
            alert(123);
        }
})
