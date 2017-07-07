/*-----------------------------ajax请求此会员用户的活动记录--------------------------------------*/

mui.ajax("http://d2p7pk.natappfree.cc/Center/ActivictyRecord",{
	data:{
		userId:
	},
	dataType:'json',//服务器返回json格式数据
	type:'post',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	success:function(data){
		/*data是后台处理好，前台是显示用的*/
		$.each(data,function(index,value){
			var activationLi = $('<li class="activationRecordLi"><div class="EventTitle">'+ value.name
			+'</div><div class="EventTime">活动时间：'+ value.time+'</div></li>');
			$(".activationRecord").append(activationLi);
		});
	},
	error:function(xhr,type,errorThrown){
		console.log(type);
	}
}) 