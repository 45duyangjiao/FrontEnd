$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var id = GetQueryString("id");
	var userID = GetQueryString("userID");
	var viewCount = GetQueryString("viewCount");

	var url = 'http://47.93.192.128:5001/Notice/Notice_Detail';
	$.ajax({
		url: url,
		data: {
			Id: id,
		},
		dataType: 'json',
		type: 'post',
		success: function(data) {
			console.log(data);
			var data = data.Data.Data;
			var content = data.content;
			var obj = {
				content: content
			};
			template.config("escape", false);
			var str = template("announceDetail", data);
			$(".announceDetail").html(str);
			var strr = template("contnent", obj);
			$(".announceDetailMainbody").html(strr);

			function reply(id, replyId, name, userID) {
				window.location.href = "../news/reply.html?id=" + id + "&replyId=" + replyId + "&name=" + name + "&userID=" + userID + "&userID=" + 10005;
			};
			var CommentUrl = "http://47.93.192.128:5001/News/GetNewsReplyList";
			//默认加载
			$.ajax({
				type: "post",
				url: CommentUrl,
				data: {
					articleId: id
				},
				datatype: "json",
				success: function(data) {
					data = eval('(' + data + ')');
					var fragment = document.createDocumentFragment(); //创建一个代码片段
					var li;
					console.log(data)
					if(typeof(data.Data.Data) != "undefined") {
						for(var i = 0; i < data.Data.Data.length; i++) { //循环输出data中的数据
							li = document.createElement('li');
							li.className = 'clearfix';
							li.id = data.Data.Data[i].id;
							li.innerHTML = '<div class="floatL avatar"><img src="' +
								data.Data.Data[i].userImg +
								'" /></div><div class="floatR commentsOthers"><p class="clearfix pName"><span class="floatL">' +
								data.Data.Data[i].userName +
								'</span><span class="floatR" ><i class="zan"></i><a class="count" style="color:#333">'+data.Data.Data[i].likecount+'</a></span></p><p class="pComments">' +
								data.Data.Data[i].content +
								'</p><p class="pTime"><span>' +
								data.Data.Data[i].commentTime +
								'</span><span class="commontsReply" name=' + i + '>回复</span></p></div></a>'
							fragment.appendChild(li);

						}
					}

					document.querySelector("#List").appendChild(fragment); //输出到#item1mobile的页面内容
					$(".commontsReply").click(function() {
						var replyId = $(this).parent().parent().parent().attr("id");
						var name = $(this).attr("name");
						reply(id, replyId, name, userID)
					});
					
					$(".zan").click(function(){
						$(this).addClass("active")
						var Acitve=$(this);
						var commentId=Acitve.parent().parent().parent().parent().attr("id");
						$.ajax({
							type:"post",
							url:"http://47.93.192.128:5001/ThumbsUp/isThumbsUp",
							async:true,
							dataType:"json",
							data:{
								commentId:commentId,
								userId:userID
							},
							success:function(data){
								console.log(data)
							var IsThumbsUp=data.Data.Data.IsThumbsUp;
							if(IsThumbsUp==true){
								$.ajax({
									type:"post",
									url:"http://47.93.192.128:5001/ThumbsUp/Thumbs_Down",
									async:true,
									data:{
										commentId:commentId,
										userId:userID
									},
									success:function(){
										Acitve.siblings()[0].innerHTML = Number(Acitve.siblings()[0].innerHTML)- 1
										Acitve.removeClass("active")
									},
								});
							}else if(IsThumbsUp==false){
								$.ajax({
									type:"post",
									url:"http://47.93.192.128:5001/ThumbsUp/Thumbs_Up",
									async:true,
									data:{
										commentId:commentId,
										userId:userID
									},
									success:function(){
										Acitve.siblings()[0].innerHTML = Number(Acitve.siblings()[0].innerHTML)+ 1
										
									},
								});
							}
					
							},
							error:function(){}
							
						});
					})
				
				},
				error: function() {

				}
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});

	var DetailUrl = "http://47.93.192.128:5001/News/NewsInfo";
	//默认加载
	$.ajax({
		type: "post",
		url: DetailUrl,
		data: {
			id: id
		},
		datatype: "json",
		success: function(data) {
			data = eval('(' + data + ')');

			var con_tilte = data.Data.Data.tilte;
			var con_con = data.Data.Data.content;
			$("#con_tilte").html(con_tilte)
			$("#con_con").html(con_con)
			var con_pub = data.Data.Data.publishDate;
			var con_source = data.Data.Data.source;
			$("#con_pub").html(con_pub)
			$("#con_source").html(con_source)
		},
		error: function() {

		}
	});

});