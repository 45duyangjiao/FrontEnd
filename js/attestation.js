function searchAttestationResult(){
	var attestationInputVal =  $("#attestationInput").val().replace(/ /g,"");//获取身份证号或者会员编号
	localStorage.setItem("memberNo",attestationInputVal);
	if(attestationInputVal == ""){
		alert("内容不能为空，请重新输入！");
		return false;
		
	}else{
		$.ajax({
			url:"http://www.chntkd.org.cn/webinterface/APP_interface/json/membershipInformation.ashx",
			type:"POST",
			data:{
				memberNo:attestationInputVal,//会员编号
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				/*获取这个人所有信息*/
				if(data.sign==0x10320000){
					window.location.href = "identifyResult.html"		
				}else{
					alert("暂无数据");
				}
			},
			error:function(){
				             
			}
		});
	}	
}
var InquireBtn = document.getElementById("inquireBtn");
InquireBtn.addEventListener("tap",searchAttestationResult)
//$("#inquireBtn").on("tap",searchAttestationResult);

/*---------------------获取查询帮助的内容--------------------------------*/
//$.ajax({
//	url:"",
//	type:"post",
//	dataType:"json",
//	success:function(data){
//		//console.log(data);
//		var $P = '';
//		$(".attestationHelpText").html($P);
//	}
//});
	
