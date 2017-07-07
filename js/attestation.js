function searchAttestationResult(){
	var attestationInputVal =  $("#attestationInput").val().replace(/ /g,"");//获取身份证号或者会员编号
	if(attestationInputVal == ""){
		alert("内容不能为空，请重新输入！");
		return false;
	}else{
		$.ajax({
			url:"http://www.chntkd.org.cn/webinterface/APP_interface/json/membership.ashx",
			type:"POST",
			data:{
				memberNo:attestationInputVal//会员编号
			},
			dataType:"json",
			success:function(data){
				console.log("aaaa",data);
				/*获取这个人所有信息*/
				if(data){
					var baseInf  = data.baseInfor;
					var coreInf = data.certInfor;
				mui.openWindowWithTitle({
					    url:'result.html',
					  // id:'detail'
					  	extras:{
					        baseInfo:baseInf, //扩展参数，data中药获取的字段
					        coreInfo:coreInf
					    },
					    createNew:{
					    	autoShow:false
					    },
					    show:{
					    	aniShow:"slide-in-right"
					    }
					},{
					    title:{//标题配置
					        text:"认证查询结果",//标题文字
					        position:{ //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
					            top:0,
					            left:0,
					            width:"100%",
					            height:"100%"
					        },
					        styles:{//绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
					            color:"#fff",
					            align:"center",
					            family:"'Helvetica Neue',Helvetica,sans-serif",
					            size:"17px",
					            style:"normal",
					            weight:"normal",
					            fontSrc:""
					        }
					    },
					    back:{//左上角返回箭头
							image:{//图片格式
					            base64Data:'',//加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
					            imgSrc:'',//要加载的图片路径
					            sprite:{//图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
					                top:'0px',
					                left:'0px',
					                width:'100%',
					                height:'100%'
			            		},
				            	position:{//绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
					                top:"10px",
					                left:"10px",
					                width:"24px",
					                height:"24px"
				            	}
					        },
					        click:function(){
					            //重写 点击返回图标时执行的回调函数，默认执行mui.back();
					        }
					    }
					})
									
				}else{
					console.log("data is error !");
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
	
