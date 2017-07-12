mui.init();
/*-------------------------------------------------字符串拼接封装----------------------------*/
function joint(Data, target, HTMLs) {
	$.each(Data.Data, function(index, value) {
		if(value.pics.length) {
			HTMLs += '<li class="mui-table-view-cell viewcellHeight" id="' + value.id + '"><div class="muipurelyTitle">' + value.title + '</div><div class="muipurelyImg" id="purelyImg">'
			$.each(value.pics, function(index, value) {
				HTMLs += '<img src="' + value + '" alt="">'
			})
			HTMLs += '</div>';
			HTMLs += '<div class="muipurelytext "><p class="muipurelylook clearfix"><span class="lookLeft">' + value.publishDate +
				value.source + '</span><span class="lookRight"><i class="look"></i>' + value.viewCount + '</span></p></div></li>';
		} else if(value.pics.length == 0 && value.thumbImg) {
			HTMLs += '<li class="mui-table-view-cell" id="' + value.id + '"><div class="mui-table-Img">' +
				'<img src="' + value.thumbImg + '"/></div><div class="mui-table-text"><p class="mui-table-Tile">' + value.title + '</p>' +
				'<p class="mui-table-look"><span class="lookLeft">' + value.publishDate + value.source + '</span><span class="lookRight">' +
				'<i class="look"></i>' + value.viewCount + '</span></p></div></li>'
		} else {
			HTMLs += '<li class="mui-table-view-cell" id="' + value.id + '"><div class="muipurelyTitle">' + value.title + '</div>' +
				'<div class="muipurelytext "><p class="muipurelylook clearfix"><span class="lookLeft">' + value.publishDate +
				value.source + '</span><span class="lookRight"><i class="look"></i>' + value.viewCount + '</span></p></div></li>';
		}

		$(target).append(HTMLs);
	});
};
/*-------------------------------------------------加载导航栏----------------------------*/
$.ajax({
	url: "http://d2p7pk.natappfree.cc/News/NewsNavBar",
	type: "post",
	dataType: "json",
	success: function(datas) {
		//console.log("navnavnav",datas); csww 
		var navData = datas.Data.Data;
		if(navData.length){
			var navHtml = '';
			var listHtml = '';
			$.each(navData, function(index, value) {
				navHtml += '<a id="' + value.Id + '" class="mui-control-item" href="#item' + value.Id + 'mobile">' + value.Title + '</a>';
				listHtml += '<div id="item' + value.Id + 'mobile" class="mui-slider-item mui-control-content mui-active"><div id="scroll1" class="mui-scroll-wrapper"><div class="mui-scroll"><ul class="mui-table-view"></ul></div></div></div>';
			})
			$("#muiScroll").append(navHtml);
			$("#muiScroll").children().eq(0).addClass("mui-active"); //新闻导航栏的第一个默认为active
			$("#muiSliderGroup").append(listHtml);
		}
	},
	error: function(xhr, type) {
		console.log(type);
	}
});
/*-------------------------------------------------默认调用加载第一新闻列表----------------------------*/
$.ajax({
	url: "http://d2p7pk.natappfree.cc/News/NewsList",
	data: {
		typeid: $("#muiScroll").children().eq(0).attr("id"),
		pageindex: 3,
		proid: "",
		cityid: "",
		areaid: ""
	},
	type: "post",
	dataType: "json",
	success: function(data) {
		// 		console.log(data);
		var newData = data.Data;
		if(newData) {
			var newListHtml = '';
			if($("#muiScroll").children().eq(0).attr("id") == "5") {
				var areaDiv = $('<div class="BaiduMap"><span class="areamap">点击选择城市 <i></i></span></div>');
				areaDiv.insertBefore("#item5mobile .mui-scroll");
				joint(newData, "#item5mobile .mui-table-view", newListHtml);
			} else {
				joint(newData, "#item" + data.typeid + "mobile .mui-table-view", newListHtml);
			}
		}
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration: deceleration
		});
		callMui(mui);
	},
	error: function(type) {
		console.log(type);
	}
});
/*-------------------------------------------------导航栏的点击事件----------------------------*/
$("#muiScroll").on('tap', '#muiScroll .mui-control-item', function() {
	//获取id
	var id = this.getAttribute("id");
	console.log(id)
	$("#item" + id + "mobile").show().siblings().hide();
	$.ajax({
		url: "http://d2p7pk.natappfree.cc/News/NewsList",
		data: {
			typeid: id,
			pageindex:3,
			proid:"",
			cityid:"",
			areaid:""
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			console.log(data);
			var newData = data.Data;
			if(newData) {
				var newListHtml = '';
				if($("#muiScroll").children().eq(0).attr("id") == 5) {
					/*var areaDiv = $('<div class="BaiduMap"><span class="areamap">点击选择城市 <i></i></span></div>');
					areaDiv.insertBefore("#item5mobile .mui-scroll");*/
					joint(newData, "#item5mobile .mui-table-view", newListHtml);
				} else {
					joint(newData, "#item" + data.typeid + "mobile .mui-table-view", newListHtml);
				}
			}
		},
		error: function(type) {
			console.log(type);
		}
	})
});

	function callMui($) {
		$.ready(function() {
			//阻尼系数
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			$('.mui-slider-group .mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			})
		});
				//循环初始化所有下拉刷新，上拉加载。
				$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					$(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									var ul = self.element.querySelector('.mui-table-view');
									ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
									self.endPullDownToRefresh();
								}, 1000);
							}
						},
						up: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									var ul = self.element.querySelector('.mui-table-view');
									ul.appendChild(createFragment(ul, index, 5));
									self.endPullUpToRefresh();
								}, 1000);
							}
						}
					});
				});
				var createFragment = function(ul, index, count, reverse) {
					var length = ul.querySelectorAll('li').length;
					var fragment = document.createDocumentFragment();
					var li;
					/*for (var i = 0; i < count; i++) {
						li = document.createElement('li');
						li.className = 'mui-table-view-cell';
						li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
						fragment.appendChild(li);
					}
					return fragment;*/
				};
	};