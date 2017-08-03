
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
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			memberNo: memberNo,
			idcard:idcard
		},
		success: function(data) {

//			if(sign=0x10320000){
//				var data = data.baseInfor;
//				var str = template("identifyResult", data)
//				$(".identifyResult").html(str);
//			}
			if (data.sign == 0x10320000) {
				        var baseInfor = data.baseInfor;
				        var certInfor = data.certInfor;
						var str = template("identifyResult", baseInfor)
						$(".identifyResult").html(str);
						//停止
						var memberNo = baseInfor.userNo;
						var faceP = baseInfor.facephoto;
						var imgFacephoto = document.createElement("img");
						    faceP = faceP.slice(10,faceP.length)
						    facePic = "http://www.chntkd.org.cn/"+faceP
						    if(!faceP == ''){
						    	 imgFacephoto.setAttribute("src", facePic);
						    }else{
						    	 imgFacephoto.setAttribute("src", "../images/111.png");
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
						$(".identifyResult").html('<div style="text-align:center;margin-top:100px;color:#777">暂时没会员信息!</div>');
					}	
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});
});
























