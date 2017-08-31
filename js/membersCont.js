
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var id = GetQueryString("id");
$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/daoguan/Activity_Record';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data:{
			active_Id:4,
		},
		success: function(data) {
			console.log(data)
			var data=data.Data.Data.Data;
			var str = template("daoCon", {data:data})
			$(".daoCon").html(str);
		}
	});
});

