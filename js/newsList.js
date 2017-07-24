$(document).ready(function() {
	var group = $(".mui-slider-group");

	$.ajax({
		url: 'http://47.93.192.128:5001/News/NewsNavBar',
		dataType: 'json',
		type: 'post',
		success: function(data) {
			var dataNav = data.Data.Data;
			//渲染新闻导航栏
			var str = template("newsNav", {
				list: dataNav
			})
			$(".newsNav").html(str).children(":first").addClass("mui-active");
			
			//根据新闻导航渲染对应页签
			var firstDiv = group.children(":first");
			for(var i = 0, len = dataNav.length; i < len; i++){
				var id = dataNav[i].Id;
				
				if(i == 0){
					firstDiv.attr("id", id);
				}else{
					firstDiv.clone().attr("id", id).appendTo(group);
				}

			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
	
	document.getElementById('slider').addEventListener('slide', function(e) {
		var slide = group.children().eq(e.detail.slideNumber);
        var newsId=slide.attr("id");
		console.log(newsId)
		$.ajax({
			url: "http://47.93.192.128:5001/News/NewsList",
			dataType: 'json',
			type: 'post',
			data: {
				pageindex: "", //number	否	页数，不填默认第一页	1
				typeid: newsId, //number	否	栏目类型id	1
				proid: "", //number	否	省id	3
				cityid: "", //number	否	城市id	5
				areaid: "" //number	否	区域id
			},
			success: function(data) {
				console.log(data);
				//这个模板生成的字符串整个放到外面大容器里
				var htmlStr = template("newsList", {
					list: data.Data.Data
				})
				$("#"+newsId).html(htmlStr);
				$(".mediaId").click(function() {
					let id = $(this).attr('id'); // 获取id
					console.log(id)
					window.location.href = "newsContent.html?id=" + id;
				})
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus);
			}
		});
	});
});