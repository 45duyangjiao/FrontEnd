// 我的频道
$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var userID = GetQueryString("userID");

	var url = 'http://47.93.192.128:5001/News/GetMyChannelList';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			UserId: userID
		},
		success: function(data) {
			console.log(data.Data.Data)
			var str = template("myChannel", {
				myChannel: data.Data.Data
			})
			$(".myChannelmodule").html(str);
			$('.supDelate').bind('click', function(e) {
				$(this).parent().remove();
				var myChannelId = $(e.target).parent().attr("id");
				$.ajax({
					type: "post",
					url: "http://47.93.192.128:5001/News/DelMyChannel",
					async: true,
					dataType: 'json',
					data: {
						userId: 10002,
						myChannelId: myChannelId
					},
					success: function(data) {
						//							alert("删除成功")

					}

				});
			})
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
		}
	});
});

// 编辑频道
$('.floatR').click(function() {
	if($(".supDelate").css("display") == "none") {
		$(".supDelate").show();
		$('.floatR').html("完成");

	} else {
		$(".supDelate").hide();
		$('.floatR').html("编辑")
	}

})

$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/News/GetMoreNewsType';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			var str = template("channel", {
				channel: data.Data.Data
			});
			$(".dynamicallyAdd").html(str);

			$(".compileChannel .pu").bind("click", function(e) {
				$(e.target).removeClass('pu').addClass('zhu')
				e.target.remove()
				$('.myChannelmodule').append(e.target)
				var channelId = $(e.target).attr("id");
				if($(".supDelate").css("display") == "none") {
					$(".supDelate").show();
					$('.floatR').html("完成");
				}
				$.ajax({
					type: "post",
					url: "http://47.93.192.128:5001/News/AddMyChannel",
					async: true,
					dataType: 'json',
					data: {
						userId: 10002,
						channelId: channelId
					},
					success: function(data) {
						alert("添加 成功")
					}

				});
			})

			$(".myChannelmodule .zhu").bind("click", function(e) {
				//							e.target.remove()
				//							alert(e.target.id)
				//							if(e.target.id<10)
				//							$('#Ty0').append(e.target)
				//							else if(e.target < 30)
				//							$('#Ty1').append(e.target)
				//							else if(e.target > 30)
				//							$('#Ty2').append(e.target)
			})

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});
});

　　