/**
 * Created by Kay on 2016/3/8.
 */
//var adminDao=require('../../dao/adminDao');
//var adminDao=require('../dao/adminDao');
function keyLogin(event) {
    
        var browser = navigator.appName;
        var userAgent = navigator.userAgent;
        var code;
        if(browser.indexOf('Internet')>-1) //IE
        code = window.event.keyCode;
        else if(userAgent.indexOf("Firefox")>-1)  //火狐
        code = event.which;
        else  //其它浏览器
        code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    
        if ( code == 13)  //按Enter键的键值为13
            document.getElementById("btn_login").click();  //调用登录按钮的登录事件
    }
    
    $(function(){

    })
      $(function(){
        $('#btn_login').click(function(){
            var url="/admin"
            var username=$('#username').val();
            var pwd=$("#password").val();
            var data={};
            data.username=username;
            data.pwd=pwd;
            $.post(url,{ sync:false,
                username:username,
                pwd:pwd 
            },
           
            function(callbackData){
                if(callbackData.msg=="href"){
                    window.location.href = "/welcome";
                }else{
                    alert(callbackData.msg)
                }
              })  
           })
    })


    
    // window.onload = function () {
    //     var btn_login = document.getElementById('btn_login');
    //     var btn_register = document.getElementById('btn_register');
    
    
    //     btn_login.onclick = function login() {
    
    //         var adminname = document.getElementById("username");
    //         var adminpwd = document.getElementById("password");
    
    //         if (adminname.value == "") {
    
    //             alert("请输入用户名");
    
    //         } else if (adminpwd.value == "") {
    
    //             alert("请输入密码");
    
    //         } else{
    //             var Accountinfo={};
    //             Accountinfo.adminname=adminname;
    //             Accountinfo.adminpwd=adminpwd;


                // adminDao.selectadminAccountAndPWD(Accountinfo,function(data){
                //     if(!data){
                //         alert("无管理员账号");
                //     }else if(data.account!=adminname || data.pwd!=adminpwd){
                //         alert("登陆失败，请检查账号和密码");
                //     }else {
                //         window.location.href = "welcome.html";
                        
                //     }
                // })
                    
    
    
                ////  全屏方法
                //function fullScreen(element) {
                //    if (element.requestFullscreen) {
                //        element.requestFullscreen();
                //    } else if (element.mozRequestFullScreen) {
                //        element.mozRequestFullScreen();
                //    } else if (element.webkitRequestFullscreen) {
                //        element.webkitRequestFullscreen();
                //    } else if (element.msRequestFullscreen) {
                //        element.msRequestFullscreen();
                //    }
                //}
                ////  再让当前页面全屏
                //fullScreen(document.documentElement);
    
        //     }
        // }
    
        // btn_register.onclick = function register() {
        //     window.open("register.html");
        // }
    // }
    
    
    