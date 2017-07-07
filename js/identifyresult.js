/*--------------------------mui页面初始化功能 ---------------------------------------*/
mui.init({
	 swipeBack: true //启用右滑关闭功能
});
console.log('123')
console.log('123')
console.log('123')
/*--------------------------让非基本信息显示或隐藏-----------------------------------*/
function loadMoreMember(obj){
	var e = e || window.event;
	e.stopPropagation();
	$(obj).nextAll().toggleClass("coverOrshow");
	if($(obj).nextAll().hasClass("coverOrshow")){
		$(obj).removeClass("identifyResultshowMore").addClass("coverMore").html("显示更多信息");
	}else{
		$(obj).removeClass("coverMorei").addClass("dentifyResultshowMore").html("隐藏更多信息");
	}
	
}
/*--------------------------让非基本信息点击出现弹框的函数封装-----------------------------------*/
function showNone(obj){
	var message = $(obj).find(".displayNone").html();
	mui.alert(message);
}
/*-------------------------接收从认证查询页面产过来的参数------------------------------*/
var ImgDiv = document.getElementsByClassName("identifyImg")[0];
mui.plusReady(function(){
    //关闭等待框  
var extras = plus.webview.currentWebview();
/*extras是个对象，遍历对象，动态添加li?*/
var memberBaseInfo = extras.baseInfo;
var ImgDiv = document.getElementsByClassName("identifyImg")[0];
var BodyDiv = document.getElementsByClassName("identifyResult")[0];
var IMg = '<div class="memberImage"><div class="Img_img"><img src="'+memberBaseInfo.facephoto+'" alt="" /></div></div>';//用户头像
alert(memberBaseInfo.sex);
alert(IMg);
$(".identifyImg").append(IMg);
var BaseDiv = '<ul id="resultUl">'
				+'<li><span class="commonColor">会员编码：</span><span id="memberNumber" class="commonRight">'+memberBaseInfo.userNo+'</span></li>'
				+'<li><span class="commonColor">验证码：</span><span id="identifyCode" class="commonRight">'+memberBaseInfo.usercode+'</span></li>'
				+'<li><span class="commonColor">会员姓名：</span><span id="memberName" class="commonRight">'+memberBaseInfo.name+'</span></li>'
				+'<li><span class="commonColor">道馆负责人：</span><span id="endTime" class="commonRight">'+memberBaseInfo.linkren+'</span></li>';
				if(1 == memberBaseInfo.sex){
					BaseDiv += '<li><span class="commonColor">性别：</span><span id="endTime" class="commonRight">男</span></li>'
				}else if(2 == memberBaseInfo.sex){
					BaseDiv += '<li><span class="commonColor">性别：</span><span id="endTime" class="commonRight">女</span></li>'
				}else if(0 == memberBaseInfo.sex){
					BaseDiv += '<li><span class="commonColor">性别：</span><span id="endTime" class="commonRight">未知</span></li>'
				}
				+'<li><span class="commonColor">出生日期：</span><span id="memberBirth" class="commonRight">'+memberBaseInfo.birthday+'</span></li>'
				+'<li><span class="commonColor">身份证号：</span><span id="endTime" class="commonRight">'+memberBaseInfo.idcard+'</span></li>'
				+'<li><span class="commonColor">电话号码：</span><span id="endTime" class="commonRight">'+memberBaseInfo.phone+'</span></li>'
				+'<li><span class="commonColor">地址：</span><span id="endTime" class="commonRight">'+memberBaseInfo.address+'</span></li>'
				+'<li><span class="commonColor">注册日期：</span><span id="endTime" class="commonRight">'+memberBaseInfo.regTime+'</span></li>'
				+'<li><span class="commonColor">起始时间：</span><span id="startTime" class="commonRight">'+(memberBaseInfo.beginTime).substring(0,10)+'</span></li>'
				+'<li><span class="commonColor">到期时间：</span><span id="endTime" class="commonRight">'+memberBaseInfo.endTime+'</span></li>'
				if(1 == memberBaseInfo.type){
					BaseDiv += '<li><span class="commonColor">会员类型：</span><span id="endTime" class="commonRight">个人会员</span></li>'
				}else if(2 == memberBaseInfo.type){
					BaseDiv += '<li><span class="commonColor">会员类型：</span><span id="endTime" class="commonRight">团体会员</span></li>'	
				}
				BaseDiv += '<li class="identifyResultshowMore" onclick="loadMoreMember(this)">显示更多信息</li>');
				+'<li class="coverOrshow"><span class="commonColor">段位信息：</span><span id="taekwondo" class="commonRight">05216846【4段】</span></li>'
				+'<li class="coverOrshow"><span class="commonColor">通过时间：</span><span id="passTime" class="commonRight">2016-06-08</span></li>'
				+'</ul>'
$(".identifyResult").append(BaseDiv);				
//$.each(extras.coreInfo,function(index,value){
//		var extrasLi = $('<li class="coverOrshow" onclick="showNone(this)"><span class="commonColor">'+value.name+'</span><span class="commonRight" id="'+value.id+'">'+value.val+'</span><span class="DisplayNone" style="display:none">'+value.xinxi+'</span></li>');
//		$("#resultUl").append(extrasLi);
//})
/*---------------------------------------测试数据---------------------------------------*/
//var name = extras.name;
//console.log(name);
//var val = extras.val;
//console.log(val);
});

