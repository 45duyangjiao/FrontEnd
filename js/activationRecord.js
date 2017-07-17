$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/Center/ActivictyRecord';
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
			$(".activationRecordLi").click(function () {
		        let id=$(this).attr('id');// 获取id
		        localStorage.setItem("ActivityId",id)
		        window.location.href = "training_con.html?id=" + id;
		    })
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
});



