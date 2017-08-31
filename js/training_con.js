
$(document).ready(function() {
	
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	
	var id = GetQueryString("id");
	var url = 'http://47.93.192.128:5001/Center/ActivityDetail';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data:{
			ActivityId:id,
		},
		success: function(data) {
			var data=data.Data.Data.result;
			console.log(data);
			var str = template("peixunCon", data)
			$(".peixunCon").html(str);
			
		}
	});
});
