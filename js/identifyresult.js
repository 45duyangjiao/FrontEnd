
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var memberNo = GetQueryString("memberNo");
if(memberNo.length<=12){
	var memberNo = memberNo;
} else {
	var idcard = memberNo;
}
console.log(memberNo);
$(document).ready(function() {
	var url = 'http://www.chntkd.org.cn/webinterface/APP_interface/json/membershipInformation.ashx';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			memberNo: memberNo,
			idcard:idcard,
		},
		success: function(data) {
			console.log(data)
			var sign =data.sign;
			console.log(sign);
			if(sign=0x10320001){
				var str = template("NOMsg", data)
				$(".NOMsg").html(str);
				console.log("暂无信息")
			}
			else if(sign=0x10320000){
				var data = data.baseInfor;
				var str = template("identifyResult", data)
				$(".identifyResult").html(str);
			}
			
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});
});
























