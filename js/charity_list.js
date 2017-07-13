// 公益接口
$(document).ready(function() {
		var url = 'http://47.93.192.128:5001/News/GongyiList';
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'post',
			success: function(data) {
				console.log(data);
				var str = template("one", {activition: data.Data.Data})
				$(".nihoa").html(str);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				
			}
		});
	});
		