// 公益接口
$(document).ready(function() {
		function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			var id = GetQueryString("id");
			var userID=GetQueryString("userID");
	
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
			        let viewCount=$(this).attr('viewCount');
			        window.location.href = "newsContent.html?id=" + id+"&viewCount="+viewCount+"&userID="+10005;
			   });
			   
			   $(".goIos").click(function(){
					window.location.href = "segue://id=1019&type=NEWSPIC";
				})
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				
			}
		});
		
		
		
		
	});
				