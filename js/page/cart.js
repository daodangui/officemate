require(['../config'],function () {
   require(['jquery','cookie','template','ckadddb','lazyload','swiper'],function ($,cookie,template,ckdb) {
       //加载页面头部的顶部
       $('#head_top').load('./commonheadtop.html',function () {
           $('img.lazy').lazyload({effect: 'fadeIn'});
           //用户身份验证
            function userverify(){
                var cookiestr = cookie.get('officemate');
                if(cookiestr){
                    var officemate = JSON.parse(cookiestr);
                    if(officemate.username){
                        $('#login').html('<p>您好，<a>'+officemate.username+'</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="logoff">注销</a></p>');
                    }
                    $('#login').on('click','.logoff',function(){
                    cookie.set('officemate',JSON.stringify([]));
                    document.location.reload();
                    });
                }
            }
           userverify();
       });
       //加载页面底部
       $('footer').load('./commonfooter.html',function () {
           $('img.lazy').lazyload({effect: 'fadeIn'});
       });
       $(function () {
              //模板填充||初始化(获取cookie中的购物车信息，并合并数据库中的购物车信息)
              (function(){
                 var officecart = ckdb.ckadddb(); 
                 if(officecart.length>0){
                    $('tbody').prepend(template('itemtem',officecart));
                 }else{
                    $('#content').remove();
                    $('#empty').css('display','block');
                 }
                 finasum();
              })();
              //总金额计算
              function finasum(){
                var fina = 0;
                 $('.itemsum').each(function(){
                  var price = parseFloat($(this).closest('tr').find('.price').html().slice(1));
                  var num = parseFloat($(this).closest('tr').find('.num').val());
                    $(this).html('￥'+String(price*num).slice(0,4));
                    fina += price*num;
                 });
                 $('#finally p').eq(0).find('span').html('￥'+String(fina).slice(0,4));
                 $('#finally p').eq(2).find('span').html('￥'+String(fina).slice(0,4));
              }
              
           //轮播图
           $.post('/cart-get_like_goods.html',{limit:6},function(data){
            var data = JSON.parse(data);
              $('.swiper-wrapper').html(template('slidertem',data.data.like));
              var itemSlide = new Swiper('#slider',{
               loop : true,
               prevButton:'.swiper-button-prev',
               nextButton:'.swiper-button-next',
               slidesPerView: 6,
               autoplay: 2000,
               autoplayDisableOnInteraction : false
           });
           });
           //数量增减&移除
           $('#itemtb').on('click','.sub',function () {
               $(this).siblings('input').val(Math.max(1,parseInt($(this).siblings('input').val())-1));
               var officecart = JSON.parse(cookie.get('officecart')); 
                for(var i=0;i<officecart.length;i++){
                    if(officecart[i].name == $(this).closest('tr').find('.itemname').html()){
                      officecart[i].num = parseInt($(this).siblings('input').val());
                      cookie.set('officecart',JSON.stringify(officecart));
                      break;
                    }
                }
                finasum();
                ckdb.ckadddb();
           }).on('click','.add',function () {
               $(this).siblings('input').val(parseInt($(this).siblings('input').val())+1);
               var officecart = JSON.parse(cookie.get('officecart'));
               for(var i=0;i<officecart.length;i++){
                    if(officecart[i].name == $(this).closest('tr').find('.itemname').html()){
                      officecart[i].num = parseInt($(this).siblings('input').val());
                      cookie.set('officecart',JSON.stringify(officecart));
                      break;
                    }
                }
                finasum();
                ckdb.ckadddb();
           }).on('click','.remove',function () {
                var officecart = JSON.parse(cookie.get('officecart')); 
                for(var i=0;i<officecart.length;i++){
                    if(officecart[i].name == $(this).closest('tr').find('.itemname').html()){
                      officecart.splice(i,1);
                      cookie.set('officecart',JSON.stringify(officecart));
                      break;
                    }
                }
               $(this).closest('tr').remove();
               if($('#itemtb tbody').children().length <=1 ){
                    $('#content').remove();
                    $('#empty').css('display','block');
               }
               finasum();
               ckdb.ckadddb();
           });
           //全选与单选
           (function(){
              $('#itemtb').on('click','.checked',function(){
                  var k = 0;
                  $('.checked').each(function(){
                    if($(this).prop('checked'))
                      k++;
                  });
                  if(k == $('.checked').length){
                    $('.allchecked').prop('checked',true);
                  }else{
                    $('.allchecked').prop('checked',false);
                  }
              });
              $('#itemtb').on('click','.allchecked',function(){
                if($(this).prop('checked')){
                  $('.checked').prop('checked',true);
                  $('.allchecked').prop('checked',true);
                }else{
                  $('.checked').prop('checked',false);
                  $('.allchecked').prop('checked',false);
                }
              });
           })()
            
       });
   });
});