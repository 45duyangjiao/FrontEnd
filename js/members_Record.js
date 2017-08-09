function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var user_Id = GetQueryString("user_Id");
console.log(user_Id);
function goDatail(id){
	window.location.href= "membersCont.html?id=" + id;
}
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
			
			var activition = data.Data.Data;
//			var str = template("memberRecord", {activition: data.Data.Data})
//			$(".mui-table-view-member").html(str);
            var li ;
			for(i = 0; i < activition.length; i++) {
				li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media';	
			
				li.innerHTML ='<img class="mui-media-object mui-pull-left" src="'+activition[i].pic+'">'+
				     '<div class="mui-media-body" onclick="goDatail(' +activition[i].Id + ')">'+
				     '<h4 class="mui-ellipsis">'+activition[i].title+
				     '</h4>'+
				     '<p class="mui-ellipsis">活动时间：'+activition[i].activity_time+'至'+activition[i].activity_Endtime+
				     '</p></div>'				     
				   document.getElementById('daoList').appendChild(li)  
			}
			
//			mui(".mui-table-view-cell")[0].addEventListener('tap',function(){
//					let id=$(this).attr('id');// 获取id{}
//					mui.openWindow({
//		        	id:"membersCont",
//		        	url:'membersCont.html'
//		        })
//				
//			})
		        
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
		