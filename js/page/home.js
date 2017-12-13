require(['../config'],function () {
    require(['jquery','template','data','easemove','cookie','swiper','lazyload'],function ($,template,data,easemove,cookie) {
        $(function () {
            //首页轮播图
            var homeSwiper = new Swiper('#slider', {
                autoplay: 4000,
                speed:600,
                loop:true,
                pagination: '.swiper-pagination',
                paginationClickable :true,
                autoplayDisableOnInteraction : false,
            });
            var itemSlider = new Swiper('#itemSlider',{
                autoplay: 2000,
                autoplayDisableOnInteraction : false,
                slidesPerView: 4,
                loop:true,
                paginationClickable: true,
                spaceBetween: 30,
                freeMode: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
            });
            //模板填充
            function timfill(data) {
                // $('#ylitembox').html(template('yltem',data.yldata));
                $('.dbcolbox').each(function () {
                    $(this).html(template('dbcolboxtem',data.kinddata));
                });
                var officeEq = [];
                data.kinddata.forEach( value =>{if(value.kind == 'officeEq') officeEq.push(value);});
                $('.sgcol').each(function () {
                    $(this).html(template('sgcoltem',officeEq));
                });
                $('.trcol>div').each(function () {
                    $(this).html(template('trcoltem',data.trcoldata));
                });
            }
            timfill(data);
            //猜你喜欢数据请求
            $.post('/cart-get_like_goods.html',{limit:12},function(data){
                var data = JSON.parse(data);
                $('#ylitembox').html(template('yltem',data.data.like));
            });
            //图片懒加载处理
            $('img.lazy').lazyload({effect: 'fadeIn'});
            //标题栏置顶&返回顶部按钮显示
            function menu2top() {
                $(window).scroll(function () {
                    if($(window).scrollTop() >= 600){
                        $('#menutop').fadeIn(600);
                        $('#sidebar li:last').fadeIn();
                    }else{
                        $('#menutop').fadeOut(600);
                        $('#sidebar li:last').fadeOut();
                    }
                });
            }
            menu2top();
            //滚动返回顶部
            $('#sidebar li:last').click(function () {
                var timer = setInterval(function () {
                    $(window).scrollTop(parseInt($(window).scrollTop() - $(window).scrollTop()*0.2));
                    if($(window).scrollTop()<=0) clearTimeout(timer);
                },20);
            });
            //鼠标滑动至图片左移
            function imgmousetoggle() {
                $('.item img').hover(function () {
                    $(this).stop().animate({left:-5},200);
                },function () {
                    $(this).stop().animate({left:0},200);
                });
            }
            imgmousetoggle();
            //滚动左侧边栏
            (function () {
                sidebar();
                function sidebar() {
                    sideInit();
                    sideclick();
                }
                function sideInit() {
                   $(window).scroll(function () {
                       if($(window).scrollTop() >= $('#itemkind').offset().top-50 && $(window).scrollTop() <= $('#itemkind').offset().top+$('#itemkind').height() - 300){
                           $('#sidebarscroll').fadeIn(400);
                           $('#itemkind>div').each(function () {
                               if($(window).scrollTop()>=$(this).offset().top - 50){
                                    $('#sidebarscroll li').each(function () {
                                       $(this).css({backgroundColor:'#918888'});
                                    });
                                    $('#sidebarscroll li').eq($(this).index()).css({backgroundColor : '#d70b1c'});
                               }
                           });
                       }else{
                           $('#sidebarscroll').fadeOut(400);
                       }
                   });
                }
                function sideclick() {
                   $('#sidebarscroll li').click(function () {
                       var newsrollTop = $('#itemkind>div').eq($(this).index()).offset().top - 48 ;
                       $('body,html').animate({
                           scrollTop : newsrollTop
                       },500)
                   });
                }
            })();
            //购物车简略显示
            // function showcart() {
            //     $('#myShoppingCart').hover(function () {
            //         $('#cartList').stop().fadeIn(400);
            //         $(this).css({
            //             'border-bottom':'0px',
            //             'z-index':'2000'
            //         });
            //     },function () {
            //         $('#cartList').stop().fadeOut(400);
            //         $(this).css('border-bottom','1px solid #d4d4d4');
            //     });
            // }
            // showcart();
            // 购物车移除效果
            (function(){
                $('#cartList').on('click','.remove',function(){
                    $(this).closest('.itemdiv').animate({
                        left : 20
                    },100);
                    $(this).closest('.itemdiv').animate({
                        left : -150,
                        opacity : 0
                    },250,function(){
                        $(this).remove();
                    });
                });
            })();

            //搜索提示功能
            (function () {
                var ipt = document.querySelector('#search input');
                var datalist = document.querySelector('#datalist');
                datalist.onclick = function (e) {
                    var e = e || event;
                    var target = e.target || e.srcElement;
                    ipt.value = target.innerHTML;
                };
                ipt.oninput = function () {
                    if(this.value == ''){
                        datalist.style.display = 'none';
                    }else{
                        var url = "http://suggestion.baidu.com/su?wd="+this.value+"&cb=jsonpcallback";
                        jsonp(url);
                    }
                };
                document.onclick = function () {
                    datalist.style.display = 'none';
                };
                window.jsonpcallback = function(data) {
                    datalist.innerHTML = template('searchtem',data.s);
                    datalist.style.display = 'block';
                };
                function jsonp(url) {
                    var script = document.createElement('script');
                    script.src = url;
                    document.body.appendChild(script);
                    script.remove();
                }
            })();
            //用户身份验证
            function userverify(){
                var cookiestr = cookie.get('officemate');
                if(cookiestr){
                    var officemate = JSON.parse(cookiestr);
                    if(officemate.username){
                        $('#login').html('<p>您好，<a>'+officemate.username+'</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="logoff">注销</a></p>');
                        $('#welcome p').last().html(officemate.username);
                    }
                }
                $('#login').on('click','.logoff',function(){
                    cookie.set('officemate',JSON.stringify([]));
                    document.location.reload();
                });
            }
            userverify();
            //购物车缩略图数据显示
            (function(){
                if(cookie.get('officecart')){
                    var officecart = JSON.parse(cookie.get('officecart'));
                    if(officecart.length>0){
                        $('#cartList .lastchild').css('display','block');
                        $('#cartList .empty').css('display','none');
                        $('#cartList').prepend(template('cartmini',officecart));
                        $('.number').each(function(){
                            $(this).html(officecart.length);
                        });
                        var sum = 0;
                        officecart.forEach(function(value){
                            sum += parseFloat(String(value.price).slice(1))*parseFloat(value.num);
                        });
                        $('#finsum').html('￥'+String(sum).slice(0,5));
                        $('.minicartname').each(function(){
                            var str = $(this).text();
                            if(str.length > 20){
                                $(this).html(str.slice(0,20)+'...');
                            }
                        });
                    }else{
                        $('#cartList .lastchild').css('display','none');
                        $('#cartList .empty').css('display','block');
                    }
                }else{
                    $('#cartList .lastchild').css('display','none');
                    $('#cartList .empty').css('display','block');
                }
            })()
        });
    });
});
