/**
 * Created by Jackie on 2018-05-12.
 */
$(function(){
    $(function(){
        $("#swiperAdd-btn").click();
        
    })
    
    $("#swiperAdd-btn").on("click",function(){
        var addswiper = '<div class="news-box"> '+
            '<div class="news-title"> '+
            '<h2 class="">添加轮播</h2> '+
            /*<button id="add-img" class="btn btn-warning">添加轮播</button>*/
        '</div> '+
        '<div class="news-content"> '+
        '<div class="add-swiper"> '+
        '<div class="add-img"> '+
        '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"> '+
        '<legend>上传轮播图片</legend> '+
        '</fieldset> '+
        '<div class="layui-upload">'+
        '<button type="button" class="layui-btn" id="upImg">上传图片</button>'+
        '<div class="layui-upload-list">'+
        '<img class="layui-upload-img news-upImg" id="demo1">'+
        '<p id="demoText"></p>'+
        '</div></div>'+
        '</div> '+
        '</div> '+
        '</div> '+
        '</div>'
        $(".news-box").remove();
        $(".main-right").append(addswiper);
        upImg();
    })
    $("#swiperManage-btn").on("click",function(){
        var  swiperManage =  '<div class="news-box"><div class="news-title">'+
            '<h2>轮播管理</h2>'+
            '</div>'+
            '<div class="news-content">'+
            '<table class="table-box table-sort " id="addSwiperImg">'+
            '<thead>'+
            '  <tr >'+
            '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
            '   <th style="text-align: center;">图片</th>'+
            '    <th style="text-align: center;">操作</th>'+
            '  </tr>'+
            '   </thead>'+
            '   <tbody>'+
            '  </tbody>'+
            '   </table>'+
            '</div></div>'
        $(".news-box").remove();
        $(".main-right").append(swiperManage);
        $.ajax({
            type:"get",
            url:"/admincarousel/selectcarousel",
            success:function(data){
               console.log(data);
              // var addImgHtml = ''
              $(data).each(function(index,element){
                index+=1;
               var  addImgHtml = '<tr>'+
                            '<td>'+index+'</td>'+
                            '<td><img style="width: 100px; height: 100px;" src="'+element.carousel_url+' " alt=""></td>'+
                            '<td ><button id="delImg-btn" data-carousel_id="'+element.carousel_id+'" class="btn btn-primary">删除</button></td>'+
                            '</tr>';
           $("#addSwiperImg tbody").append(addImgHtml);
           })
           //删除轮播图片接口
           $("#addSwiperImg").on("click","#delImg-btn",function(){
           // var getImgUrl = $(this).attr("data-img");
            var getImgId = $(this).attr("data-carousel_id");
         $.ajax({
             url:"/admincarousel/dellcarousel",
             data:{
                 "carouselid" : getImgId
             },
             success:function(data){
               //console.log(data);
               if(data == 1){
                 $("#swiperManage-btn").click();
               }else{
                 layer.msg('您的操作有误', {
                     icon: 1,
                     time: 1000
                   });
               }
             }
         })
         })  
            }
        })
    })

    addimportBtn();
    function addimportBtn(){
      
    $("#add-importent").on("click",function(){
        var jaychou = [];
        //强力推荐
        //$.get("/admincomm/selectcomminfo",function(result){
           $.ajax({
            url:'/admincomm/selectcomminfo',
            cache:false,
            success:function(result){
            if(result){
               for(var obj1 of result){
                   for(obj2 of obj1){
                      
                       jaychou.push(obj2);
                     
                   }
               }
            }else{
                 alert("没有数据")
            }
        }
        })
        var addimportent =  '<div class="news-box"><div class="news-title">'+
        '<h2>添加内容</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<table class="table-box table-sort " id="add-importentTable">'+
        '<thead>'+
        '  <tr >'+
        '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
        '   <th style="text-align: center;">标题</th>'+
        '   <th style="text-align: center;">内容</th>'+
        '    <th style="text-align: center;">图片</th>'+
        '    <th style="text-align: center;">时间</th>'+
        '    <th style="text-align: center;">操作</th>'+
        '  </tr>'+
        '   </thead>'+
        '   <tbody>'+
        '  </tbody>'+
        '   </table>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(addimportent);
    $.ajax({
        type:"get",
        url:"/adminmetting/meetingList",
        async:true,
        success:function(data){
            $(data).each(function(index,element){
                 index+=1;
                // console.log(index);
                // console.log(element.metting_topic);
                var  newsManageTR =  '<tr class="metting">'+
                 '<td>'+index+'</td>'+
                 '<td>'+element.metting_topic+'</td>'+
                 '<td>'+element.metting_Summary+'</td>'+
                 '<td><img src="'+element.metting_imageUrl+'"/></td>'+
                 '<td>'+element.metting_startTime+'</td>'+
                 '<td >'+
                 //'<button class="btn btn-danger">修改</button>'+
                 '<button id="addimport-btn" data-id="'+element.metting_id+'"   data-img="'+element.metting_imageUrl+'" class="addimport-btn btn btn-primary">添加</button>'+
                 '</td>'+
                 '</tr>'         
            $("#add-importentTable tbody").append(newsManageTR);
            })
            //addimportBtn()
           
       
       
       // console.log(aaa);
        var fff = jaychou;
        $(".addimport-btn").on("click",function(){
            var getImportId = parseInt($(this).attr("data-id"));
            var improtentArr = [];
            improtentArr.push(getImportId);
            $.ajax({
             url:"/admincomm/insertcomminfo",
             data:{
                  "metid":improtentArr
             },
             beforeSend:function(){
                if(fff){
                    for(var a1 of fff){
                        if(getImportId==a1.metting_id){
                            layer.msg('提交重复', {
                                icon: 1,
                                time: 1000
                              });
                           return false;
                          }
                    }
                }
                
             },
             success:function(data){
                 if(data.msg== "SUCCESS"){
                    layer.msg('成功提交', {
                        icon: 1,
                        time: 1000
                      });
                      $("#add-importent").click();
                 }else{
                    layer.msg('您的操作有误', {
                        icon: 1,
                        time: 1000
                      });
                 }
               
             }
         })
           // console.log(improtentArr);
            //   $.get("/admincomm/selectcomminfo",function(result){
            //       if(result){
            //          for(var obj1 of result){
            //              for(obj2 of obj1){
            //                  console.log(obj2.metting_id)
            //                  console.log(typeof(obj2.metting_id))//number
            //                  console.log(typeof(getImportId))//string
            //                  if(getImportId===obj2.metting_id){
            //                      alert("一样的")
            //                  }else{
            //                     improtentArr.push(getImportId);
            //                      alert("no"+improtentArr);
            //                  }
            //              }
            //          }
            //       }else{
            //            alert("没有数据")
            //       }
            //   })
         })
      
        }         
    });
    });
}
        //内容管理
        $("#add-importentManage").on("click",function(){
            
             var  addImportentManage =  '<div class="news-box"><div class="news-title">'+
             '<h2>内容管理</h2>'+
             '</div>'+
             '<div class="news-content">'+
             '<table class="table-box table-sort " id="importManageTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">标题</th>'+
             '   <th style="text-align: center;">内容</th>'+
             '    <th style="text-align: center;">图片</th>'+
             '    <th style="text-align: center;">时间</th>'+
             '    <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '   <tbody>'+
            
             '  </tbody>'+
             '   </table>'+
             '</div></div>'
         $(".news-box").remove();
         $(".main-right").append(addImportentManage);
         $.ajax({
             url:"/admincomm/selectcomminfo",
             cache:false,
             success:function(data){
                 $.each(data,function(idx,element){
                 //     console.log(idx);
                 //    console.log(element);
                 idx+=1;
                    $.each(element,function(i,ele){
                
                     // console.log(index);
                     // console.log(element.metting_topic);
                     var  newsManageTR =  '<tr class="metting">'+
                      '<td>'+idx+'</td>'+
                      '<td>'+ele.metting_topic+'</td>'+
                      '<td>'+ele.metting_Summary+'</td>'+
                      '<td><img src="'+ele.metting_imageUrl+'"/></td>'+
                      '<td>'+ele.metting_startTime+'</td>'+
                      '<td >'+
                      //'<button class="btn btn-danger">修改</button>'+
                      '<button  data-id="'+ele.metting_id+'"    class="delImport-btn btn btn-primary">删除</button>'+
                      '</td>'+
                      '</tr>'         
                 $("#importManageTable tbody").append(newsManageTR);
                    })
                    $(".delImport-btn").on("click",function(){
                        var _that = $(this);
                        var delImportId = $(this).attr("data-id");
                        $.ajax({
                            url:"/admincomm/dellcomminfo",
                            data:{
                                "metid":delImportId
                            },
                            success:function(data){
                              if(data.msg=="删除成功"){
                                _that.parent().parent().remove();
                            // $("#add-importentManage").click();
                              }
                            }
                        })
                    })
                 })
             }
         })
     
         })
    //大会简介
    $("#meeting-synopsis").on("click",function(){
        $(".upUserMsg").css("display","none");
        var meetingSynopsisHtml = '<div class="news-box"><div class="news-title">'+
          //  ' <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal">添加</button>'+
                '<h2>大会简介</h2>'+
        '</div>' +
            '<div class="news-content">' +
           ' <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
           ' <ul class="layui-tab-title">' +
           ' <li class="layui-this">大会简介</li>' +
           ' <li>简介提交</li>' +
           ' </ul>' +
           ' <div class="layui-tab-content" style="height: 100px;">' +
           ' <div class="layui-tab-item layui-show">'+
           '<table class="table-box table-sort " id="getMeetingTable">'+
           '<thead>'+
           '  <tr >'+
         //  '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
         '   <th style="text-align: center;">标题</th>'+
           '   <th style="text-align: center;">时间</th>'+
           '   <th style="text-align: center;">地点</th>'+
           '    <th style="text-align: center;">价格</th>'+
           '    <th style="text-align: center;">内容</th>'+
           '    <th style="text-align: center;">操作</th>'+
           '  </tr>'+
           '   </thead>'+
           '   <tbody>'+
           '  </tbody>'+
           '   </table>'+
           '</div>' +
           ' <div class="layui-tab-item">'+
                    '<form class="layui-form" >' +
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">标题</label>' +
                            '<div class="layui-input-block">' +
                            '<input type="text" name="title" id="meetingTitle" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入主题" class="layui-input">' +
                            // '<button class="layui-btn layui-btn-primary layui-btn-sm" >' +
                            //  '<i class="layui-icon">f</i>'+
                            // '</button>'+
                             //   '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">时间</label>' +
                            '<div class="layui-input-block">' +
                            '<input type="text" id="meetingDate" class="layui-input" id="meeting" style=" width: 308px; float: left;" placeholder=" - ">' +
                            //'<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>'+
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">地点</label>' +
                            '<div class="layui-input-block">' +
                                '<input type="text" id="meetingSite" name="title" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入地点" class="layui-input">' +
    
                               // '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>'+
                        '<div class="layui-form-item">' +
                            '<label class="layui-form-label">价格</label>' +
                                '<div class="layui-input-block">' +
                                '<input type="text" name="title" id="meetingPrice" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入价格" class="layui-input">' +
    
                              //  '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                                    '</div>' +
                        '</div>'+
                      
                    '<div class="layui-form-item">' +
                        '<label class="layui-form-label">内容</label>' +
                        '<div class="layui-input-block">' +
                '<textarea placeholder="请输入内容" class="layui-textarea" id="metingContent"></textarea>'+
                        '</div>' +
                    '</div>'+
                '<div class="layui-form-item">'+
                '<div class="layui-input-block">'+
                '<button id="upMeetingMsg-btn" class="layui-btn" >立即提交</button>'+
            //  '<button class="layui-btn layui-btn-primary " ><i class="layui-icon"></i></button>'+
                ' <button type="reset" class="layui-btn layui-btn-primary">重置</button>'+
                ' </div>'+
                ' </div>'+
                '</form>'+
                '</div>' +
           ' </div>' +
           ' </div> ' +
                '</div>'+
            '</div>'
        $(".news-box").remove();
        $(".main-right").append(meetingSynopsisHtml);
        laydate.render({
            elem: '#meetingDate'
            ,type: 'datetime'
            ,range: true
        });
        //获取大会简介接口
        var meetingInfoNum;
       $.ajax({
           url:"/adminIntroductionInfo/select",
           success:function(data){
                meetingInfoNum = data.length;
               if(meetingInfoNum != 0){
                var  getMeetingInfoHtml =  '<tr>'+
                '   <td>'+data[0].topic+'</td>'+
                '   <td>'+data[0].time+'</td>'+
                '   <td>'+data[0].address+'</td>'+
               
                '   <td>'+data[0].money+'</td>'+
                '<td>'+data[0].Introduction+'</td>'+
                '<td ><button id="delMeetingTable" data-title="'+data[0].topic+'" class="btn btn-primary">删除</button></td>'+
                '   </tr>'
                $("#getMeetingTable tbody").append(getMeetingInfoHtml);
               }else{
                $("#getMeetingTable").html("<h2>暂无内容</h2>");
               }
             
           }
       })
       $("#getMeetingTable").on("click","#delMeetingTable",function(){
           var meetingTableTitle = $(this).attr("data-title");
           var TableMeetingTrDel = $(this);
           $.ajax({
               url:"/adminIntroductionInfo/dell",
               data:{
                   "topic":meetingTableTitle
               },
               success:function(data){
                      console.log(data);
                      TableMeetingTrDel.parent().parent().remove();
               } 
           })
       })
       //提交大会简介信息
        $("#upMeetingMsg-btn").on("click",function(){
          
            if($("#meetingTitle").val()==""||$("#meetingDate").val()==""||$("#meetingSite").val()==""||$("#meetingPrice").val()==""||$("#metingContent").val()==""){
                layer.msg('您的输入内容不能为空', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
               }
               var meetingTitle = $("#meetingTitle").val();
               var meetingDate = $("#meetingDate").val();
               var meetingSite = $("#meetingSite").val();
               var meetingPrice = $("#meetingPrice").val();
               var meetingContent = $("#metingContent").val();
               if(meetingInfoNum == 0){
              $.ajax({
               async:true,
               type:"get",
               url:"/adminIntroductionInfo/add",
               
               data:{
                   "topic":meetingTitle,
                   "time":meetingDate,
                   "address":meetingSite,
                   "Introduction":meetingContent,
                   "money":meetingPrice
               },
               success:function(result){
                   alert(JSON.stringify(result));
                   $("#meeting-synopsis").click();
               }
           })
               }else{
                layer.msg('您的大会简介只能有一条', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
               }
        })  
    });

    //大会日程
    $("#meeting-schedule").click(function(){
        var meetingSchecduleHtml = '<div class="news-box"><div class="news-title">'+
           // ' <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal2">添加日程</button>'+
                '<h2>大会日程</h2>'+
            '</div>'+
            '<div class="news-content" >' +
           '<div class="layui-tab">'+
            '<ul class="layui-tab-title">' +
                '<li class="layui-this">26日</li>' +
                '<li>27日</li>' +
                '<li>28日</li>' +
                '<li>29日</li>' +
                '<li>30日</li>' +
            '</ul>' +
        ' <div class="layui-tab-content" id="mymodal-Box">' +
                '<div class="layui-tab-item layui-show" >' +
                '<button style="margin:10px 0px;" id="my26modal"  class="layui-btn layui-btn-normal">添加26号日期</button>'+     
                        '<table class="table-box table-sort " id="get26table">'+                                   
                        '<thead>'+
                            '  <tr >'+
                            '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                            '<th style="text-align: center;">时间段</th>'+
                            '<th style="text-align: center;">人物</th>'+
                            '<th style="text-align: center;">内容</th>'+
                            '<th style="text-align: center;">操作</th>'+
                            '  </tr>'+
                        '   </thead>'+
                        '   <tbody>'+
                          
                        '  </tbody>'+
                        '   </table>'+
                        //提交

                '</div>' +

                //27table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my27modal" class="layui-btn layui-btn-normal">添加27号日期</button>'+     
            '<table class="table-box table-sort " id="get27table">'+
            '<thead>'+
            '  <tr >'+
            '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
            '<th style="text-align: center;">时间段</th>'+
            '<th style="text-align: center;">人物</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th style="text-align: center;">操作</th>'+
            '  </tr>'+
            '   </thead>'+
            '   <tbody id="adddate27">'+
            
            '  </tbody>'+
            '   </table>'+
            //提交
     
                '</div>'+
                 //28table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my28modal"  class="layui-btn layui-btn-normal">添加28号日期</button>'+     
                '<table class="table-box table-sort " id="get28table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">人物</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            '   </table>'+
           
                '</div>' +
                 //29table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my29modal"  class="layui-btn layui-btn-normal">添加29号日期</button>'+     
                '<table class="table-box table-sort " id="get29table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">人物</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            //提交        
                '</div>' +
                 //30table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my30modal"  class="layui-btn layui-btn-normal">添加30号日期</button>'+     
                '<table class="table-box table-sort " id="get30table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">人物</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            //提交
               '</div>' +
            '</div>' +
        '</div>' +
            '</div>'+
            '</div></div>';
        //$(".news-box").remove();
        $(".main-right").html(meetingSchecduleHtml);
        getdateTable2(26);
        getdateTable2(27);
        getdateTable2(28);
        getdateTable2(29);
        getdateTable2(30);
       //修改
        getMsgmodification(26);
        getMsgmodification(27);
        getMsgmodification(28);
        getMsgmodification(29);
        getMsgmodification(30);
     
        //修改26号接口
    //     $("#get26table").on("click",".get26modification",function(){
    //         var modification26content = $(this).attr("data-content");
    //         var modification26time   = $(this).attr("data-time");
    //         var modification26Id  = $(this).attr("data-timeId");
    //         console.log(modification26content + modification26time);
    //         layer.open({
    //            type: 1,
    //            title:'2016-06-26',
    //            closeBtn: 1, //不显示关闭按钮
    //            area: ['600px', '300px'],
    //            fixed: false, //不固定
    //            maxmin: true,
    //            content: '<div class="" class="modification26">'+
    //                      //  '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
    //                     '<div>'+
    //                     ' <table class="table-box table-sort " id="modification26">'+
    //                     '<thead>'+
    //                     '<tr >'+	       
                  
    //                       '  <th style="text-align: center;">时间</th>'+
    //                        '<th style="text-align: center;">内容</th>'+
    //                     '</tr>'+
    //                     '</thead>'+	
    //                     '<tbody>'+   
    //                     '<tr>'+                    
    //                     '  <td style="text-align: center;"><input type="text" id="modificationValue" value="'+modification26time+'" name="title" lay-verify="title" autocomplete="off" placeholder="请输入时间" class="layui-input"></td>'+
    //                     '<td style="text-align: center;"><input type="text" id="modificationContentValue" value="'+modification26content+'" placeholder="请输入大会内容" class="layui-input"></td>'+
    //                     '</tr>'+ 
    //                     '</tbody>'+	     
    //                         '</table>'+
    //                         '<button class="layui-btn sub26modification" data-timeId="'+modification26Id+'" style="float:right;margin-top:20px;margin-right:30px;">提交</button>'+
    //                     '</div>'+
    //                   '</div>'
    //          });
    //          $(".sub26modification").on("click",function(){
    //              var sub26modificationTimeValue =  $("#modificationValue").val();
    //              var sub26modificationContentValue = $("#modificationContentValue").val();
    //              var sub26modificationTimeId  = $(this).attr("data-timeId");
    //              $.ajax({
    //                 url:"/adminschedule/updatadaninfo",
    //                  data:{
    //                     "ID":sub26modificationTimeId,
    //                     "dan":sub26modificationTimeValue,
    //                     "concent":sub26modificationContentValue
    //                  },
    //                  success:function(data){
    //                      if(data){
    //                         layer.msg('添加成功', {
    //                             icon: 1,
    //                             time: 1000
    //                             });
    //                             layer.closeAll();
    //                             $("#meeting-schedule").click();
    //                      }else{
    //                         layer.msg('您的修改内容有误', {
    //                             icon: 1,
    //                             time: 1000
    //                             });
    //                      }
    //                  }
    //              })
    //          })
    //    })
       delTrdate(26);
       delTrdate(27);
       delTrdate(28);
       delTrdate(29);
       delTrdate(30);
        // $("#get26table").on("click","#delTrTime",function(){
        //     var TRtimeId = $(this).attr("data-timeId");
        //     var delTrTimeThis = $(this);
        //     console.log(TRtimeId);
        //     $.ajax({
        //         url:"/adminschedule/delltimeId",
        //         data:{
        //            "ID":TRtimeId
        //         },
        //         success:function(data){
        //             if(data.msg == "SUCCESS"){
        //                 delTrTimeThis.parent().parent().remove();
        //             }
                  
        //         }
        //     })
        //    })
        //26号日期点击事件
    $("#mymodal-Box").on("click","#my26modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-26',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" id="show26">'+
                        '<button class="layui-btn" id="mymodal26-addDate">增加时段</button>'+
                     '<div>'+
                     ' <table class="table-box table-sort " id="modal-addTable">'+
                     '<thead>'+
                     '<tr >'+	       
                  //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                       '  <th style="text-align: center;">时间</th>'+
                       '<th style="text-align: center;">人物</th>'+
                        '<th style="text-align: center;">内容</th>'+
                        '<th>操作</th>'+
                     '</tr>'+
                     '</thead>'+	
                     '<tbody><tr><td><input type="text" class="layui-input date26" id="modol26date" placeholder="HH:mm:ss"></td>'+
                     '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入人物" class="layui-input date26-characterval"></td>'+
                                  '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date26-val"></td>'+
                                 '<td><button class="layui-btn" id="updateTable26" data-id="26" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                                 '</tr></tbody>'+	     
                         '</table>'+
                       
                     '</div>'+
                   '</div>'
          });
          //时间选择器
          laydate.render({
            elem: '#modol26date'
            ,type: 'time'
        });   
        //提交日期内容
        addDateTable(26);
    //     $("#show26").on("click",'#updateTable26',function(){
    //         var time26_val  = $('#modol26date').val();
    //         var content_val = $('.date26-val').val();
    //         console.log(time26_val + content_val);
    //         $.ajax({
    //             url:"/adminschedule/addschedule",
    //             data:{
    //                 "content":content_val,
    //                 "days":"26",
    //                 "dan":time26_val
    //             },
    //             success:function(data){
    //                 layer.msg('添加成功', {
    //                     icon: 1,
    //                     time: 1000
    //                     });
    //                     layer.closeAll();
    //                     $("#meeting-schedule").click();
    //             },error:function(err){
    //                    console.log(err)
    //             }
    //         })
    //   })    
       //   var datanumAdd = 0;
        //   $("#show26").on("click","#mymodal26-addDate",function(){
        //     datanumAdd++;
        //     var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input date26" id="modol26date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
        //                           '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date26-val'+datanumAdd+'"></td>'+
        //                           '<td><button class="layui-btn" id="updateTable26'+datanumAdd+'" data-id="26" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
        //                         '</tr>';
        //     $("#modal-addTable tbody").append(addModalDate);
       
        // })
    })
    //27号添加事件
    $("#mymodal-Box").on("click","#my27modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-27',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" id="show27">'+
                     //   '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
                     '<div>'+
                     ' <table class="table-box table-sort " id="modal-addTable">'+
                     '<thead>'+
                     '<tr >'+	       
                    // '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                     '  <th style="text-align: center;">时间</th>'+
                       '  <th style="text-align: center;">人物</th>'+
                        '<th style="text-align: center;">内容</th>'+
                     '</tr>'+
                     '</thead>'+	
                     '<tbody><tr><td><input type="text" class="layui-input date26" id="modol27date" placeholder="HH:mm:ss"></td>'+
                     '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入人物" class="layui-input date27-characterval"></td>'+
                     '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date27-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable27" data-id="27" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                        '</tr></tbody>'+	     
                     '</table>'+
                     '</div>'+
                   '</div>'
          });
          //时间选择器
                    laydate.render({
                  elem: '#modol27date'
                  ,type: 'time'
              });  
              //添加table
              addDateTable(27);
        //       $("#show27").on("click",'#updateTable27',function(){
        //         var time27_val  = $('#modol27date').val();
        //         var content_val = $('.date27-val').val();
                
        //         console.log(time27_val + content_val);
        //         $.ajax({
        //             url:"/adminschedule/addschedule",
        //             data:{
        //                 "content":content_val,
        //                 "days":"27",
        //                 "dan":time27_val
        //             },
        //             success:function(data){
        //                 layer.msg('添加成功', {
        //                     icon: 1,
        //                     time: 1000
        //                     });
        //                     layer.closeAll();
        //                     $("#meeting-schedule").click();
        //             },error:function(err){
        //                    console.log(err)
        //             }
        //         })
        //   })  

        
     //     var datanumAdd = 0;
    //       $("#show27").on("click","#mymodal27-addDate",function(){
    //         datanumAdd++;
    //         var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input" id="modol27date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
    //                               '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input"></td>'+
    //                             '</tr>';
    //         $("#modal-addTable tbody").append(addModalDate);
    //    //时间选择器
    //           laydate.render({
    //               elem: '#modol27date'+datanumAdd+''
    //               ,type: 'time'
    //           });       
    //     })
    })
    //28号添加事件
    $("#mymodal-Box").on("click","#my28modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-28',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show28">'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
           '  <th style="text-align: center;">人物</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date28" id="modol28date" placeholder="HH:mm:ss"></td>'+
         '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入人物" class="layui-input date28-characterval"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date28-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable28" data-id="28" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });
            //时间选择器
            laydate.render({
                elem: '#modol28date'
                ,type: 'time'
            });  
            addDateTable(28);
    //       var datanumAdd = 0;
    //       $("#show28").on("click","#mymodal28-addDate",function(){
    //         datanumAdd++;
    //         var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input" id="modol28date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
    //                               '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input"></td>'+
    //                             '</tr>';
    //         $("#modal-addTable tbody").append(addModalDate);
    //    //时间选择器
    //           laydate.render({
    //               elem: '#modol28date'+datanumAdd+''
    //               ,type: 'time'
    //           });       
    //     })
    })
    //29号添加事件
    $("#mymodal-Box").on("click","#my29modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-29',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show29">'+
           // '<button class="layui-btn" id="mymodal29-addDate">增加时段</button>'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
           '  <th style="text-align: center;">人物</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date29" id="modol29date" placeholder="HH:mm:ss"></td>'+
         '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入人物" class="layui-input date29-characterval"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date29-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable29" data-id="29" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });      
       //时间选择器
              laydate.render({
                  elem: '#modol29date'
                  ,type: 'time'
              });    
              addDateTable(29);
    })
    //30号添加事件
    $("#mymodal-Box").on("click","#my30modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-30',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show30">'+
            //2'<button class="layui-btn" id="mymodal30-addDate">增加时段</button>'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
           '  <th style="text-align: center;">人物</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date30" id="modol30date" placeholder="HH:mm:ss"></td>'+
         '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入人物" class="layui-input date30-characterval"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date30-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable30" data-id="30" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });
     //时间选择器
     laydate.render({
        elem: '#modol30date'
        ,type: 'time'
    });    
    addDateTable(30);
    })
    })
    // $("#tlist-btn1").on("click",function(){
    //     var listHtml1= '<tr>'+
    //         '<td><input type="text" value="09:00"  class="ipt-center form-control"></td>'+
    //         '<td><input type="text" value="第二十九届国际智能大会开幕智能汽车跨界融合高峰科技论坛开幕" class="form-control"></td>'+
    //         '</tr>'
    //     $("tbody").append(listHtml1);
    // })

    //订单管理
    $("#meeting-order").on("click",function(){
        var meetingOrderHtml = '<div class="news-box">' +
        '<div class="news-title">'+
           ' <h2>订单管理</h2>'+
        '</div>'+
         '<div class="news-content">' +
         '<table class="table-box  table-sort" id="orderTable">'+
         '<thead>'+
         '<tr >'+
         '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
         '<th style="text-align: center;">名称</th>'+
         '<th style="text-align: center;">开始时间</th>'+
         '<th style="text-align: center;">结束时间</th>'+
         '<th style="text-align: center;">金额</th>'+
         '<th style="text-align: center;">状态</th>'+
         '<th style="text-align: center;">电话</th>'+
         '<th style="text-align: center;">编号</th>'+
         '</tr>'+
         '</thead>'+
         '</table>'+
         '</div>' +
     '</div>'
//$(".news-box").remove();
$(".main-right").html(meetingOrderHtml);
langShow();
  url:"/adminorder/selectorderList",
 order_table = $('#orderTable').DataTable({
    "language": lang, //提示信息
    "autoWidth": true, //自适应宽度，
    "lengthMenu": [10, 50, 100],
    "stripeClasses": ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
    "searching": true, //是否允许Datatables开启本地搜索
    "paging": true, //是否开启本地分页
    "lengthChange": true, //是否允许产品改变表格每页显示的记录数
    "info": true, //控制是否显示表格左下角的信息
    //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
    "order": [0, 'asc'], //asc升序   desc降序
    'draw':false,//刷新页面
    "aoColumnDefs": [{
        "orderable": false,
        "aTargets": [1,2,3,4] // 指定列不参与排序
    }],
    "deferRender": true, //延迟渲染
    //  "ajax": "config/getCategory.do?status=-1"+"&page="+pageNow+"&size=1000", //数据的路径
    // url: "config/getKeyword.do?status=-1"+"&page="+pageNow+"&rowcount=10",
    ajax:{
        url:"/adminorder/selectorderList",
        success:function(data){
           if(data.length!=0){
            $('#orderTable').dataTable().fnAddData(data);
           }else{
               alert("订单列表为空")
           }
            
        } 
    },
    
    "columns": [{
        "data":"riwso",
        "render":function(data,type,full,meta){

            return (meta.row+1)//序号
        }
    }, {
        "data": function(obj){
     //       return '<span id="adminIdinfo">' + obj.keyword + '</span>';
            return '<span id="adminIdinfo" class="category_cursor"  >' + obj.order_tname + '</span>';
        }

    }, {
        //"data":"media_id"
        "data":function(obj){
            return '<span id="adminIdinfo" class="category_cursor"  >' + obj.order_starttime + '</span>'; 
        }
    } ,{
        "data": function(obj) {
            return '<span  >' + obj.order_endtime + '</span>'; 
        },
    } ,{
        "data": function(obj) {
            return '<span  >￥' + obj.order_total + '</span>'; 
        },
    },{
        "data":function(obj){//data-toggle="modal" data-target="'+'#'+obj.keyword_id+'"
        if(obj.order_status==1){
            return "已支付"
        }else if(obj.order_status==0){
            return  "未支付"
        }
        return '<span  >' + obj.order_status + '</span>'; 
        },
    },{
        "data":function(obj){//data-toggle="modal" data-target="'+'#'+obj.keyword_id+'"
             return '<span  >' + obj.order_phone + '</span>'; 
        }
    },{
        "data":function(obj){//data-toggle="modal" data-target="'+'#'+obj.keyword_id+'"
             return '<span  >' + obj.order_Num + '</span>'; 
        }
    }]
    })
})
    //订单管理
    //票种管理
    $("#meeting-manage").click(function(){
        var meetingGuestHtml = '<div class="news-box">' +
        '<div class="news-title">'+
           ' <h2>票种管理</h2>'+
        '</div>'+
         '<div class="news-content">' +
              '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
                   '<ul class="layui-tab-title">' +
                     '<li class="layui-this">大会票种</li>' +
                     '<li id="ticket-tab">大会票种管理</li>' +
                   ' </ul>' +
                 '  <div class="layui-tab-content" style="height: 100px;">' +
                 
                     '<div class="layui-tab-item layui-show">' +
                     '<form id="ticketData"  method="post" enctype="multipart/form-data">'+
        
                     '<div class="layui-form-item">'+
                     '<label class="layui-form-label">票名</label>'+//ticket-name
                     '<div class="layui-input-block">'+
                    // '<input type="text" name="ticket-name" lay-verify="title" autocomplete="off" placeholder="请输入票名" class="layui-input">'+
                    '<select class="select_ticket"  lay-verify="">'+
                    '<option value="half">workshop标准票(半天)</option>'+
                    '<option value="allday" >workshop标准票(全天)</option>'+
                    '<option value="novip" >主会议标准票(非会员)</option>'+
                    '<option value="vip" >主会议标准票(会员)</option>'+
                    '<option value="madia" >特邀媒体</option>'+
                    '<option value="gust" >特邀嘉宾</option>'+
                    '<option value="stu" >主会议标准票(学生)</option>'+
                    '<option value="half">workshop现场票(半天)</option>'+
                    '<option value="allday" >workshop现场票(全天)</option>'+
                    '<option value="novip" >主会议现场票(非会员)</option>'+
                    '<option value="vip" >主会议现场票(会员)</option>'+
                    '<option value="stu" >主会议现场票(学生)</option>'+
                    '<option value="novip" >赞助商专供</option>'+
                     '</select>'+
                     '</div>'+
                     '</div>'+
                     
                     '<div class="layui-form-item">'+
                     '<label class="layui-form-label">价格</label>'+
                     '<div class="layui-input-block">'+//ticket-price
                     '<input type="text" name="ticket-price" lay-verify="title" autocomplete="off" placeholder="请输入价格" class="layui-input">'+
                     '<div class="sub_pwdErr" style="width:330px;height:12px;line-height:12px;color:red;"></div>'+
                     '</div>'+
                     '</div>'+
                     
                     '<div class="layui-form-item">'+
                     '<label class="layui-form-label">说明</label>'+//ticket-info
                     '<div class="layui-input-block">'+
                     '<input type="text" name="ticket-info" lay-verify="title" autocomplete="off" placeholder="请输入备注说明" class="layui-input">'+
                     '</div>'+
                     '</div>'+

                      '<div class="layui-form-item" >'+
                       '<label class="layui-form-label">状态</label>'+
                     '<div class="layui-input-block">'+
                     //'<span>状态&nbsp;&nbsp;&nbsp;</span>' +ticket-statusticket-status
                     '<label>' +
                     '<input type="radio" name="ticket-status" id="" value="0" checked>抢票中' +
                     '</label>	' +									
                     '<label>' +
                     '<input type="radio" name="ticket-status" id="" value="1">未开始' +
                     '</label>' +
                      '</div>'+
                      '</div>'+
                      '<div class="news-btn date-style">'+
                      '<input id="upTicket-btn" type="button" class="btn btn-danger" value="发表"/>'+
                      '</form>'+
                      '</div>'+
                     '</div>' +
                     //全部嘉宾
                 '  <div class="layui-tab-item">'+
                 '<table class="table-box table-sort " id="ticketTable">'+
                 '<thead>'+
                 '  <tr >'+
                 '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                 '   <th style="text-align: center;">票名</th>'+
                 '   <th style="text-align: center;">价格</th>'+
                 '   <th style="text-align: center;">信息</th>'+
                 '   <th style="text-align: center;">状态</th>'+
                 '    <th style="text-align: center;">操作</th>'+
                 '  </tr>'+
                 '   </thead>'+
                 '<tbody></tbody>'+
                 '   </table>'+
                 '</div>' +
                 '   </div>' +
         '     </div>' +
         '</div>' +
     '</div>'
//$(".news-box").remove();
$(".main-right").html(meetingGuestHtml);
$("input[name='ticket-price']").bind('input propertychange',function(){
    var priceErrVal = $(this).val();
    var regPrice = new RegExp("^[0-9]*$");
    if(!regPrice.test(priceErrVal)){
        $('.sub_pwdErr').html("请您输入数字");
    }else{
        $('.sub_pwdErr').html("");
    }
    //console.log(val);
      
})

    $.ajax({
        url:"/adminticket/selectticketInfo",
        success:function(data){
            $.each(data,function(idx,element){
                
                idx+=1;
                if(element.ticket_status==0){
                    element.ticket_status =  "抢票中";
                }else if(element.ticket_status == 1){
                    element.ticket_status =  "未开始";
                }else{
                    element.ticket_status = "不确定";
                }
                const ticketHtml = '<tr ><td>'+idx+'</td><td>'+element.ticket_mark+'</td><td>'+element.ticket_price+'</td><td>'+element.ticket_details+'</td><td>'+element.ticket_status+'</td>'+
                '<td><button data-id="'+element.ticket_id+'"  class="layui-btn ticket-del"><i class="layui-icon"></i></button>'+
                '<button data-id="'+element.ticket_id+'" data-type="'+element.ticket_type+'"  data-status="'+element.ticket_status+'" data-info="'+element.ticket_details+'" data-price="'+element.ticket_price+'" class="layui-btn ticket-modify"><i class="layui-icon"></i></button></td></tr>';
               
                $("#ticketTable tbody").append(ticketHtml);
            })
        //删除票种
            $(".ticket-del").on("click",function(){
                const ticketDelId = $(this).attr("data-id");
                $.ajax({
                    url:"/adminticket/dellticketInfo",
                    data:{
                        "ticketID":ticketDelId
                    },
                    success:function(data){
                        if(data.msg=="删除成功"){
                            layer.msg('您已经删除成功', {
                                icon: 1,
                                time: 1000
                                });
                                $("#meeting-manage").click(); 
                        }else{
                            layer.msg('您的删除失败', {
                                icon: 1,
                                time: 1000
                                });
                        }
                    }
                })
            })
//修改 接口 
          $(".ticket-modify").on("click",function(){
            var  ticketModifyId = $(this).attr("data-id");
            var  ticketModifyName = $(this).attr("data-type");
            var  ticketModifyPrice = $(this).attr("data-price");
            var  ticketModifStatus = $(this).attr("data-status");
            var ticketModifInfo = $(this).attr("data-info");
            if(ticketModifStatus == "抢票中"){
                ticketModifStatus = 0 
            }else if(ticketModifStatus == "未开始"){
                ticketModifStatus = 1
            }
            layer.open({
                type: 1,
                title:'修改',
                closeBtn: 1, //不显示关闭按钮
                area: ['600px', '500px'],
                fixed: false, //不固定
                maxmin: true,
                content:  '<div class="tiketEdit" >'+
                //2'<button class="layui-btn" id="mymodal30-addDate">增加时段</button>'+
             '<div>'+
             '<div class="layui-form-item">'+
             '<label class="layui-form-label">票名</label>'+//ticket-name
             '<div class="layui-input-block">'+
          //   '<input type="text" name="ticketEdit-name" lay-verify="title" value="'+ticketModifyName+'" autocomplete="off" placeholder="请输入票名" class="layui-input">'+select_ticket
                        '<select class="select_editTicket"  lay-verify="">'+
                        '<option value="half">workshop标准票(半天)</option>'+
                        '<option value="allday" >workshop标准票(全天)</option>'+
                        '<option value="novip" >主会议标准票(非会员)</option>'+
                        '<option value="vip" >主会议标准票(会员)</option>'+
                        '<option value="madia" >特邀媒体</option>'+
                        '<option value="gust" >特邀嘉宾</option>'+
                        '<option value="stu" >主会议标准票(学生)</option>'+
                        '<option value="half">workshop现场票(半天)</option>'+
                        '<option value="allday" >workshop现场票(全天)</option>'+
                        '<option value="novip" >主会议现场票(非会员)</option>'+
                        '<option value="vip" >主会议现场票(会员)</option>'+
                        '<option value="stu" >主会议现场票(学生)</option>'+
                        '<option value="novip" >赞助商专供</option>'+
                        '</select>'+
             '</div>'+
             '</div>'+
             
             '<div class="layui-form-item">'+
             '<label class="layui-form-label">价格</label>'+
             '<div class="layui-input-block">'+//ticket-price
             '<input type="text" name="ticketEdit-price" lay-verify="title" autocomplete="off" value="'+ticketModifyPrice+'" placeholder="请输入价格" class="layui-input">'+
             '<div class="sub_pwdErr" style="width:330px;height:12px;line-height:12px;color:red;"></div>'+
             '</div>'+
             '</div>'+
             
             '<div class="layui-form-item">'+
             '<label class="layui-form-label">说明</label>'+//ticket-info
             '<div class="layui-input-block">'+
             '<input type="text" name="ticketEdit-info" lay-verify="title" value="'+ticketModifInfo+'" autocomplete="off" placeholder="请输入备注说明" class="layui-input">'+
             '</div>'+
             '</div>'+

              '<div class="layui-form-item" >'+
               '<label class="layui-form-label">状态</label>'+
             '<div class="layui-input-block">'+
             //'<span>状态&nbsp;&nbsp;&nbsp;</span>' +ticket-statusticket-status
             '<label>' +
             '<input type="radio" name="ticketEdit-status" id="" value="0" >抢票中' +
             '</label>	' +									
             '<label>' +
             '<input type="radio" name="ticketEdit-status" id="" value="1">未开始' +
             '</label>' +
              '</div>'+
              '</div>'+
              '<div class="news-btn date-style">'+
              '<input id="ticketEdit-btn" type="button" data-id="'+ticketModifyId+'" class="btn btn-danger" value="发表"/>'+
               
             '</div>'+
           '</div>'
              });
              $("input[name='ticketEdit-price']").bind('input propertychange',function(){
                var priceErrVal = $(this).val();
                var regPrice = new RegExp("^[0-9]*$");
                if(!regPrice.test(priceErrVal)){
                    $('.sub_pwdErr').html("请您输入数字");
                }else{
                    $('.sub_pwdErr').html("");
                }
                //console.log(val);
                  
            })
            $(".select_editTicket").val(ticketModifyName);
              $("input[name='ticketEdit-status']").each(function(){
                var warn_that = $(this);
                var warn_editVal = warn_that.val();
                  
                if(warn_editVal==ticketModifStatus){
                    warn_that.attr("checked", true);
                }
            })
        
              $(".tiketEdit").on("click","#ticketEdit-btn",function(){
                  var tiketEditID = $(this).attr("data-id");
               var tiketEditName = $(".select_editTicket").val();
               var tiketEditMark = $(".select_editTicket").find("option:selected").text();
               var tiketEditPrice = $("input[name='ticketEdit-price']").val();
               var tiketEditInfo = $("input[name='ticketEdit-info']").val();
               var ticketEditStatus =  $("input[name='ticketEdit-status']:checked").val();
    	     // console.log(tiketEditMark+"id"+tiketEditID + "票名"+tiketEditName + "票价"+tiketEditPrice + "信息"+tiketEditInfo + "状态"+ticketEditStatus)
            $.ajax({
                url:"/adminticket/updataticketInfo",
                data:{
                    "ticketID":tiketEditID,
                    "type":tiketEditName,
                    "mark":tiketEditMark,
                    "details":tiketEditInfo,
                    "price":tiketEditPrice,
                    "status":ticketEditStatus
                },
                success:function(data){
                    if(data.msg=="SUCCESS"){
                        layer.msg('您已经修改成功', {
                            icon: 1,
                            time: 1000
                            });
                            layer.closeAll();
                        $("#meeting-manage").click();    
                    }else{
                        layer.msg('您的修改失败', {
                            icon: 1,
                            time: 1000
                            });
                    }
                }
            })
              })
          
          })
        }        
    })
//提交票种管理
        $("#upTicket-btn").on("click",function(){
         //   const ticketName = $("input[name='ticket-name']").val();
            const ticketName = $(".select_ticket").val();
            const ticketMark = $(".select_ticket").find("option:selected").text();
            const ticketPrice = $("input[name='ticket-price']").val();
            const ticketInfo = $("input[name='ticket-info']").val();
            const ticketStatus =  $("input[name='ticket-status']:checked").val();
            if(ticketName==""||ticketPrice==""||ticketInfo==""||ticketStatus){
                layer.msg('您输入的内容为空', {
                    icon: 1,
                    time: 1000
                    });
            }
            //  alert(JSON.stringify(formData))
            $.ajax({
                url:"/adminticket/addticketInfo",
                type: "get",
                data:{
                    "type":ticketName,
                     "mark":ticketMark,
                    "details":ticketInfo,
                    "price":ticketPrice,
                    "status":ticketStatus
                },
                success:function(data){
                    if(data.msg == "售票信息上传成功"){
                        layer.msg('您已经成功提交', {
                            icon: 1,
                            time: 1000
                            });

                      $("#meeting-manage").click();  
                    }else{
                        alert("出错")
                    }
                }

            })
        })
    })

    //大会嘉宾
    $("#meeting-guest").on("click",function(){
        var meetingGuestHtml = '<div class="news-box">' +
                                   '<div class="news-title">'+
                                      ' <h2>大会嘉宾</h2>'+
                                   '</div>'+
                                    '<div class="news-content">' +
                                         '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
                                              '<ul class="layui-tab-title">' +
                                                '<li class="layui-this">大会嘉宾</li>' +
                                                '<li>大会嘉宾管理</li>' +
                                              ' </ul>' +
                                            '  <div class="layui-tab-content" style="height: 100px;">' +
                                            
                                                '<div class="layui-tab-item layui-show">' +
                                                '<form id="GuestsuploadForm"  method="post" enctype="multipart/form-data">'+
                                                '<div class="upImgBox">'+
                                                '<input id="upGuestImage" type="file" name="image3"  >'+//onchange="preview(this)"
                                                '<div id="preview"></div>'+
                                                '</div>'+
    
                                                '<div class="layui-form-item">'+
                                                '<label class="layui-form-label">姓名</label>'+
                                                '<div class="layui-input-block">'+
                                                '<input type="text" name="name" lay-verify="title" autocomplete="off" placeholder="请输入姓名" class="layui-input">'+
                                                '</div>'+
                                                '</div>'+
                                                
                                                '<div class="layui-form-item">'+
                                                '<label class="layui-form-label">职务</label>'+
                                                '<div class="layui-input-block">'+
                                                '<input type="text" name="job" lay-verify="title" autocomplete="off" placeholder="请输入职务" class="layui-input">'+
                                                '</div>'+
                                                '</div>'+
                                                
                                                 '<div class="layui-form-item" >'+
                                                  '<label class="layui-form-label">状态</label>'+
                                                //  '<div class="layui-input-block">'+
                                                //  '邀请中<input type="radio" name="sex" value="男" title="男" checked>'+
                                                //  '已确定<input type="radio" name="sex" value="女" title="女">'+
                                                //  '</div>'+
                                                '<div class="layui-input-block">'+
                                                //'<span>状态&nbsp;&nbsp;&nbsp;</span>' +
                                                '<label>' +
                                                '<input type="radio" name="status" id="optionsRadios1" value="1" checked>已确定' +
                                                '</label>	' +									
                                                '<label>' +
                                                '<input type="radio" name="status" id="optionsRadios2" value="2">邀请中' +
                                                '</label>' +
                                                 '</div>'+
                                                 '</div>'+
                                                 '<div class="news-btn date-style">'+
                                                 '<input id="uploadGuest" class="btn btn-danger" value="发表"/>'+
                                                 '</form>'+
                                                 '</div>'+
                                                '</div>' +
                                                //全部嘉宾
                                            '  <div class="layui-tab-item">'+
                                            '<table class="table-box table-sort " id="guestTable">'+
                                            '<thead>'+
                                            '  <tr >'+
                                            '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                                            '   <th style="text-align: center;">姓名</th>'+
                                            '   <th style="text-align: center;">照片</th>'+
                                            '   <th style="text-align: center;">职务</th>'+
                                            '   <th style="text-align: center;">状态</th>'+
                                            '    <th style="text-align: center;">操作</th>'+
                                            '  </tr>'+
                                            '   </thead>'+
                                            '<tbody></tbody>'+
                                            '   </table>'+
                                            '</div>' +
                                            '   </div>' +
                                    '     </div>' +
                                    '</div>' +
                                '</div>'
        $(".news-box").remove();
        $(".main-right").append(meetingGuestHtml);
        //上传大会简介
           $("#uploadGuest").on("click",function(){
            var image=$("#upGuestImage")[0].files[0];
            if($("input[name='name']").val()==""|| $("input[name='job']").val()==""||$("#upGuestImage").val()==""){
                layer.msg('您的输入内容不能为空', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
            }
            var formData = new FormData($( "#GuestsuploadForm" )[0]); 
          //  alert(JSON.stringify(formData))
            $.ajax({
                url:"/image/guestsInfo",
                data: formData,
                type: "POST",
                cache: false,
                processData: false,
                contentType:false,
                async: false,
                success:function(data){
                    if(data.msg == "嘉宾信息上传成功"){
                        layer.msg('您已经成功提交', {
                            icon: 1,
                            time: 1000
                          });
                        $("#meeting-guest").click();
                    }else{
                        alert("出错")
                    }
                }
    
            })  
           })
    
        $("#upGuestImage").on("change",function(){
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
        $.ajax({
            url:"/guests/selectguestsinfo",
            success:function(data){
                //var getGuestsHtml = ''
                var  guestsStatus = "";
                $(data).each(function(index,element){
                    index+=1;
                    if(element.guests_status==1){
                              guestsStatus = "已确定";
                    }else if(element.guests_status==2){
                        guestsStatus = "邀请中";
                    }else{
                        guestsStatus = "不确定";
                    }
                   // console.log(index);
                   // console.log(element.metting_topic);
                   var  getGuestsHtml =  '<tr class="metting">'+
                    '<td>'+index+'</td>'+
                    '<td>'+element.guests_name+'</td>'+
                    '<td><img src="'+element.guests_url+'" /></td>'+
                    '<td>'+element.guests_job+'</td>'+
                    '<td>'+guestsStatus+'</td>'+
                    '<td >'+
                    //'<button class="btn btn-danger">修改</button>'+
                    '<button id="delguestUser-btn" data-id="'+element.guests_id+'"    class="btn btn-primary">删除</button>'+
                    '</td>'+
                    '</tr>'         
               $("#guestTable tbody").append(getGuestsHtml);
               })
               //删除大会嘉宾接口
               $("#guestTable").on("click","#delguestUser-btn",function(){
                    var getGuestsID = $(this).attr("data-id");
                    var that = $(this);
                    $.ajax({
                        url:"/guests/dellguestsInfo",
                        data:{
                            "ID":getGuestsID
                        },
                        success:function(data){
                            that.parent().parent().remove();
                        }
                    })
            })
            }
        })
    })
       //合作单位btn
$("#meeting-cooperation").click(function(){
    var meetingGuestHtml = '<div class="news-box">' +
    '<div class="news-title">'+
       ' <h2>合作单位</h2>'+
    '</div>'+
     '<div class="news-content">' +
          '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
               '<ul class="layui-tab-title">' +
                 '<li class="layui-this">合作单位</li>' +
                 '<li>合作单位管理</li>' +
               ' </ul>' +
             '  <div class="layui-tab-content" style="height: 100px;">' +
             
                 '<div class="layui-tab-item layui-show">' +
                 '<form id="cooperationsuploadForm"  method="post" enctype="multipart/form-data">'+
                 '<div class="upImgBox">'+
                 '<input id="upcooperationImage" type="file" name="upimage"  >'+//onchange="preview(this)"
                 '<div id="preview"></div>'+
                 '</div>'+
                 ' <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">'+
                 '<legend>单位名称</legend>'+
               '</fieldset>'+
               '<div class="layui-form-item">'+
               '<label class="layui-form-label">名称</label>'+
               '<div class="layui-input-block">'+
               '<input type="text" name="companyname" lay-verify="title" autocomplete="off" placeholder="请输入名称" class="layui-input">'+
               '</div>'+
               '</div>'+
               
               '<div class="layui-form-item">'+
               '<label class="layui-form-label">类型</label>'+
               '<div class="layui-input-block">'+
               '<input type="text" name="companyType" lay-verify="title" autocomplete="off" placeholder="请输入类型" class="layui-input">'+
               '</div>'+
               '</div>'+
                  '<div class="news-btn date-style">'+
                  '<input id="uploadcooperation" class="layui-btn" value="发表"  />'+
                  '</form>'+
                  '</div>'+
                 '</div>' +
                 //全部嘉宾
             '  <div class="layui-tab-item">'+
             '<table class="table-box table-sort " id="companyTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">单位名称</th>'+
             '   <th style="text-align: center;">单位类型</th>'+
             '   <th style="text-align: center;">图片</th>'+
             '   <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '<tbody></tbody>'+
             '   </table>'+
             '</div>' +
             '   </div>' +
     '     </div>' +
     '</div>' +
 '</div>'
$(".news-box").remove();
$(".main-right").append(meetingGuestHtml);
$.ajax({
    url:"/damincputilInfo/cpAllselect",
    success:function(data){
        //console.log(data.data.length);
        $.each(data.data,function(idx,ele){
            idx+=1;
          var companyTableHtml = '<tr><td>'+idx+'</td><td>'+ele.cputil_name+'</td><td>'+ele.cputil_type+'</td><td><img style="width:100px;height:100px" src="'+ele.cputil_url+'" /></td><td><button class="companyTr" data-id="'+ele.cputil_id+'" class="layui-btn"><i class="layui-icon"></i></button></td></tr';
          $("#companyTable tbody").append(companyTableHtml);
        })
        $(".companyTr").on("click",function(){
            //alert(1230);
            var companyThis = $(this);
            var companyTrId = $(this).attr("data-id");
            $.ajax({
                url:"/damincputilInfo/dellcpinfo",
                data:{
                    "cpid":companyTrId
                },
                success:function(data){
                    if(data){
                        layer.msg('您的删除成功', {
                            icon: 1,
                            time: 1000
                          });
                        companyThis.parent().parent().remove();
                       // $("#meeting-cooperation").click();
                    }else{
                        layer.msg('您的操作有误', {
                            icon: 1,
                            time: 1000
                          });
                    }
                }
            })
        })
    }
})

$("#upcooperationImage").on("change",function(){
    var file = this;
   console.log(file.files);
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

$("#uploadcooperation").on("click",function(){
   
    //var image=$("#upcooperationImage")[0].files[0];
    //  var a = new FormData();
    //  a.append("image3", image);
    var formData = new FormData($( "#cooperationsuploadForm" )[0]); 
     
   // alert(JSON.stringify(formData))
    $.ajax({
         url:"/image/cputilInfo",
        data: formData,
        type: "POST",
        cache: false,
        processData: false,
        contentType:false,
        async: false,
        beforeSend:function(){
           // alert(123);
            if($("#upcooperationImage").val()==""||$("input[name='companyname']").val()==""||$("input[name='companyType']").val==""){
                layer.msg('您的输入内容不能为空', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
             }
        },
        success:function(data){
            if(data){
                layer.msg(data.msg, {
                    icon: 1,
                    time: 1000
                  });
                  $("#meeting-cooperation").click();
            }else{
                layer.msg('您的上传有误', {
                    icon: 1,
                    time: 1000
                  });
            }
        }

    })  
})
})
//联系我们
$("#meeting-call").click(function(){
    var   contactUSHtml = '<div class="news-box">' +
    '<div class="news-title">'+
       ' <h2>联系我们</h2>'+
    '</div>'+
     '<div class="news-content">' +
          '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
               '<ul class="layui-tab-title">' +
                 '<li class="layui-this">联系我们</li>' +
                 '<li>联系我们管理</li>' +
               ' </ul>' +
             '  <div class="layui-tab-content" style="height: 100px;">' +
             
                 '<div class="layui-tab-item layui-show">' +
                 '<form id="contactsuploadForm"  method="post" enctype="multipart/form-data">'+
                 
                 
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">姓名</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+
                    
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">中文职位</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctChJname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">英文职位</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctUnJname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">邮箱</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctemail" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">手机</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctphone" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">微信</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctwxnum" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">上传头像</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage1" type="file" name="ctavatarUrl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox1"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                   
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">上传二维码</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage2" type="file" name="ctQrurl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox2"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
               
               
              
               
                    '<input type="button" id="contact_btn" class="btn" value="发表" />'+
        
                  
                  '</form>'+
                 '</div>' +
                 //全部嘉宾
             '  <div class="layui-tab-item">'+
             '<table class="table-box table-sort " id="contactTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">姓名</th>'+
             '   <th style="text-align: center;">中文职位</th>'+
             '   <th style="text-align: center;">英文职位</th>'+
             '   <th style="text-align: center;">邮箱</th>'+
             '   <th style="text-align: center;">手机</th>'+
             '   <th style="text-align: center;">微信</th>'+
             '   <th style="text-align: center;">头像</th>'+
             '   <th style="text-align: center;">二维码</th>'+
             '   <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '<tbody></tbody>'+
             '   </table>'+
             '</div>' +
             '   </div>' +
     '     </div>' +
     '</div>' +
 '</div>'
$(".news-box").remove();
$(".main-right").append(contactUSHtml);//contactsuploadForm

upimg123("#PersonalImage1","PersonalBox1");
upimg123("#PersonalImage2","PersonalBox2");
//上传联系管理
$("#contact_btn").on("click",function(){
    var formData = new FormData($( "#contactsuploadForm" )[0]); 
    if($("input[name='ctname']").val()==""||$("input[name='chChJname']").val()==""||$("input[name='ctUnJname']").val()==""||$("input[name='ctemail']").val()==""||$("input[name='ctphone']").val()==""||$("input[name='ctwxnum']").val()==""||$("input[name='ctavatarUrl']").val()==""||$("input[name='ctQrurl']").val()==""){
        layer.msg('您的输入内容不能为空', {
            icon: 1,
            time: 1000
          });
          return false;
    }
    //$("#meeting-call").click();
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
                //   alert(JSON.stringify(data))
                layer.msg('您的提交成功', {
                  icon: 1,
                  time: 1000
                });
                $("#meeting-call").click();
               }
        }
    })
})
//获取联系管理
$.ajax({
    url:"/adminctInfo/selectAllctinfo",
    success:function(data){      
        if(data){
            // console.log(data);
            // console.log(JSON.stringify(data))
            $.each(data,function(idx,element){
                 console.log(element);
                 idx+=1;
                //  console.log(element.ct_name);
                 var contactHtml = '<tr>'+
                                '<td>'+idx+'</td><td>'+element.ct_name+'</td>'+
                                '<td>'+element.ct_CHjobname+'</td>'+
                                '<td>'+element.ct_UNjobname+'</td>'+
                                '<td>'+element.ct_email+'</td>'+
                                '<td>'+element.ct_phoneNum+'</td>'+
                                '<td>'+element.ct_wxNum+'</td>'+
                                '<td><img style="width:100px;height:100px" src="'+element.ct_AvatarUrl+'" /></td><td><img style="width:100px;height:100px"  src="'+element.ct_QrcodeUrl+'" /></td>'+
                                '<td><button data-id="'+element.ct_type_id+'" class="layui-btn delContact-btn">删除</button></td>'+
                                '</tr>';
                $("#contactTable tbody").append(contactHtml);                
            })
            //删除联系管理
            $(".delContact-btn").on("click",function(){
                var delContactThat = $(this);
                var ContactID = $(this).attr("data-id");
                $.ajax({
                    url:"/adminctInfo/dellallctinfo",
                    data:{
                     "ID":ContactID
                    },
                    success:function(data){
                         if(data){
                          //   alert(JSON.stringify(data))
                          layer.msg('您的删除成功', {
                            icon: 1,
                            time: 1000
                          });
                          delContactThat.parent().parent().remove();
                        //  $("#meeting-call").click();
                         }
                    }
                })
            })
        }
    }
})
    
})
//商城管理
$("#meeting-mall").click(function(){
    var   contactUSHtml = '<div class="news-box">' +
    '<div class="news-title">'+
       ' <h2>商城管理</h2>'+
    '</div>'+
     '<div class="news-content">' +
          '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
               '<ul class="layui-tab-title">' +
                 '<li class="layui-this">商品信息上传</li>' +
                 '<li>商品信息管理</li>' +
               ' </ul>' +
             '  <div class="layui-tab-content" style="height: 100px;">' +
             
                 '<div class="layui-tab-item layui-show">' +
                 '<form id="contactsuploadForm"  method="post" enctype="multipart/form-data">'+
                 
                 
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">商品名称</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+
                    
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">价格</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="price" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">说明</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="Instructions" lay-verify="required" placeholder="请输入" maxlength="20" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">详情</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="details" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">商品图片</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage1" type="file" name="imgurl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox1"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                   
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">缩略图</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage2" type="file" name="thimgurl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox2"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                          
                    '<input type="button" id="contact_btn" class="btn" value="上传" />'+
        
                  
                  '</form>'+
                 '</div>' +
                 //全部商品
             '  <div class="layui-tab-item">'+
             '<table class="table-box table-sort " id="contactTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">商品名称</th>'+
             '   <th style="text-align: center;">价格</th>'+
             '   <th style="text-align: center;">说明</th>'+
             '   <th style="text-align: center;">详情</th>'+
             '   <th style="text-align: center;">商品图片</th>'+
             '   <th style="text-align: center;">缩略图</th>'+
             '   <th style="text-align: center;">操作</th>'+
             '   </thead>'+
             '<tbody></tbody>'+
             '   </table>'+
             '</div>' +
             '   </div>' +
     '     </div>' +
     '</div>' +
 '</div>'
 $(".news-box").remove();
$(".main-right").append(contactUSHtml);//contactsuploadForm

upimg123("#PersonalImage1","PersonalBox1");
upimg123("#PersonalImage2","PersonalBox2");
//上传商品管理
$("#contact_btn").on("click",function(){
    var formData = new FormData($( "#contactsuploadForm" )[0]); 
    if($("input[name='name']").val()==""||$("input[name='Instructions']").val()==""||$("input[name='details']").val()==""||$("input[name='price']").val()==""||$("input[name='imgurl']").val()==""||$("input[name='thimgurl']").val()==""){
        layer.msg('您的输入内容不能为空', {
            icon: 1,
            time: 1000
          });
          return false;
    }
    //$("#meeting-call").click();
    $.ajax({
        url:"/image/productInfo",
        data: formData,
        type: "POST",
        cache: false,
        processData: false,
        contentType:false,
        async: false,
        success:function(data){
            if(data){
                //   alert(JSON.stringify(data))
                layer.msg('您的提交成功', {
                  icon: 1,
                  time: 1000
                });
                console.log(data);
                $("meeting-mall").click();
               }
        }
    })
})
//获取商品管理
$.ajax({
    url:"/adminproductinfo/selectproductList",
    success:function(data){      
        if(data.msg!="ERR"){
             console.log(data);
            // console.log(JSON.stringify(data))
            $.each(data,function(idx,element){
                 console.log(element);
                 idx+=1;
                //  console.log(element.ct_name);
                 var contactHtml = '<tr>'+
                                '<td>'+idx+'</td><td>'+element.product_name+'</td>'+
                                '<td>'+element.product_price+'</td>'+
                                '<td>'+element.product_Instructions+'</td>'+
                                '<td>'+element.product_details+'</td>'+
                                '<td><img style="width:100px;height:100px" src="'+element.product_img_url+'" /></td><td><img style="width:50px;height:50px"  src="'+element.product_thumimg_url+'" /></td>'+
                                '<td><button data-id="'+element.product_id+'" class="layui-btn delContact-btn">删除</button></td>'+
                                '</tr>';
                $("#contactTable tbody").append(contactHtml);                
            })
            //删除商品管理
            $(".delContact-btn").on("click",function(){
                var delContactThat = $(this);
                var ContactID = $(this).attr("data-id");
                $.ajax({
                    url:"/adminproductinfo/dellallproductinfo",
                    data:{
                     "ID":ContactID
                    },
                    success:function(data){
                         if(data){
                          layer.msg('您的删除成功', {
                            icon: 1,
                            time: 1000
                          });
                          delContactThat.parent().parent().remove();
                        //  $("#meeting-call").click();
                         }
                    }
                })
            })
        }
    }
})
    
})
//商城管理结束

function upimg123(whichId,imgId){
    $(whichId).on("change",function(){
           var file = this;
          console.log(file.files);
          var prevDiv = document.getElementById(imgId);
          if (file.files && file.files[0]) {
              var reader = new FileReader();
              reader.onload = function (evt) {
                  prevDiv.innerHTML = '<img style="width:100px;height:100px" src="' + evt.target.result + '" />';
              }
              reader.readAsDataURL(file.files[0]);
          } else {
              prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
          }
       })
    }
    function upImg(){
        layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
    
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#upImg'
            ,url: '/image/CarouseluploadImage'
            ,data:{
                topic:"eew",
                Summary:"321321",
                datetimeStart:"12312"
            }
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
        });
    
    });
    }
    
