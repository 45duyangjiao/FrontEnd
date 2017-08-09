function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var id = GetQueryString("id");
var userID=GetQueryString("userID");

function texts(id,commentCount,userID) {
	window.location.href = "announceContent.html?id=" + id+"&commentCount="+commentCount+"&userID="+10005;
}
var urlPath="http://47.93.192.128:5001/";
var NavUrl = urlPath+"Notice/NoticeNavBar";
var ListUrl = urlPath+"Notice/Notice_List";

//加载列表的方法
function innerList(typeid) {

	$.ajax({
		type: "post",
		url: ListUrl,
		data: {
			type_id: typeid,
			pageindex: 1
		},
		datatype: "json",
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			var fragment = document.createDocumentFragment(); //创建一个代码片段
			var li;
			if(typeof(data.Data.Data) != "undefined") {
				for(var i = 0; i < data.Data.Data.length; i++) { //循环输出data中的数据
					li = document.createElement('li');
					li.id=data.Data.Data[i].Id;
					var commentCount=data.Data.Data[i].commentCount;
					li.setAttribute("commentCount",commentCount);
					li.className = 'mui-table-view-cell announceLi';
					li.innerHTML = '<div class="floatL announceNewsImg"><img src="' +
						data.Data.Data[i].pic +
						'"/></div><div class="announceNews clearfix floatR"><div class="announceNewsTil">' +
						data.Data.Data[i].Title +
						'</div><div class="announceNewsTime floatR">' +
						data.Data.Data[i].CreatedTime +
						'</div></div>'
					fragment.appendChild(li);
				}

			}
			
			$('#List li').remove();
			document.querySelector("#List").appendChild(fragment); //输出到#item1mobile的页面内容
			$(".announceLi").click(function(){
				var id=$(this).attr("id");
				var commentCount=$(this).attr("commentCount");
				texts(id,commentCount,userID)
			})
		},
		error: function() {
		}
	});
}

innerList(11);
//加载导航的方法
function innerNav() {

	$.ajax({
		type: "post",
		url: NavUrl,
		datatype: "json",
		success: function(data) {
			data = eval('(' + data + ')');
			var fragment = document.createDocumentFragment(); //创建一个代码片段
			var a;
			if(typeof(data.Data.Data) != "undefined") { //这里是判断是不是有数据的 如果没数据直接不用循环 否则 undefined len属性
				for(var i = data.Data.Data.length - 1; i >= 0; i--) { //循环输出data中的数据
					a = document.createElement('a');
					a.className = 'mui-control-item';
					a.href = "javascript:innerList(" + data.Data.Data[i].Id + ");";
					console.log(data.Data.Data[i].Id)
					a.innerHTML = data.Data.Data[i].Title;
					fragment.appendChild(a);
				}
			}

			document.querySelector("#cur").appendChild(fragment); //输出到#item1mobile的页面内容
			$("#cur>a:first-child").addClass("mui-active");
			console.log(99999);

			$("#cur>a").bind("click", function() {
				console.log('zhixing');
				$("#cur>a").removeClass("mui-active");
				$(this).addClass("mui-active");
			});
			//innerList(parseInt(data.Data.Data[0].Id));

		},
		error: function() {

		}
	});
}

//页面价在后执行   加载导航的方法
window.onload = function() {
	getRem(750, 100)
	innerNav(11);

	var tabsSwiper = new Swiper('#tabs-container', {
		speed: 500,
		onSlideChangeStart: function() {
			$(".tabs .active").removeClass('active')
			$(".tabs a").eq(tabsSwiper.activeIndex).addClass('active')
		}
	})
	$(".tabs a").on('touchstart mousedown', function(e) {
		e.preventDefault()
		$(".tabs .active").removeClass('active')
		$(this).addClass('active')
		tabsSwiper.slideTo($(this).index())
	})
	$(".tabs a").click(function(e) {
		e.preventDefault()
	})
}
window.onresize = function() {
	getRem(750, 100);
};

function getRem(pwidth, prem) {
	var html = document.getElementsByTagName("html")[0];

	var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = oWidth / pwidth * prem + "px";
}