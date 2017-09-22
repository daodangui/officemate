require(['../config'],function () {
   require(['jquery','cookie','template','lazyload','swiper'],function ($,cookie,template) {
       //加载页面头部和底部
       $('header').load('./commonhead.html',function () {
           $('img.lazy').lazyload({effect: 'fadeIn'});
           //用户身份验证
            function userverify(){
                var cookiestr = cookie.get('officemate');
                if(cookiestr){
                    var officemate = JSON.parse(cookiestr);
                    if(officemate.username){
                        $('#login').html('<p>您好，<a>'+officemate.username+'</a></p>');
                    }
                }
            }
            userverify();
       });
       $(function () {
           //加载页面footer部分
           $('footer').load('./commonfooter.html',function () {
               $('img.lazy').lazyload({effect: 'fadeIn'});
           });
           //图片懒加载处理
           $('img.lazy').lazyload({effect: 'fadeIn'});
           $('.conleft img').hover(function () {
               $(this).stop().animate({left:-5},200);
           },function () {
               $(this).stop().animate({left:0},200);
           });

           //模板加载
           $.post('/cart-get_like_goods.html',{limit:10},function(data){
              var data = JSON.parse(data);
              $('#youlike>ul').html(template('yltem',data.data.like.slice(0,5)));
              $('#history>ul').html(template('httem',data.data.like.slice(5)));
           });

           // 图片省略图轮播
           var imgSlider = new Swiper('#imgSlider',{
               prevButton:'.swiper-button-prev',
               nextButton:'.swiper-button-next',
               slidesPerView: 4,
               spaceBetween: 10
           });
           $('.swiper-slide').mouseenter(function () {
               $(this).siblings().css('border','0px');
               $(this).css('border','2px solid #ff6600');
               $('.imgbox img').attr('src',$(this).find('img').attr('src').replace('1','2'));
           });
           //购买数量变更
           $('.buy .sub').click(function () {
               $('#num').val(Math.max(1,parseInt($('#num').val())-1));
           });
           $('.buy .add').click(function () {
               $('#num').val(parseInt($('#num').val())+1);
           });
           //查看大图
           function area() {
               var areabox = document.createElement('span');
               areabox.id = 'areabox';
               var beilv = $('#am').width()/100;
               var amwidth = beilv*$('#imgbox').width();
               var amimg = new Image();
               amimg.id = 'amimg';
               amimg.width = amwidth;
               $('#imgbox').hover(function () {
                   amimg.src = $(this).find('img').attr('src').replace('2','3');
                   $('#imgbox').append($(areabox));
                   $('#am').append($(amimg));
                   $('#am').css('display','block');
               },function () {
                   $('#areabox').remove();
                   $('#am').css('display','none');
               }).mousemove(function (e) {
                   $('#areabox').css({
                       left : Math.min($('#imgbox').offset().left+$('#imgbox').width()-$('#areabox').width(),Math.max($('#imgbox').offset().left,e.pageX - $('#areabox').width()/2))- $('#imgbox').offset().left,
                       top : Math.min($('#imgbox').offset().top+$('#imgbox').height()-$('#areabox').height(),Math.max($('#imgbox').offset().top,e.pageY - $('#areabox').height()/2))- $('#imgbox').offset().top
                   });
                   $('#am img').css({
                       left : -(beilv*($('#areabox').offset().left - $('#imgbox').offset().left)),
                       top : -(beilv*($('#areabox').offset().top - $('#imgbox').offset().top))
                   });
               });
           }
           area();
           //标签面板
           $('#crbottom>ul>li').click(function(){
              $('#crbottom>ul>li').css({
                backgroundColor : '#fafafa',
                color : 'black'
              });
              $('.crbcontent>div').css('display','none');
              $(this).css({
                backgroundColor : 'red',
                color : 'white'
              });
              $('.crbcontent>div').eq($(this).index()).css('display','block');
           });
       });
       //点击大图查看（遮罩效果）
       (function(){
          var imgArr = [];
          for(var i=0; i<5; i++){
            imgArr.push("../images/item/"+String.fromCharCode('a'.charCodeAt()+i)+"3.jpg");
          }
          $('.searchplus').click(function(){
              var maskDiv = document.createElement('div');
              maskDiv.id = 'mask';
              var  off = document.createElement('span');
              off.id = 'off';
              off.innerText = '×';

              $(document.body).append($(maskDiv));
              $(maskDiv).css({width : $(window).width(), height : $(window).height(),top : $(window).scrollTop()});
              var imgBig = new Image();
              imgBig.id = 'imgBig';
              imgBig.src = imgArr[0];
              $(maskDiv).append($(imgBig));
              $(imgBig).css({width : $(window).width()*0.4});
              $(document.body).append($(off));
              $(off).css({top : parseInt($(window).scrollTop())+$(window).height()*0.07});
              var k = 0;
              var z = 4;
              $(maskDiv).on('click',function (e) {
                  if(e.clientX >= $(window).width()*0.5){
                      if(k>=z) alert('已经是最后一张了');
                      else imgBig.src = imgArr[++k];
                  }else{
                      if(k <=0) alert('已经是第一张了');
                      else imgBig.src = imgArr[--k];
                  }
              });
              $(document).on('click','#off',function () {
                  $(maskDiv).remove();
                  $(imgBig).remove();
                  this.remove();
              });

              $(window).resize(function () {
                  $('#mask').css({width : $(window).width(), height : $(window).height()});
                  $('#imgBig').css({width : $(window).width()*0.4});
              });

          });
          window.addEventListener('mousewheel',function(e){
            if($('#imgBig').length > 0)
              e.preventDefault();
          });
       })();

   }) ;
});