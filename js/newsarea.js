$(document).ready(function() {
	var url = 'http://d2p7pk.natappfree.cc/News/GetMyChannelList';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			UserId: 10002
		},
		success: function(data) {
			console.log(data);
			var str = template("myChannel", {myChannel: data.Data.Data})
			$(".myChannelmodule").html(str);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
});






