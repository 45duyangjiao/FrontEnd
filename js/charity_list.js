// 公益接口
$(document).ready(function() {
		var url = 'http://47.93.192.128:5001/News/GongyiList';
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'post',
			success: function(data) {
				console.log(data);
				var str = template("charityList", {activition: data.Data})
				$(".charityList").html(str);
				$(".mui-table-view-cell").click(function () {
			        let id=$(this).attr('id');// 获取id
			        window.location.href = "newsContent.html?id=" + id;
			   });
			   
			   $(".goIos").click(function(){
					window.location.href = "segue://id=1019&type=NEWSPIC";
					console.log($(this).html())
				})
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				
			}
		});
		
		
		
		
	});
				