//获取日期内容
function getdateTable2(whichId){
    //获取26号信息
$.ajax({
 url:"/adminschedule/selectschedule",
 data:{
     ID:whichId
 },
success:function(data){             
     //  alert(JSON.stringify(data));
     // console.log(data.length)
     if(data.msg!="查询失败"){
        $(data).each(function(idx,element){
            idx+=1;
        $(element).each(function(i,ele){
            var add26tableHtml  =   ' <tr>'+
            '   <td>'+idx+'</td>'+
            '   <td>'+ele.schedule_time_dan+'</td>'+
            '   <td>'+ele.schedule_time_character+'</td>'+
            '<td>'+ele.schedule_time_content+'</td>'+
            '<td >'+
            '<button class="layui-btn layui-btn-primary get'+whichId+'modification"  data-timeId="'+ele.schedule_time_id+'" data-character="'+ele.schedule_time_character+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
            '<button class="layui-btn" id="del'+whichId+'TrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
            '   </tr>';
            $('#get'+whichId+'table tbody').append(add26tableHtml);
   
        })
         })  
     }
           
}       
})
}
function langShow(){
    lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索：",
        "sUrl": "",
        "sEmptyTable": "暂无数据",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
            "sJump": "跳转"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };
};
   //修改
   function getMsgmodification(whichId) {
    $('#get'+whichId+'table').on("click", '.get'+whichId+'modification', function() {
        var modificationcontent = $(this).attr("data-content");
        var modificationtime = $(this).attr("data-time");
        var modificationId = $(this).attr("data-timeId");
        var modifcationcharacter = $(this).attr("data-character");
        layer.open({
            type: 1,
            title: '2016-06-'+whichId+'',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '300px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" class="modification'+whichId+'">' +
                //  '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
                '<div>' +
                ' <table class="table-box table-sort " id="modification26">' +
                '<thead>' +
                '<tr >' +

                '  <th style="text-align: center;">时间</th>' +
                '<th style="text-align: center;">人物</th>' +
                '<th style="text-align: center;">内容</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '  <td style="text-align: center;"><input type="text" id="modificationValue" value="' + modificationtime + '" name="title" lay-verify="title" autocomplete="off" placeholder="请输入时间" class="layui-input"></td>' +
                '<td style="text-align: center;"><input type="text" id="modificationPeopleValue" value="' + modifcationcharacter + '" placeholder="请输入人物" class="layui-input"></td>' +
                '<td style="text-align: center;"><input type="text" id="modificationContentValue" value="' + modificationcontent + '" placeholder="请输入大会内容" class="layui-input"></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<button class="layui-btn sub'+whichId+'modification" data-timeId="' + modificationId + '" style="float:right;margin-top:20px;margin-right:30px;">提交</button>' +
                '</div>' +
                '</div>'
        });
        $('.sub'+whichId+'modification').on("click", function() {
            var submodificationTimeValue = $("#modificationValue").val();
            var submodificationContentValue = $("#modificationContentValue").val();
            var submodificationTimeId = $(this).attr("data-timeId");
            var submodificationPeopleval = $("#modificationPeopleValue").val();
            $.ajax({
                url: "/adminschedule/updatadaninfo",
                data: {
                    "ID": submodificationTimeId,
                    "dan": submodificationTimeValue,
                    "character":submodificationPeopleval, //是这个吗人物
                    "concent": submodificationContentValue
                },
                success: function(data) {
                    if(data) {
                        layer.msg('添加成功', {
                            icon: 1,
                            time: 1000
                        });
                        layer.closeAll();
                        $("#meeting-schedule").click();
                    } else {
                        layer.msg('您的修改内容有误', {
                            icon: 1,
                            time: 1000
                        });
                    }
                }
            })
        })
    })
}
function delTrdate(whichId){
    $('#get'+whichId+'table').on("click",'#del'+whichId+'TrTime',function(){
         var TRtimeId = $(this).attr("data-timeId");
         var delTrTimeThis = $(this);
         $.ajax({
             url:"/adminschedule/delltimeId",
             data:{
                "ID":TRtimeId
             },
             success:function(data){
                 if(data.msg == "SUCCESS"){
                     delTrTimeThis.parent().parent().remove();
                 }
               
             }
         })
        })
}
  
           
           function addDateTable(whichId){
            $('#show'+whichId+'').on("click",'#updateTable'+whichId+'',function(){
                        var time27_val  = $('#modol'+whichId+'date').val();
                        var character_val =  $('.date'+whichId+'-characterval').val();
                        var content_val = $('.date'+whichId+'-val').val();
                        if(time27_val == ""|| content_val == ""||character_val==""){
                            layer.msg('您输入内容不能为空', {
                                icon: 1,
                                time: 1000
                              });
                              return false;
                        }
                        $.ajax({
                            url:"/adminschedule/addschedule",
                            data:{
                                "content":content_val,
                                "character":character_val,
                                "days":whichId,
                                "dan":time27_val
                            },
                            success:function(data){
                                layer.msg('添加成功', {
                                    icon: 1,
                                    time: 1000
                                    });
                                    layer.closeAll();
                                    $("#meeting-schedule").click();
                            },error:function(err){
                                   console.log(err)
                            }
                        })
                  }) 
        }

    })
    
    
    
    
    
    
    
    
    
    
    
    
    