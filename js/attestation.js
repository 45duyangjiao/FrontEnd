function searchAttestationResult(){
	var attestationInputVal =  $("#attestationInput").val().replace(/ /g,"");//获取身份证号或者会员编号
	localStorage.setItem("memberNo",attestationInputVal);
	if(attestationInputVal == ""){
		alert("内容不能为空，请重新输入！");
		return false;
		
	}else{
		$.ajax({
			url:"http://www.chntkd.org.cn/webinterface/APP_interface/json/membershipInformation.ashx",
			type:"POST",
			data:{
				memberNo:attestationInputVal,//会员编号
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				/*获取这个人所有信息*/
				if(data.sign==0x10320000){
					window.location.href = "identifyResult.html"
				}else{
					mui.toast('没有会员信息',{ duration:'1000', type:'div' })  
				}
			},
			
		});
	}	
}
var InquireBtn = document.getElementById("inquireBtn");
InquireBtn.addEventListener("tap",searchAttestationResult);



function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var memberNo = GetQueryString("memberNo");
console.log(memberNo)

var DetailUrl = "http://47.93.192.128:5001/Match/MatchDetail";
//默认加载
$.ajax({
	type: "post",
	url: DetailUrl,
	data: {
		memberNo: memberNo
	},
	datatype: "json",
	success: function(data) {
		window.open("identifyResult.html?memberNo="+memberNo)
	},
	error: function() {

	}
});



//$("#inquireBtn").on("tap",searchAttestationResult);

/*---------------------获取查询帮助的内容--------------------------------*/
//$.ajax({
//	url:"",
//	type:"post",
//	dataType:"json",
//	success:function(data){
//		//console.log(data);
//		var $P = '';
//		$(".attestationHelpText").html($P);
//	}
//});
	
