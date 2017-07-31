
$(document).ready(function() {
       
		function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			var id = GetQueryString("id");
			var userID=GetQueryString("userID");
	
		var url = 'http://47.93.192.128:5001/News/GongyiList';
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'post',
			success: function(data) {
				console.log(data)
				//var imgList = data.Data.Data.imgnewslist
				//var str = template("charityList", {activition: data.Data})
                //var fragment = document.createDocumentFragment(); //创建一个代码片段
				var a;
                for(i=0;i<imgList.length;i++){
                	a = document.createElement('a');
//					li.className = 'mxhLi';
                	a.innerHTML  += '<img src='+imgList[i].img+'>'
                	 
              	document.getElementById("imgList").appendChild(a);
                }
				
				var disP = false;
				mui('#imgList').on('tap','a',function(){
					if(!disP){
						$(this).find('img').addClass('changeBig');
                        //document.getElementById('bgBlack').style.display = 'block';
                        disP = true;
                        
					}else{
						$(this).find('img').removeClass('changeBig');
                        //document.getElementById('bgBlack').style.display = 'none';
                        disP = false;
					}
					
				});
				//$(".charityList").html(str);
				$(".mui-table-view-cell").click(function () {
			        let id=$(this).attr('id');// 获取id
			        let commentCount=$(this).attr('commentCount');
			        window.location.href = "newsContent.html?id=" + id+"&commentCount="+commentCount+"&userID="+10005;

			   });
			   
			   $(".goIos").click(function(){
					window.location.href = "segue://id=1019&type=NEWSPIC";
				})
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				
			}
		});
		
		
		
		
	});