define(['jquery','cookie'],function($,cookie){
	//向数据库更新购物车数据
	  function changedb(officemate,carts){
        if(officemate){
        	var officemate = JSON.parse(officemate);
        	$.post('/docart',{
				dao : 'query',
	        	username : officemate.username
        	},function(data){
        		if(data == 'empty'){
        			$.post('/docart',{
			        	dao : 'add',
			        	username : officemate.username,
			        	cart : JSON.stringify(carts)
			        });
        		}else{
        			$.post('/docart',{
			        	dao : 'update',
			        	username : officemate.username,
			        	cart : JSON.stringify(carts)
			        });
        		}
        	});
	    }
    }

	function ckadddb(){
		var ckcart = cookie.get('officecart');
		var dbcart = [];
		var officemate = cookie.get('officemate');
		if(ckcart){
			ckcart = JSON.parse(ckcart);
		}else{
			ckcart = [];
		}
        if(officemate){
          var officemate = JSON.parse(officemate);
          $.ajax({
          	type : 'POST',
          	url : '/docart',
          	data : {
          		dao : 'query',
          		username : officemate.username
          	},
          	async : false,
          	success : function(data){
				if(data == 'empty'){
		            dbcart = [];
	            }else{
	              dbcart = JSON.parse(data);
	            }
	        }
          });
        }
        //去重
        // console.log(dbcart[0]);
        for(var i=0; i<dbcart.length; i++){
        	for(var j=0; j<ckcart.length; j++){
        		if(dbcart[i].name == ckcart[j].name && dbcart[i].name != undefined){
        			if(!JSON.parse(cookie.get('officemate')).syn){
        				ckcart[j].num = parseFloat(ckcart[j].num) + parseFloat(dbcart[i].num);
        			}
        			var k = dbcart.splice(i,1);
        			i--;
        			break; 
        		}
        	}
        	if (j == ckcart.length && JSON.parse(cookie.get('officemate')).syn == 1) {
        		dbcart.splice(i,1);
        		i--;
        	}
        }
        // console.log(dbcart[0],ckcart[0]);
        if(cookie.get('officemate') && !JSON.parse(cookie.get('officemate')).syn){
        	var t = JSON.parse(cookie.get('officemate'));
        	t.syn = 1;
        	cookie.set('officemate',JSON.stringify(t));

        }
        var carts = ckcart.concat(dbcart);
        var officemate = cookie.get('officemate');
        cookie.set('officecart',JSON.stringify(carts));
      	changedb(officemate,carts);
        return carts;
	}
	return {
		ckadddb : ckadddb,
		changedb : changedb
	}
});