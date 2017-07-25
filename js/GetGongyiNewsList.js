$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/News/GetGongyiNewsList';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			pageindex: 1
		},
		success: function(data) {
//			console.log(data);
			var str = template("GetGongyiNewsList", {activition: data.Data.Data})
			$(".GetGongyiNewsList").html(str);
		    $(".activationRecordLi").click(function () {
		        let id=$(this).attr('id');// 获取id
		        let viewCount=$(this).attr('viewCount');
		        window.location.href = "newsContent.html?id=" + id+"&viewCount="+viewCount;
		    })
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
});
