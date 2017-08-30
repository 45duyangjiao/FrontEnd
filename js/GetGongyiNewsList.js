$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	
	var userID=GetQueryString("userID");
	console.log(userID)
	
	var url = 'http://47.93.192.128:5001/News/GetGongyiNewsList';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			pageindex: 1
		},
		success: function(data) {
			console.log(data);
			var str = template("GetGongyiNewsList", {activition: data.Data.Data})
			$(".GetGongyiNewsList").html(str);
		    $(".activationRecordLi").click(function () {
		        var id=$(this).attr('id');// 获取id
		        var commentCount=$(this).attr("commentCount")
		        window.location.href = "newsContent.html?id=" + id+"&commentCount="+commentCount+"&userID="+userID;
		    })
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
});
