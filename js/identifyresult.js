
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var memberNo = GetQueryString("memberNo");
var idcard = GetQueryString("idcard");
$(document).ready(function() {
	var url = 'http://www.chntkd.org.cn/webinterface/APP_interface/json/membership.ashx';
	document.getElementById('loadingdiv').style.display = "block";
	document.getElementById('loadingP').style.width = "40px"
	document.getElementById('loadingdiv').style.margin = "0 auto"
	document.getElementById('loadingdiv').style.marginTop = "50%"
	document.getElementById('loadingdiv').style.textAlign = "center"
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			memberNo: memberNo,
			idcard:idcard
		},
		success: function(data) {
            console.log(data)
//			if(sign=0x10320000){
//				var data = data.baseInfor;
//				var str = template("identifyResult", data)
//				$(".identifyResult").html(str);
//			}
			if (data.sign == 0x10320000) {
				        document.getElementById('loadingdiv').style.display = "none"
				        var baseInfor = data.baseInfor;
				        var certInfor = data.certInfor;
						var str = template("identifyResult", baseInfor)
						$(".identifyResult").html(str);
						//停止
						var memberNo = baseInfor.userNo;
						var faceP = baseInfor.facephoto;
						var imgFacephoto = document.createElement("img");
//						    

						    if(!faceP == ''){
						    	if(faceP.indexOf('Face')>-1){
						    		faceP = faceP.slice(10,faceP.length)
						            facePic = "http://www.chntkd.org.cn/"+faceP						    		
						    		imgFacephoto.setAttribute("src", facePic);
						    	    imgFacephoto.setAttribute("style", "width:80%");
						    	}else{
						    		facePic = "http://www.chntkd.org.cn/"+faceP	
						    		imgFacephoto.setAttribute("src", facePic);
						    	    imgFacephoto.setAttribute("style", "width:80%");
						    	}
						    	 
						    }else{
						    	 imgFacephoto.setAttribute("src", "../images/111.jpg");
						    	 imgFacephoto.setAttribute("style", "width:80%");
						    }
						document.getElementById('faceP').appendChild(imgFacephoto);
						  var divDom = '<h5 class="certList">资格证信息</h5>'
						for(i=0;i<certInfor.length;i++){
							divDom +='<li><div><span class="commonColor">证书编号：</span><span class="commonRight">'+certInfor[i].CertNo+
						'</span></div><div><span class="commonColor">证书等级：</span><span class="commonRight">'+certInfor[i].CertGrade+
						'</span></div><div><span class="commonColor">证书类型：</span><span class="commonRight">'+certInfor[i].TypeName+
						'</span></div><div><span class="commonColor">通过时间：</span><span class="commonRight">'+certInfor[i].PassTime+
						'</span></div><div><span class="commonColor">说明：</span><span class="commonRight">'+certInfor[i].Memo+
						'</span></div></li>'
						 document.getElementById('certInfor').innerHTML = divDom ;  
						}
						  
						    
					} else {
						document.getElementById('loadingdiv').style.display = "none"
						$(".identifyResult").html('<div style="text-align:center;margin-top:100px;color:#777">暂时没会员信息!</div>');
					}	
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});
});
























