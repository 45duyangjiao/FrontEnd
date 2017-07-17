
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var memberNo = GetQueryString("memberNo");
console.log(memberNo);
$(document).ready(function() {
	var url = 'http://www.chntkd.org.cn/webinterface/APP_interface/json/membershipInformation.ashx';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			memberNo: memberNo,
			idcard:"",
		},
		success: function(data) {
			var data = data.baseInfor;
			var str = template("identifyResult", data)
			$(".identifyResult").html(str);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});
});
























