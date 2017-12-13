require(['../config'],function () {
   require(['jquery','template','cookie','ckadddb','dragdrop','lazyload'],function ($,template,cookie,ckdb,dragdrop) {
       //加载页面头部和底部
       $('header').load('./commonhead.html',function () {
           $('img.lazy').lazyload({effect: 'fadeIn'});
           //用户身份验证
            function userverify(){
                var cookiestr = cookie.get('officemate');
                if(cookiestr){
                    var officemate = JSON.parse(cookiestr);
                    if(officemate.username){
                        $('#login').html('<p>您好，<a>'+officemate.username+'</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="logoff">注销</a></p>');
                    }
                }
                $('#login').on('click','.logoff',function(){
                    cookie.set('officemate',JSON.stringify([]));
                    document.location.reload();
                });
            }
            userverify();
       });
       //加载页面footer部分
       $('footer').load('./commonfooter.html',function () {
           $('img.lazy').lazyload({effect: 'fadeIn'});
       });
       $(function () {
           //图片懒加载处理
           $('img.lazy').lazyload({effect: 'fadeIn'});
           //商品模板
           (function(){
              $.post('/cart-get_like_goods.html',{limit:20},function(data){
                var data = JSON.parse(data);
                $('#itemsbox').html(template('itemtem',data.data.like));
              });
              
           })();
           //点击增减商品数量
           $('#itemsbox').on('click','.sub',function(){
              $(this).siblings('input').val(Math.max(1,parseInt($(this).siblings('input').val())-1));
           });
           $('#itemsbox').on('click','.add',function(){
              $(this).siblings('input').val(parseInt($(this).siblings('input').val())+1);
           });
           //添加商品到购物车
           (function(){
              $('#itemsbox').on('click','.intocart',function(e){
                var $this = $(this);
                var $itemdom = $(this).closest('.item');
                var item = {
                  image_url : $itemdom.find('img').attr('src'),
                  name : $itemdom.find('h5').html(),
                  price : $itemdom.find('.price').html(),
                  num : parseInt($itemdom.find('input').val())
                }
                if(cookie.get('officecart')){
                    var officecart = JSON.parse(cookie.get('officecart'));
                    for(var i=0; i<officecart.length; i++){
                      if(officecart[i].name == item.name){
                        officecart[i].num += item.num;
                        break;
                      }
                    }
                    if(i == officecart.length)
                      officecart.push(item);
                }else{
                    var officecart = [];
                    officecart.push(item);
                }
                cookie.set('officecart',JSON.stringify(officecart));
                ckdb.ckadddb();
                $('#success').css({
                  display : 'block',
                  left : parseInt($this.offset().left)-50,
                  top : parseInt($this.offset().top)+30
                });
              });
              $('#success').on('click','.close',function(){
                  $('#success').css('display','none');
              });
              dragdrop($('#success').get(0),{x:true,y:true,limt:false});
           })();
       });
       
   });
});