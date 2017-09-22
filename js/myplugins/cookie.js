define([],function () {
    var cookie = {
        set : function (name,value,date) {
            if(date){
                var d = new Date();
                d.setDate(d.getDate() + date);
                document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/';
            }else{
                document.cookie = name + '=' + value + ';path=/';
            }
        },
        get : function (name) {
            var cookies = document.cookie.split(';');
            for(var i in cookies){
                if(cookies[i].startsWith(' '+name)){
                    return cookies[i].split('=')[1];
                }
            }
        }
    };
    return cookie;
});