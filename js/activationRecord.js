$(document).ready(function() {
	var url = 'http://d2p7pk.natappfree.cc/Center/ActivictyRecord';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			UserId: 10003
		},
		success: function(data) {
			console.log(data);
			var str = template("protocol-temp", {activition: data.Data.Data.result})
			$(".activationRecord").html(str);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
});



