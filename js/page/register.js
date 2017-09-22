require(['../config'],function () {
    require(['jquery'],function ($) {
        var bool = false;
        $('input[type!="checkbox"]').blur(function () {
            switch ($(this).get(0).id){
                case 'username':{
                    var $this = this;
                    if(!/^\S{4,}$/.test($(this).val())){
                        bool = false;
                        $(this).next('span').text('请依据要求输入有效用户名').css('display','inline-block');
                    }else{
                        $.post('/doregister',{
                            username : $('#username').val(),
                            verify : 'true'
                        },function(data){
                            if(data == 'true'){
                                $($this).next('span').text('用户名已存在，请重新输入').css('display','inline-block');
                                bool = false;
                            }else{
                                bool = false;
                            }
                        });
                    
                    }
                    break;
                }
                case 'passwd':{
                    if(!/^\S{6,20}$/.test($(this).val())){
                        bool = false;
                        $(this).next('span').text('请依据要求输入有效密码').css('display','inline-block');
                    }else{
                        bool = true;
                    }
                    break;
                }
                case 'againPwd':{
                    if($(this).val() != $('input').eq(1).val()){
                        bool = false;
                        $(this).next('span').text('输入的密码不一致，请重新输入').css('display','inline-block');
                    }else{
                        bool = true;
                    }
                    break;
                }
                case 'name':{
                    if(!/^[\u2E80-\u9FFF]+$/.test($(this).val())){
                        bool = false;
                        $(this).next('span').text('请输入有效中文字符').css('display','inline-block');
                    }else{
                        bool = true;
                    }
                    break;
                }
                case 'referrals':
                case 'tel':{
                    if(!/^1[34587]\d{9}$/.test($(this).val())){
                        bool = false;
                        $(this).next('span').text('请输入有效电话号码').css('display','inline-block');
                    }else{
                        bool = true;
                    }
                    break;
                }
                case 'vfcode':{
                    if(!/^540c$/ig.test($(this).val())){
                        bool = false;
                        $(this).next('span').text('验证码不正确').css('display','inline-block');
                    }else{
                        bool = true;
                    }
                    break;
                }
            }
        }).focus(function () {$(this).next('span').css('display','none');});
        $('button').click(function (e) {
            e.preventDefault();
            $('input[type!="checkbox"]').trigger('blur');
            if(!bool || !$('input[type="checkbox"]').prop('checked')){
                e.preventDefault();
            }else{
                $.post('/doregister',{
                    username : $('#username').val(),
                    password : $('#passwd').val(),
                    name : $('#name').val(),
                    tel : $('#tel').val(),
                    verify : 'false'
                },function(data){
                    if (data == 'false') {
                        alert('用户名已存在，请重新输入');
                    }else if(data == 'true'){
                        document.location = '/view/login.html';
                    }
                });
            }
        });
    });
});