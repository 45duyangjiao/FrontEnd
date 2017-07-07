/*----------------------------页面初始化的时候就要加载数据--------------------------------*/
mui.ajax("url",{
	data:{
		userId:""
	},
	type:"post",
	dataType:"json",
	success:function(data){
		var newsZanPageUl = document.getElementsByTagName("ul")[0];
		mui.each(data,function(index,value){
			var newsZanLi = '<li class="newsZanLi"><img src="'+value.img+'"/><span>'+value.name+'</span></li>';
			newsZanPageUl.appendChild(newsZanLi);
		})
	}
});
