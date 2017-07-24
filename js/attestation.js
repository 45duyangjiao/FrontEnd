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
				console.log(memberNo)
				if(data.sign==0x10320000){
					var memberNo=data.baseInfor.userNo;
					window.location.href = "identifyresult.html?memberNo="+memberNo
				}else{
					mui.toast('没有会员信息',{ duration:'1000', type:'div' })  
				}
			},
			
		});
	}	
}

//var InquireBtn = document.getElementById("inquireBtn");

$(".attestationSelectButton").click(function(){
	searchAttestationResult();
})

//InquireBtn.addEventListener("click",searchAttestationResult);



