require(['../config'],function () {
    require(['jquery','cookie','ckadddb'],function ($,cookie,ckdb) {
       $(function () {
           //表单验证
           var bool = true;
           $('input[type!="checkbox"]').blur(function () {
               switch ($(this).get(0).id){
                   case 'username':{
                       if(!(/^\S{4,}$/.test($(this).val()) || /^1[34587]\d{9}$/.test($(this).val()))){
                           $(this).next('span').text('请输入有效用户信息').css('display','inline-block');
                           bool = false;
                       }
                       break;
                   }
                   case 'passwd':{
                       if(!/^\S{6,20}$/.test($(this).val())){
                           $(this).next('span').text('请输入有效格式').css('display','inline-block');
                           bool = false;
                       }
                       break;
                   }
               }

           }).focus(function () {
               $(this).next('span').css('display','none');
               bool = true;
           });
           //登录并存入cookie
           $('button').click(function (e) {
                e.preventDefault();
               $('input[type!="checkbox"]').trigger('blur');
               if(!bool){
                   e.preventDefault();
               }else{
                   $.post('/dologin',{
                      username : $('#username').val(),
                      password : $('#passwd').val()
                   },function(data){
                      if(data == 'true'){
                        var officemate = {
                             username : $('#username').val()
                         };
                         cookie.set('officemate',JSON.stringify(officemate));
                         ckdb.ckadddb();
                         document.location = '/index.html';
                       }else{
                        alert('用户名或密码错误，请重新输入！');
                       }
                   }); 
                   
               }
           });

       });
    });
});