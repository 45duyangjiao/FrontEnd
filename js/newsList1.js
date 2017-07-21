$(document).ready(function() {

	var url = 'http://47.93.192.128:5001/News/NewsNavBar';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			console.log(data);
			//新闻导航栏的结构
			var str = template("newList", {
				newList: data.Data.Data
			})
			$(".newList").html(str);
			$("#sliderSegmentedControl>div a:first-child").addClass("mui-active");
			$(".mui-control-item").click(function() {
				var typeid = $(this).attr('name'); // 获取id
				console.log(typeid);
				localStorage.setItem("typeid", typeid);
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
						var OID = localStorage.typeid;
						console.log(OID, "a");
						//这个模板生成的字符串整个放到外面大容器里
						var htmlStr = template("newsList", {
							list: data.Data.Data
						})
						$(".mui-slider-group").html(htmlStr);
						$(".TabId").attr("id", OID)
						$(".TabIdSon").attr("id", 'scroll' + OID)
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
			var defultId = $("#sliderSegmentedControl>div a:first-child").attr("name");
			console.log(defultId)
			$.ajax({
				url: "http://47.93.192.128:5001/News/NewsList",
				dataType: 'json',
				type: 'post',
				data: {
					pageindex: "", //number	否	页数，不填默认第一页	1
					typeid: defultId, //number	否	栏目类型id	1
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
					$(".mui-slider-group").html(htmlStr);

					$(".mui-table-view-cell mui-media").click(function(e) {
						let id = $(this).attr('id'); // 获取id
						console.log(id)
						window.location.href = "newsContent.html?id=" + id;
					})
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus);
				}
			});

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});

});