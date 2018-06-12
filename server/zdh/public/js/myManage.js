$(function(){
    

$(function(){
   $("#invoice-btn").click();
//    $("#invitation-btn").click();
//    $("#invitation-btnmag").click();
//    $("#reginform").click();
})
$("#invoice-btn").click(function(){
   var  invoiceManage =  '<div class="news-box"><div class="news-title">'+
   '<h2>发票管理</h2>'+
   '</div>'+
   '<div class="news-content">'+
   '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">'+
   '<ul class="layui-tab-title">'+
   '<li class="layui-this">全部发票</li>'+
   '<li id="invoice1">未受理</li>'+
   '<li id="invoice2">已受理</li>'+
   '</ul>'+
   '<div class="layui-tab-content" style="height: 100px;">'+
   '<div class="layui-tab-item layui-show">'+
   '<table class="table-box table-sort " id="addInvoice">'+
   '<thead>'+
   '<tr >'+
   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
   '<th style="text-align: center;">发票类型</th>'+
   '<th style="text-align: center;">发票抬头</th>'+
   '<th style="text-align: center;">状态</th>'+
   '<th style="text-align: center;">纳税人识别号</th>'+
   '<th style="text-align: center;">发票内容</th>'+
   '<th style="text-align: center;">发票金额</th>'+
   '<th style="text-align: center;">更多信息</th>'+
   '<th style="text-align: center;">收件人</th>'+
   '<th style="text-align: center;">联系电话</th>'+
   '<th style="text-align: center;">详细地址</th>'+
   '<th style="text-align: center;">操作</th>'+
   '</tr>'+
   '</thead>'+
   '<tbody>'+
   '</tbody>'+
   '</table>'+
   '</div>'+
   '<div class="layui-tab-item">'+
   '<table class="table-box table-sort " id="addInvoice1">'+//未受理
   '<thead>'+
   '<tr >'+
   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
   '<th style="text-align: center;">发票类型</th>'+
   '<th style="text-align: center;">发票抬头</th>'+
   '<th style="text-align: center;">状态</th>'+
   '<th style="text-align: center;">纳税人识别号</th>'+
   '<th style="text-align: center;">发票内容</th>'+
   '<th style="text-align: center;">发票金额</th>'+
   '<th style="text-align: center;">更多信息</th>'+
   '<th style="text-align: center;">收件人</th>'+
   '<th style="text-align: center;">联系电话</th>'+
   '<th style="text-align: center;">详细地址</th>'+
   '<th style="text-align: center;">操作</th>'+
   '</tr>'+
   '</thead>'+
   '<tbody>'+
   '</tbody>'+
   '</table>'+
   '</div>'+
   '<div class="layui-tab-item">'+
   '<table class="table-box table-sort " id="addInvoice0">'+
   '<thead>'+
   '<tr >'+
   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
   '<th style="text-align: center;">发票类型</th>'+
   '<th style="text-align: center;">发票抬头</th>'+
   '<th style="text-align: center;">状态</th>'+
   '<th style="text-align: center;">纳税人识别号</th>'+
   '<th style="text-align: center;">发票内容</th>'+
   '<th style="text-align: center;">发票金额</th>'+
   '<th style="text-align: center;">更多信息</th>'+
   '<th style="text-align: center;">收件人</th>'+
   '<th style="text-align: center;">联系电话</th>'+
   '<th style="text-align: center;">详细地址</th>'+
   '<th style="text-align: center;">操作</th>'+
   '</tr>'+
   '</thead>'+
   '<tbody>'+
   '</tbody>'+
   '</table>'+
   '</div>'+
   // '<div class="layui-tab-item">内容4</div>'+
   // '<div class="layui-tab-item">内容5</div>'+
   '</div>'+
   '</div> '+
   '</div></div>'
$(".main-right").html(invoiceManage);
//获取所有发票
getAllInvoice()
allNoInvoice(1,1);
allNoInvoice(0,0);


     $("#addInvoice").on("click",".editInvoice",function(){
         var invoice_id = $(this).attr("data-id");
         var invoice_status = $(this).attr("data-status")
         if(invoice_status == "未受理"){
           invoice_status = 1 
       }else if(invoice_status == "受理"){
           invoice_status = 0
       }
       layer.open({
                      type: 1,
                      title:'修改发票',
                      closeBtn: 1, //不显示关闭按钮
                      area: ['500px', '200px'],
                      fixed: false, //不固定
                      maxmin: true,
                      content: '<div class="" class="edit-invoice">'+
                                   '<div class="invoice_modal" style="width:300px;height:70px; margin:33px auto; text-align:center;">'+
                                   '状态：'+
                                   '<label class="radio-inline">'+
                                   ' <input type="radio" name="invoiceEdit-status"  value="1"> 未受理'+
                                   '</label>'+
                                   '<label class="radio-inline">'+
                                   '<input type="radio" name="invoiceEdit-status"  value="0"> 受理'+
                                   ' </label>'+
                                   '<input id="upEditInvoice" class="btn btn-danger" data-id="'+invoice_id+'" value="确认" style="margin-top:20px">'+
                                   '</div>'+
                             '</div>'
                    });
                    $("input[name='invoiceEdit-status']").each(function(){
                       var warn_that = $(this);
                       var warn_editVal = warn_that.val();
                        //   console.log(ticketModifStatus)
                       if(warn_editVal==invoice_status){
                           warn_that.attr("checked", true);
                       }
                   })
                   $("#upEditInvoice").on("click",function(){
                       var editVoice = $("input[name='invoiceEdit-status']:checked").val();   
                       var editinvoiceId = $(this).attr("data-id");
               //    console.log(editVoice + );      
                       $.ajax({
                           url:"/adminunvoice/updataStatus",
                           data:{
                               "status":editVoice,
                               "ID":editinvoiceId
                           },
                           success:function(res){
                             $("#invoice-btn").click();
                           }
                       })                
                   })
         })



})

//获取所有发票
function getAllInvoice(){
$.ajax({
   url:"/adminunvoice/selectAll",
   success:function(data){
       $(data).each(function(index,element){
             if(element.invoice_status==0){
                element.invoice_status = "受理"
             }else if(element.invoice_status==1){
               element.invoice_status = "未受理"
             }
           index+=1;
           var addinvoiceTable = '<tr>'+
           '<td>'+index+'</td>'+
           '<td>'+element.invoice_type+'</td>'+
           '<td>'+element.invoice_head+'</td>'+
           '<td class="editInvoice">'+element.invoice_status+'</td>'+
           '<td>'+element.invoice_rec+'</td>'+
           '<td>'+element.invoice_content+'</td>'+
           '<td>'+element.invoice_amount+'</td>'+
           '<td>'+element.invoice_info+'</td>'+
           '<td>'+element.invoice_recipient+'</td>'+
           '<td>'+element.invoice_phoneNum+'</td>'+
           '<td>'+element.invoice_address+'</td>'+
           '<td><button class="layui-btn layui-btn-primary editInvoice" data-status="'+element.invoice_status+'" data-id="'+element.invoice_id+'" ><i class="layui-icon"></i></button></td>'+
           '</tr>';
         $("#addInvoice tbody").append(addinvoiceTable);
       })
 
   }
})
}

function allNoInvoice(status,whichId){
$.ajax({
       url:"/adminunvoice/selectStatus",
       data:{
        "status":status
       },
       success:function(data){
            
        $(data).each(function(index,element){
            if(element.invoice_status==0){
                element.invoice_status = "受理"
            }else if(element.invoice_status==1){
                element.invoice_status = "未受理"
            }
            index+=1;
            var addinvoiceTable1 = '<tr>'+
            '<td>'+index+'</td>'+
            '<td>'+element.invoice_type+'</td>'+
            '<td>'+element.invoice_head+'</td>'+
            '<td>'+element.invoice_status+'</td>'+
            '<td>'+element.invoice_rec+'</td>'+
            '<td>'+element.invoice_content+'</td>'+
            '<td>'+element.invoice_amount+'</td>'+
            '<td>'+element.invoice_info+'</td>'+
            '<td>'+element.invoice_recipient+'</td>'+
            '<td>'+element.invoice_phoneNum+'</td>'+
            '<td>'+element.invoice_address+'</td>'+
            '<td><button class="layui-btn layui-btn-primary editInvoice'+whichId+'" data-status="'+element.invoice_status+'" data-id="'+element.invoice_id+'" ><i class="layui-icon"></i></button></td>'+
            '</tr>';
          $("#addInvoice"+whichId+" tbody").append(addinvoiceTable1);
       
        });
       }
   })
   $('#addInvoice'+whichId+'').on("click",'.editInvoice'+whichId+'',function(){
       var invoice_id = $(this).attr("data-id");
       var invoice_status = $(this).attr("data-status")
       if(invoice_status == "未受理"){
         invoice_status = 1 
        }else if(invoice_status == "受理"){
            invoice_status = 0
        }
     layer.open({
                    type: 1,
                    title:'修改发票',
                    closeBtn: 1, //不显示关闭按钮
                    area: ['500px', '200px'],
                    fixed: false, //不固定
                    maxmin: true,
                    content: '<div class="" class="edit-invoice">'+
                                 '<div class="invoice_modal" style="width:300px;height:70px; margin:33px auto; text-align:center;">'+
                                 '状态：'+
                                 '<label class="radio-inline">'+
                                 ' <input type="radio" name="invoiceEdit-status"  value="1"> 未受理'+
                                 '</label>'+
                                 '<label class="radio-inline">'+
                                 '<input type="radio" name="invoiceEdit-status"  value="0"> 受理'+
                                 ' </label>'+
                                 '<input id="upEditInvoice'+whichId+'" class="btn btn-danger" data-id="'+invoice_id+'" value="确认" style="margin-top:20px">'+
                                 '</div>'+
                           '</div>'
                  });
                  $("input[name='invoiceEdit-status']").each(function(){
                     var warn_that = $(this);
                     var warn_editVal = warn_that.val();
                     if(warn_editVal==invoice_status){
                         warn_that.attr("checked", true);
                     }
                 })
                 $("#upEditInvoice"+whichId+"").on("click",function(){
                     var editVoice = $("input[name='invoiceEdit-status']:checked").val();   
                     var editinvoiceId = $(this).attr("data-id");   
                     $.ajax({
                         url:"/adminunvoice/updataStatus",
                         data:{
                             "status":editVoice,
                             "ID":editinvoiceId
                         },
                         success:function(res){
                           $("#invoice-btn").click();
                         }
                     })                
                 })
       })
}

//邀请函上传开始
$("#invitation-btn").click(function(){
   var  invoiceManage =  '<div class="news-box"><div class="news-title">'+
   '<h2 style="width:215px;">邀请函信息上传</h2>'+
   '</div>'+
   '<div class="news-content">'+
   '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">'+
   '<div class="layui-tab-content" style="height: 100px;">'+
   '<div class="layui-tab-item layui-show">'+
   '<div class="upImgBox">'+//头像
      '<input id="image" type="file" name="image"  >'+//onchange="preview(this)"
      '<div id="preview"></div>'+
       '</div>'+//头像
   '<div class="date-style">'+//姓名
   '<div class="layui-inline">'+
   '<label class="layui-form-label">姓名</label>'+
   '<div class="layui-input-inline">'+
   ' <input type="text" class="layui-input" placeholder="请输入姓名" id="invitename" name="invitename">'+
   '</div>'+
   '</div>'+
   '</div>'+//姓名
   '<div class="date-style">'+//手机号
   '<div class="layui-inline">'+
   '<label class="layui-form-label">手机号</label>'+
   '<div class="layui-input-inline">'+
   ' <input type="text"  class="layui-input" placeholder="请输入手机号" id="phone" name="phone">'+
   '</div>'+
   '</div>'+
   '</div>'+//手机号结束
   '<div class="date-style">'+//职务1
   '<div class="layui-inline">'+
   '<label class="layui-form-label">职务1</label>'+
   '<div class="layui-input-inline">'+
   ' <input type="text"  class="layui-input" placeholder="请输入职务" id="job1" name="job1">'+
   '</div>'+
   '</div>'+
   '</div>'+//职务1
   '<div class="date-style">'+//职务2
   '<div class="layui-inline">'+
   '<label class="layui-form-label">职务2</label>'+
   '<div class="layui-input-inline">'+
   ' <input type="text" class="layui-input" placeholder="请输入职务" id="job2" name="job2">'+
   '</div>'+
   '</div>'+
   '</div>'+//职务2
   '<div class="news-btn date-style">'+//发表
       '<button id="uploadNews" class="btn btn-danger">发表</button>'+
       '</div>'+//发表
   '</div>'+
   '</div>'+
   '</div> '+
   '</div></div>'
$(".main-right").html(invoiceManage);
//添加邀请函
$("#uploadNews").on("click",function(){
   if( $("#invitename").val()==""||$("#phone").val()==""||$("#job1").val()== ""||$("#job2").val()==""||$("#image").val()==""){
    layer.msg('您的内容不能为空', {
        icon: 1,
        time: 1000
      });
   }
    var formData = new FormData();
    formData.append("invitename", $("#invitename").val());
    formData.append("phone", $("#phone").val());
    formData.append("job1", $("#job1").val());
    formData.append("job2", $("#job2").val());
    formData.append("image", $("#image")[0].files[0]);
    $.ajax({
        url:'/image/inviteInfo',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if(data.msg=="邀请函信息上传成功"){
                  $("#newsManage-btn").click();
                  layer.msg('邀请函信息上传成功', {
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

//邀请函上传结束

//邀请函管理开始
$("#invitation-btnmag").click(function(){
var  invoiceManage =  '<div class="news-box"><div class="news-title">'+
'<h2 style="width:150px;">邀请函管理</h2>'+
'</div>'+
'<div class="news-content">'+
'<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">'+
'<div class="layui-tab-content" style="height: 100px;">'+
'<table class="table-box table-sort " id="addInvitation1">'+//全部邀请函
'<thead>'+
'<tr >'+
'<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
'<th style="text-align: center;">图片</th>'+
'<th style="text-align: center;">嘉宾姓名</th>'+
'<th style="text-align: center;">职务1</th>'+
'<th style="text-align: center;">职务2</th>'+
'<th style="text-align: center;">手机号</th>'+
'<th style="text-align: center;">操作</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'</tbody>'+
'</table>'+
'</div>'+
'</div> '+
'</div></div>'
$(".main-right").html(invoiceManage);
getInvitation()


})
//获取所有邀请函信息
function getInvitation(){
$.ajax({
   
   url:"/admininvite/selectAllintive ",
   success:function(data){
       $(data).each(function(index,element){
           index+=1;
           var addInvitationTable = '<tr>'+
           '<td>'+index+'</td>'+
           '<td><img style="width:100px;height:100px;" src="'+element.Avatar_url+'"/></td>'+
           '<td>'+element.Invited_name+'</td>'+
           '<td>'+element.Invited_job1+'</td>'+
           '<td>'+element.Invited_job2+'</td>'+
           '<td>'+element.Invited_phone+'</td>'+
           '<td>'+'<button id="delNes-btn" data-id="'+element.Invited_id+'"   data-img="'+element.Avatar_url+'" class="btn btn-primary">删除</button>'+'</td>'+
           '</tr>';
         $("#addInvitation1 tbody").append(addInvitationTable);
       })
       //删除邀请函接口
       $("#addInvitation1").on("click","#delNes-btn",function(){
           var getImgId = $(this).attr("data-id");
           var _imgThis = $(this);
       $.ajax({
           url:"/admininvite/dellintive",
              
           data:{
               "ID" : getImgId,
   
           },
           success:function(data){
            ;
           if(data == 1){
               _imgThis.parent().parent().remove();
               layer.msg('邀请函信息删除成功！', {
                   icon: 1,
                   time: 1000
               });
           }else{
               layer.msg('您的操作有误+'+data+'', {
                   icon: 1,
                   time: 1000
               });
           }
           }
       })
       })  //删除邀请函
 
   }
   
})
}
//邀请函管理结束

//参会注册信息管理开始
$("#reginform").click(function(){
var  invoiceManage =  '<div class="news-box"><div class="news-title">'+
'<h2 style="width:185px;">人员信息管理</h2>'+
'</div>'+
'<div class="news-content">'+
'<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">'+
'<ul class="layui-tab-title">'+
'<li class="layui-this" id="invoice0">VIP注册信息</li>'+
'<li id="invoice1">非VIP注册信息</li>'+
'<li id="invoice2">学生注册信息</li>'+
'<li id="invoice3">媒体注册信息</li>'+
'</ul>'+
'<div class="layui-tab-content" style="height: 100px;">'+
'<div class="layui-tab-item layui-show">'+
'<table class="table-box table-sort " id="addUserInfo">'+
'<thead>'+
'<tr >'+
'<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
'<th style="text-align: center;">姓名</th>'+
//'<th style="text-align: center;">状态</th>'+
'<th style="text-align: center;">票类</th>'+
'<th style="text-align: center;">手机</th>'+
'<th style="text-align: center;">邮箱</th>'+
'<th style="text-align: center;">单位</th>'+
'<th style="text-align: center;">职务</th>'+
'<th style="text-align: center;">IEEE ITSS会员号</th>'+
//'<th style="text-align: center;">操作</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'</tbody>'+
'</table>'+
'</div>'+
'<div class="layui-tab-item">'+
'<table class="table-box table-sort " id="addUserInfo1">'+//未受理
'<thead>'+
'<tr >'+
'<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
'<th style="text-align: center;">姓名</th>'+
'<th style="text-align: center;">状态</th>'+
'<th style="text-align: center;">票名</th>'+
'<th style="text-align: center;">手机</th>'+
'<th style="text-align: center;">邮箱</th>'+
'<th style="text-align: center;">单位</th>'+
'<th style="text-align: center;">职务</th>'+
'<th style="text-align: center;">操作</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'</tbody>'+
'</table>'+
'</div>'+
'<div class="layui-tab-item">'+
'<table class="table-box table-sort " id="addUserInfo0">'+
'<thead>'+
'<tr >'+
'<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
'<th style="text-align: center;">姓名</th>'+
//'<th style="text-align: center;">状态</th>'+
'<th style="text-align: center;">票名</th>'+
'<th style="text-align: center;">手机</th>'+
'<th style="text-align: center;">邮箱</th>'+
'<th style="text-align: center;">学校</th>'+
'<th style="text-align: center;">学生证号</th>'+
//'<th style="text-align: center;">操作</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'</tbody>'+
'</table>'+
'</div>'+
'<div class="layui-tab-item">'+
'<table class="table-box table-sort " id="addMediaTable">'+//媒体信息
'<thead>'+
'<tr >'+
'<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
'<th style="text-align: center;">姓名</th>'+
'<th style="text-align: center;">状态</th>'+
'<th style="text-align: center;">票名</th>'+
'<th style="text-align: center;">手机</th>'+
'<th style="text-align: center;">邮箱</th>'+
'<th style="text-align: center;">平台</th>'+
//'<th style="text-align: center;">职务</th>'+
'<th style="text-align: center;">操作</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'</tbody>'+
'</table>'+
'</div>'+
// '<div class="layui-tab-item">内容5</div>'+
'</div>'+
'</div> '+
'</div></div>'
$(".main-right").html(invoiceManage);
//获取所有发票
getAllVipReg();
//获取非vip注册信息
getNoReg()
//学生注册信息
getStuReg()
//媒体注册信息
getMediaReg()
})

//非vip 注册信息

//参会注册信息管理结束
//获取所有vip注册信息
function getAllVipReg(){
   
     $.ajax({
         url:"/adminmainuserinfo/vipAlllist",
         success:function(data){
              ;
             $(data).each(function(index,element){
                index+=1;
                var addVipListTable = '<tr>'+
                '<td>'+index+'</td>'+
                '<td>'+element.ticket_name+'</td>'+
                '<td>'+element.ticket_mark+'</td>'+
                '<td>'+element.ticket_phone+'</td>'+
                '<td>'+element.ticket_email+'</td>'+
                '<td>'+element.ticket_job+'</td>'+
                '<td>'+element.ticket_util+'</td>'+
                '<td>'+element.ticket_VIPnum+'</td>'+
              //  '<td><button class="layui-btn layui-btn-primary editaddUserInfo" data-status="'+element.ticket_status+'"  data-id="'+element.ticket_id+'" ><i class="layui-icon"></i></button></td>'+
                '</tr>';
              $("#addUserInfo tbody").append(addVipListTable);
            })
         }
     })
}
//非vip注册信息
function getNoReg(){
    $.ajax({
        url:"/adminmainuserinfo/novipAlllist",
        success:function(data){
             
            $(data).each(function(index,element){
                if(element.noVip_status==1){
                    element.noVip_status ="提交";
                }else if(element.noVip_status==2){
                    element.noVip_status="审核中";
                }else if(element.noVip_status==3){
                    element.noVip_status = "审核通过"; 
                }else{
                    element.noVip_status = "不确定"
                }
            
               index+=1;
               var addStuListTable = '<tr>'+
               '<td>'+index+'</td>'+
               '<td>'+element.noVIp_name+'</td>'+
               '<td>'+element.noVip_status+'</td>'+//'+element.noVip_status+'
               '<td>'+element.noVip_mark+'</td>'+
               '<td>'+element.noVip_phone+'</td>'+
               '<td>'+element.noVip_email+'</td>'+
               '<td>'+element.noVip_util+'</td>'+
               '<td>'+element.noVip_job+'</td>'+
           
               '<td><button class="layui-btn layui-btn-primary editaddUserInfo"  data-status="'+ element.noVip_status+'"  data-id="'+element.ticket_id+'" ><i class="layui-icon"></i></button></td>'+
               '</tr>';
             $("#addUserInfo1 tbody").append(addStuListTable);
           })
        }
    })
    //修改
     //修改
     editTableTR("#addUserInfo1",".editaddUserInfo");
}
//学生注册信息
function getStuReg(){
    $.ajax({
        url:"/adminmainuserinfo/stuAlllist",
        success:function(data){
             ;
            $(data).each(function(index,element){
                if(element.stu_status==1){
                    element.stu_status ="提交";
                }else if(element.stu_status==2){
                    element.stu_status="审核中";
                }else if(element.stu_status==3){
                    element.stu_status = "审核通过"; 
                }else{
                    element.stu_status = "不确定"
                }
               index+=1;
               var addNoStuListTable = '<tr>'+
               '<td>'+index+'</td>'+
               '<td>'+element.stu_name+'</td>'+
              // '<td>'+element.stu_status+'</td>'+
               '<td>'+element.stu_mark+'</td>'+
               '<td>'+element.stu_phone+'</td>'+
               '<td>'+element.stu_email+'</td>'+
               '<td>'+element.stu_school+'</td>'+
               '<td>'+element.stu_stuNum+'</td>'+
           
              // '<td><button class="layui-btn layui-btn-primary editaddUserInfo" data-status="'+element.stu_status+'"  data-id="'+element.ticket_id+'" ><i class="layui-icon"></i></button></td>'+
               '</tr>';
             $("#addUserInfo0 tbody").append(addNoStuListTable);
           })
        }
    })
       
}
// 媒体注册信息#addMediaTable
function getMediaReg(){
    $.ajax({
        url:"/adminmainuserinfo/mediaAlllist",
        success:function(data){
             ;
            $(data).each(function(index,element){
                if(element.media_status==1){
                    element.media_status ="提交";
                }else if(element.media_status==2){
                    element.media_status="审核中";
                }else if(element.media_status==3){
                    element.media_status = "审核通过"; 
                }else{
                    element.media_status = "不确定"
                }
               index+=1;
               var addMediaListTable = '<tr>'+
               '<td>'+index+'</td>'+
               '<td>'+element.media_name+'</td>'+
               '<td>'+element.media_status+'</td>'+
               '<td>'+element.media_mark+'</td>'+
               '<td>'+element.media_phone+'</td>'+
               '<td>'+element.media_email+'</td>'+
               '<td>'+element.media_platform+'</td>'+
        //     '<td>'+element.stu_stuNum+'</td>'+
           
               '<td><button class="layui-btn layui-btn-primary editaddUserInfo" data-status="'+element.media_status+'"  data-id="'+element.ticket_id+'" ><i class="layui-icon"></i></button></td>'+
               '</tr>';
             $("#addMediaTable tbody").append(addMediaListTable);
           })
        }
    })
       //修改
       editMediatable();
}
//修改状态弹窗
function editTableTR(whichTable,editInfo){
    $(whichTable).on('click',editInfo,function(){
         var editUserInfoId = $(this).attr("data-id");
         var editUserInfoStatus = $(this).attr("data-status");
         if(editUserInfoStatus == "提交"){
             editUserInfoStatus = 1; 
         }else if(editUserInfoStatus == "审核中"){
             editUserInfoStatus = 2;
         }else if(editUserInfoStatus == "审核通过"){
             editUserInfoStatus = 3;
         }
         //console.log(editUserInfoId);
         layer.open({
             type: 1,
             title:'修改用户状态',
             closeBtn: 1, //不显示关闭按钮
             area: ['500px', '200px'],
             fixed: false, //不固定
             maxmin: true,
             content: '<div class="" class="edit-invoice">'+
                          '<div class="invoice_modal" style="width:300px;height:70px; margin:33px auto; text-align:center;">'+
                          '状态：'+
                          '<label class="radio-inline">'+
                          ' <input type="radio" name="useEdit-status"  value="1"> 提交'+
                          '</label>'+
                          '<label class="radio-inline">'+
                          '<input type="radio" name="useEdit-status"  value="2"> 审核中'+
                          ' </label>'+
                          '<label class="radio-inline">'+
                          '<input type="radio" name="useEdit-status"  value="3"> 审核通过'+
                          ' </label>'+
                          '<input  class="btn btn-danger upEditUser'+editUserInfoStatus+'" data-id="'+editUserInfoId+'" value="确认" style="margin-top:20px">'+
                          '</div>'+
                    '</div>'
           });
           $("input[name='useEdit-status']").each(function(){
             var user_that = $(this);
             var user_editVal = user_that.val();
              //   console.log(ticketModifStatus)
             if(user_editVal==editUserInfoStatus){
                 user_that.attr("checked", true);
             }
         })
         $('.upEditUser'+editUserInfoStatus+'').on("click",function(){
             var editVoice = $("input[name='useEdit-status']:checked").val();   
             var editinvoiceId = $(this).attr("data-id");     
             $.ajax({
                 url:"/adminmainuserinfo/updatapmark",
                 data:{
                     "status":editVoice,
                     "ID":editinvoiceId
                 },
                 success:function(res){
                   layer.msg('修改成功', {
                    icon: 1,
                    time: 1000
                  });
                  layer.closeAll();
                  $("#reginform").click();
                 }
             })                
         })
     })
 }
 function editMediatable(){
    $('#addMediaTable').on('click','.editaddUserInfo',function(){
        var editUserInfoId = $(this).attr("data-id");
        var editUserInfoStatus = $(this).attr("data-status");
        if(editUserInfoStatus == "提交"){
            editUserInfoStatus = 1; 
        }else if(editUserInfoStatus == "审核中"){
            editUserInfoStatus = 2;
        }else if(editUserInfoStatus == "审核通过"){
            editUserInfoStatus = 3;
        }
        layer.open({
            type: 1,
            title:'修改用户状态',
            closeBtn: 1, //不显示关闭按钮
            area: ['500px', '200px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" class="edit-invoice">'+
                         '<div class="invoice_modal" style="width:300px;height:70px; margin:33px auto; text-align:center;">'+
                         '状态：'+
                         '<label class="radio-inline">'+
                         ' <input type="radio" name="useEdit-status"  value="1"> 提交'+
                         '</label>'+
                         '<label class="radio-inline">'+
                         '<input type="radio" name="useEdit-status"  value="2"> 审核中'+
                         ' </label>'+
                         '<label class="radio-inline">'+
                         '<input type="radio" name="useEdit-status"  value="3"> 审核通过'+
                         ' </label>'+
                         '<input id="upEditUser" class="btn btn-danger" data-id="'+editUserInfoId+'" value="确认" style="margin-top:20px">'+
                         '</div>'+
                   '</div>'
          });
          $("input[name='useEdit-status']").each(function(){
            var user_that = $(this);
            var user_editVal = user_that.val();
             //   console.log(ticketModifStatus)
            if(user_editVal==editUserInfoStatus){
                user_that.attr("checked", true);
            }
        })
        $("#upEditUser").on("click",function(){
            var editVoice = $("input[name='useEdit-status']:checked").val();   
            var editinvoiceId = $(this).attr("data-id");    
            $.ajax({
                url:"/adminmainuserinfo/updatamedia",//修改媒体接口
                data:{
                    "status":editVoice,
                    "ID":editinvoiceId
                },
                success:function(res){
                  layer.msg('修改成功', {
                    icon: 1,
                    time: 1000
                  });
               layer.closeAll();
                $("#reginform").click();
                
                }
            })                
        })
    })
 }
})