function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var user_Id = GetQueryString("user_Id");
console.log(user_Id);

$(document).ready(function() {
	        mui.toast('nihao')
	var url = 'http://47.93.192.128:5001/Daoguan/Activity_Record';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			user_Id: user_Id,
			DGId:7,
			active_id:"",	
			time_start:	"",
			time_end:""
		},
		success: function(data) {
			console.log(data);
			var str = template("memberRecord", {activition: data.Data.Data})
			$(".mui-table-view-member").html(str);
			
			$(".mui-table-view-cell")[0].addEventListener('tap',function(){
					let id=$(this).attr('id');// 获取id{}
					mui.openWindow({
		        	id:"membersCont",
		        	url:'membersCont.html'
		        })
				
			})
		        
//		        console.log(id);
		        //localStorage.setItem("daoId",id)
		        //mui.openWindow({
		       // 	id:"membersCont.html",
		       // 	url:'membersCont.html'
		        //})
		      //  window.location.href= "membersCont.html?id=" + id;
		      //  reutrn false; 
		   
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			
		}
	});
});
		