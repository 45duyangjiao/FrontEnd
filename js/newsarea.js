
// 我的频道
$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/News/GetMyChannelList';
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
			$('.supDelate').bind('click',function(e){
				$(this).parent().remove();
				var myChannelId=$(e.target).parent().attr("id");
					console.log(myChannelId);
					$.ajax({
						type:"post",
						url:"http://47.93.192.128:5001/News/DelMyChannel",
						async:true,
						dataType: 'json',
						data:{
							userId:10002,
							myChannelId:myChannelId
						},
						success:function(data){
							alert("删除成功")
						}
						
					});
			})
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
		}
	});
});






