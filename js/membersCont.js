
console.log(localStorage.getItem("daoId"));
$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/daoguan/Activity_Record';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data:{
			active_Id:localStorage.getItem("daoId"),
		},
		success: function(data) {
			var data=data.Data.Data[0];
			console.log("称");
			console.log(data);
			var str = template("daoCon", data)
			$(".daoCon").html(str);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
});

