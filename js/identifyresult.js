

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var memberNo = GetQueryString("memberNo");

$(document).ready(function() {
	var url = 'http://www.chntkd.org.cn/webinterface/APP_interface/json/membershipInformation.ashx';
	localStorage.getItem("memberNo");
	localStorage.getItem("memberNo");
	localStorage.getItem("memberNo");
	var memberNo=
//	console.log(localStorage.getItem("memberNo"));
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			memberNo: localStorage.getItem("memberNo"),
			idcard:memberNo
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
























