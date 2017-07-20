$(document).ready(function() {
	function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}

		var id = GetQueryString("id");
		var url = 'http://47.93.192.128:5001/Notice/Notice_Detail';
		$.ajax({
			url: url,
			data:{
				Id:id,
			},
			dataType: 'json',
			type: 'post',
			success: function(data) {
				console.log(data);
			var data=data.Data.Data;
			var content=data.content;
			var obj = { 
			    content:content 
			}; 
			template.config("escape", false); 
			var str = template("announceDetail", data);
			$(".announceDetail").html(str);
			var strr=template("contnent", obj); 
			$(".announceDetailMainbody").html(strr);
			
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				
			}
		});
	});
		