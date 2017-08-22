
// 我的频道
$(document).ready(function() {
	mui.init({
	  gestureConfig:{
	   swipe: false, 
	  }
	});

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var userID = GetQueryString("userID");
	console.log(userID)
	var urlPath="http://47.93.192.128:5001/";
	var url = urlPath+"News/GetMyChannelList";
	function listAjax(){
		$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			UserId: userID
		},
		success: function(data) {
			console.log(data);
			var str = template("myChannel", {
				myChannel: data.Data.Data
			})
			$(".myChannelmodule").html(str);
			$('.supDelate').bind('click', function(e) {
				$(this).parent().remove();
				var myChannelId = $(e.target).parent().attr("id");
				$.ajax({
					type: "post",
					url: urlPath+"News/DelMyChannel",
					async: true,
					dataType: 'json',
					data: {
						userId: userID,
						myChannelId: myChannelId
					},
					success: function(data) {

					}

				});
			})
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		}
	   });
	   }
	listAjax()

	var urll = 'http://47.93.192.128:5001/News/GetMoreNewsType';
	$.ajax({
		url: urll,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			var textChannel = data.Data.Data;
			console.log(textChannel)
			var len=$('#textL').children().length;
			console.log(len);
			if(len!==0){
				var topText = $('#textL').text().replace(/x/g,'').replace(/\s+/g,"")
				var outArr = [];
				textChannel.map(function(item,index){
					var innerArr = [];
					item.Son.map(function(every,i){
						if(topText.indexOf(every.Title)>-1){
	//						  console.log(every)
							}else{
							    innerArr.push(every)
							}
					})
	                item.Son = innerArr;
	                outArr.push(item)
					
				})
				console.log(outArr)
			}
			
			
			var str = template("channel", {
				channel: outArr
			});
			
			$(".dynamicallyAdd").html(str);
            //点击添加更多频道
            
			$(".compileChannel .pu").bind("click", function(e) {
				
				$(e.target).removeClass('pu').addClass('zhu')
				e.target.remove()
				var textT = $('#textL').text().replace(/x/g,'').replace(/\s+/g,""); 
				var eTarget = e.target.childNodes[0].data.replace(/\s+/g,"")
			
				if(textT.indexOf(eTarget)>-1){
					    $('.myChannelmodule').append('')
				}else{
						$('.myChannelmodule').append(e.target)
				}

				
				var channelId = $(e.target).attr("id");
				if($(".supDelate").css("display") == "none") {
					$(".supDelate").show();
					$('.floatR').html("完成");
				}
				$.ajax({
					type: "post",
					url: urlPath+"News/AddMyChannel",
					async: true,
					dataType: 'json',
					data: {
						userId: userID,
						channelId: channelId
					},
					success: function(data) {

					}

				});
			})
//			var topText;
//			function removetheSame(){
//				topText = $('#textL').text().replace(/x/g,'').replace(/\s+/g,"")
//	            $('.dynamicallyAdd ul li').map(function(index,item){
//	            	console.log(item)
//						if(topText.indexOf(item.innerText)>-1){
//						    item.style.display = 'none'
//						    
//						}else{
//								console.log('无')
//						}
//						
//				})
//			}
//          removetheSame()  
			$(".myChannelmodule .zhu").bind("click", function(e) {
				//							e.target.remove()
				//							alert(e.target.id)
				//							if(e.target.id<10)
				//							$('#Ty0').append(e.target)
				//							else if(e.target < 30)
				//							$('#Ty1').append(e.target)
				//							else if(e.target > 30)
				//							$('#Ty2').append(e.target)
			})

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
//			alert(XMLHttpRequest.status);

		}
	});

	// 编辑频道
	
	$('.floatR').click(function() {
		//点击编辑
		if($(".supDelate").css("display") == "none") {
			$(".supDelate").show();
			$('.floatR').html("完成");
		} else {
		//点击完成
			$(".supDelate").hide();
			$('.floatR').html("编辑")
            window.location.href = urlPath+"FrontEnd/news/newsList.html"
            
		}
  
	})
	

});