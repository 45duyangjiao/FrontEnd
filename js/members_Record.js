
$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/Daoguan/Activity_Record';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			user_Id: 10003,
			DGId:7,
			active_id:"",	
			time_start:	"",
			time_end:""
		},
		success: function(data) {
			console.log(data);
			var str = template("memberRecord", {activition: data.Data.Data})
			$(".mui-table-view-member").html(str);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			
		}
	});
});
		