function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var user_Id = GetQueryString("user_Id");
console.log(user_Id)
//var user_Id=10047
$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/Center/ActivictyRecord';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			UserId: user_Id
		},
		success: function(data) {
			console.log(data)
			if(data.Data.Success==true){
				var str = template("protocol-temp", {activition: data.Data.Data.result})
				$(".activationRecord").html(str);
				$(".mui-table-view-cell").on("tap",function () {
			        var id=$(this).attr('id');// 获取id
			        window.location.href = "training_con.html?id=" + id;
			   });
			};
			if(data.Data.Success==false){
				mui.toast("暂无数据",{
					duration: '500',
					type: 'div'
				})
			}
		}
		
	});
});



