$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
     
//	var userID = GetQueryString("userID");
	var group = $(".mui-slider-group");
  var cityname = GetQueryString("userID");
	
	$.ajax({
		url: 'http://47.93.192.128:5001/News/GetMyChannelList',
		dataType: 'json',
		type: 'post',
		data: {
			UserId: 10035
		},
		success: function(data) {
			var dataNav = data.Data.Data;
			
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
							areaid: "", //number	否	区域id
							cityname: "",
							userid: 10035
						},
						success: function(data) {
							
							//这个模板生成的字符串整个放到外面大容器里
							data.Data.typeid = typeid
							var htmlStr = template("newsList", {
								list: data.Data
							});
							

							if(typeid == 5) {
								
								$("#BaiduMap").addClass("BaiduMapActive");
								//开始
								var _getParam = function(obj, param) {
									return obj[param] || '';
								};
								var cityPicker = new mui.PopPicker({
									layer: 2
								});
								cityPicker.setData(cityData);
								var showCityPickerButton = document.getElementById('showCityPicker');
								var cityResult = document.getElementById('cityResult');
								showCityPickerButton.addEventListener('click', function(event) {
								    
									cityPicker.show(function(items) {
										cityResult.innerText = items[1].text;
										var cityname = items[1].text;
										localStorage.setItem("cityname", cityname)
										var cityname = localStorage.getItem("cityname");
										if(cityname !== null) {
											var typeid = localStorage.getItem("typeid");
											
											$.ajax({
												type: "post",
												url: "http://47.93.192.128:5001/News/NewsList",
												async: true,
												dataType: 'json',
												data: {
													pageindex: "", //number	否	页数，不填默认第一页	1
													typeid: typeid, //number	否	栏目类型id	1
													proid: "", //number	否	省id	3
													cityid: "", //number	否	城市id	5
													areaid: "", //number	否	区域id
													cityname: cityname,
													userid: 10035
												},
												success: function(data) {
													
													//这个模板生成的字符串整个放到外面大容器里
													typeid = 5;
													data.Data.typeid = typeid;
													data.Data.cityname = cityname;
													
													var htmlStr = template("newsList", {
														list: data.Data
													})
													
													
													
													
													$("#" + typeid).html(htmlStr);
													group.children(":first").addClass("mui-active");
													$("#cityResult").innerText = cityname;
													$(".mediaId").click(function() {
														
														let id = $(this).attr('id'); // 获取id
														let viewCount = $(this).attr('viewCount');
														let commentCount = $(this).attr("commentCount");
														window.location.href = "newsDetailPage.html?id=" + id + "&userID=" + 10035 + "&commentCount=" + commentCount;
													});
												}
											});

										}

									});

								});

								//结束
							}
							$("#" + typeid).html(htmlStr);
							group.children(":first").addClass("mui-active");
//							$("#cityResult").innerText = cityname;
							$(".mediaId").click(function() {
								
								let id = $(this).attr('id'); // 获取id
								let commentCount = $(this).attr("commentCount");
								window.location.href = "newsDetailPage.html?id=" + id + "&userID=" + 10035 + "&commentCount=" + commentCount;
							});

						},
						
					});
				} else {
					firstDiv.clone().attr("id", id).appendTo(group);
				}

			}

		},
		
	});
    function ajaxModel(typeid,slide){
    	$.ajax({
			type: "post",
			url: "http://47.93.192.128:5001/News/NewsList",
			async: true,
			dataType: 'json',
			data: {
				pageindex: "", //number	否	页数，不填默认第一页	1
				typeid: typeid, //number	否	栏目类型id	1
				proid: "", //number	否	省id	3
				cityid: "", //number	否	城市id	5
				areaid: "", //number	否	区域id
				cityname: cityname,
				userid:10035
			},
			success: function(data) {
				
				//这个模板生成的字符串整个放到外面大容器里
				typeid = 5;
				data.Data.typeid = typeid;
				data.Data.cityname = cityname;
				
				var htmlStr = template("newsList", {
					list: data.Data
				})
				
				$("#" + typeid).html(htmlStr);
				group.children(":first").addClass("mui-active");
				$("#cityResult").innerText = cityname;
				$(".mediaId").click(function() {
					let id = $(this).attr('id'); // 获取id
					let viewCount = $(this).attr('viewCount');
					let commentCount = $(this).attr("commentCount");
					window.location.href = "newsDetailPage.html?id=" + id + "&userID=" + 10035 + "&commentCount=" + commentCount;
				});
				showCityM(typeid)
			}
		});
		
    }
    
    
    function showCityM(typeid){
    	 if(typeid == 5) {
					//开始
					var _getParam = function(obj, param) {
						return obj[param] || '';
					};
					var cityPicker = new mui.PopPicker({
						layer: 2
					});
					cityPicker.setData(cityData);
					var showCityPickerButton = document.getElementById('showCityPicker');
					var cityResult = document.getElementById('cityResult');
					console.log(showCityPickerButton)
					showCityPickerButton.addEventListener('click', function(event) {
//						alert('daye')
						cityPicker.show(function(items) {
							cityResult.innerText = items[1].text;
							var cityname = items[1].text;
							localStorage.setItem("cityname", cityname)
							var cityname = localStorage.getItem("cityname");
							if(cityname !== null) {
								var typeid = localStorage.getItem("typeid");
								ajaxModel();

							}

						});

					});

					//结束
				}
    }
   
	document.getElementById('slider').addEventListener('slide', function(e) {
		var slide = group.children().eq(e.detail.slideNumber);
		var typeid = slide.attr("id");
		ajaxModel(typeid,slide);
		
		
	});

	$(".navAdd").click(function() {
		
		window.location.href = "newsarea.html?userID=" + 10035;
	})

});