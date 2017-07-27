$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var userID = GetQueryString("userID");

	var group = $(".mui-slider-group");

	$.ajax({
		url: 'http://47.93.192.128:5001/News/GetMyChannelList',
		dataType: 'json',
		type: 'post',
		data: {
			UserId: 10002
		},
		success: function(data) {
			var dataNav = data.Data.Data;
			console.log(dataNav);			//渲染新闻导航栏
			var str = template("newsNav", {
				list: dataNav
			})
			$(".newsNav").html(str).children(":first").addClass("mui-active");

			//根据新闻导航渲染对应页签
			var firstDiv = group.children(":first");
			for(var i = 0, len = dataNav.length; i < len; i++) {
				var id = dataNav[i].typeid;
				if(i == 0) {
					firstDiv.attr("id", id);
					var typeid = firstDiv.attr("id");
					$.ajax({
						url: "http://47.93.192.128:5001/News/NewsList",
						dataType: 'json',
						type: 'post',
						data: {
							pageindex: "", //number	否	页数，不填默认第一页	1
							typeid: typeid, //number	否	栏目类型id	1
							proid: "", //number	否	省id	3
							cityid: "", //number	否	城市id	5
							areaid: "" //number	否	区域id
						},
						success: function(data) {
							console.log(data);
							//这个模板生成的字符串整个放到外面大容器里
							var htmlStr = template("newsList", {
								list: data.Data.Data
							});
							console.log(typeid);
							
							if(typeid==5){
								console.log($("#BaiduMap"))
								$("#BaiduMap").addClass("BaiduMapActive");
							}
							$("#" + typeid).html(htmlStr);
							group.children(":first").addClass("mui-active")
							$(".mediaId").click(function() {
								let id = $(this).attr('id'); // 获取id
								let viewCount = $(this).attr('viewCount');
								let commentCount=$(this).attr("commentCount");
								window.location.href = "newsDetailPage.html?id=" + id + "&viewCount=" + viewCount+"&userID="+10005+"&commentCount="+commentCount;
							});
							
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
//							alert(textStatus);
						}
					});
				} else {
					firstDiv.clone().attr("id", id).appendTo(group);
				}

			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
		}
	});

	document.getElementById('slider').addEventListener('slide', function(e) {
		var slide = group.children().eq(e.detail.slideNumber);
		var typeid = slide.attr("id");
		console.log(typeid)
		$.ajax({
			url: "http://47.93.192.128:5001/News/NewsList",
			dataType: 'json',
			type: 'post',
			data: {
				pageindex: "", //number	否	页数，不填默认第一页	1
				typeid: typeid, //number	否	栏目类型id	1
				proid: "", //number	否	省id	3
				cityid: "", //number	否	城市id	5
				areaid: "" //number	否	区域id
			},
			success: function(data) {
				console.log(data);
				//这个模板生成的字符串整个放到外面大容器里
				data.Data.typeid = typeid
				console.log(data.Data)
				var htmlStr = template("newsList", {
					list: data.Data
				})
				console.log(typeid);
				$("#" + typeid).html(htmlStr);
				group.children(":first").addClass("mui-active")
				$(".mediaId").click(function() {
					let id = $(this).attr('id'); // 获取id
					let viewCount = $(this).attr('viewCount');
					let commentCount=$(this).attr("commentCount");
					console.log(id)
					window.location.href = "newsDetailPage.html?id=" + id + "&commentCount="+commentCount;
				})
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				alert(textStatus);
			}
		});
	});

	$(".navAdd").click(function() {
		window.location.href = "newsarea.html?userID=" + 10002;
	})

});