define([],function () {
    //ease运动插件
    function ease(obj,target,time) {
        //初始化
        clearInterval(obj.t);
        target.left = target.left||obj.offsetLeft;
        target.top = target.top||obj.offsetTop;
        target.width = target.width||parseInt(getComputedStyle(obj).width);
        target.height = target.height||parseInt(getComputedStyle(obj).height);
        target.opacity = target.opacity||parseFloat(getComputedStyle(obj).opacity);
        var source = {};
        for(var i in target){
            if(i == 'opacity'){
                source[i] = parseFloat(getComputedStyle(obj)[i]);
            }else{
                source[i] = parseInt(getComputedStyle(obj)[i]);
            }
        }
        var deg = 0;
        obj.t = setInterval(function () {
            for(var i in source){
                if(i == 'opacity'){
                    obj.style[i] = source[i] + (target[i] - source[i])*Math.sin(deg*Math.PI/180);
                }else{
                    obj.style[i] = source[i] + (target[i] - source[i])*Math.sin(deg*Math.PI/180) + 'px';
                }
            }
            deg+=90/(time*5/100);
            if(deg >= 90){
                clearInterval(obj.t);
            }
        },1000/50);
    }

    return {
        easemove : ease
    }
});