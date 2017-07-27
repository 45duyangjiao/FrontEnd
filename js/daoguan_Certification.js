$(document).ready(function() {
	var url = 'http://47.93.192.128:5001/daoguan/DaoGuan_Detail';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			dgId: 7,
			user_Id: 10003
		},
		success: function(data) {
			console.log(data)
			var str = template("Course", {
				Course: data.Data.Data.Course
			})
			var strr = template("dg_scroll", {
				picList: data.Data.Data.picList
			})
			$(".dg_scroll").html(strr);
			$(".dg_table_content").html(str);

			var htmlList = '';
			var value = data.Data.Data;
			htmlList += '<div class="dg_banner"><img src="../images/daoguan_banner.jpg" alt="" /></div>' +
				'<div class="dg_head"><h2>' + value.title + "</h2>" +
				'<h3><span class="dh_Star" num='+value.star+'></span>协会认证 &nbsp;&nbsp;&nbsp;&nbsp;CTA06</h3>' +
				'<p><i class="mui-icon iconfont icon-shijian"></i><span>&nbsp;&nbsp;' + value.BusinessHours + '</span></p>' +
				'<div class="dh_head_Certification">' +
				'<a href=""><i><img src="../images/daoguan_icon_Certification.png" alt="" /></i><p>' + value.IsCertification + '</p></a>' +
				'</div></div>' +
				'<div class="dg_function mt15">' +
				'<ul class="mui-table-view">' +
				'<li class="mui-table-view-cell"><a class="mui-navigate-right"><i class="mui-icon iconfont icon-dingwei fontColor-blue"></i><span>' + value.address + '</span></a></li>' +
				'<li class="mui-table-view-cell"><a class="mui-navigate-right" href="tel:010-51726666"><i class="mui-icon iconfont icon-dianhua fontColor-blue"></i><span>' + value.phone + '</span></a></li>' +
				'</ul></div>' +
				'<div class="dg_jianjie_box mui-table-view mt15"><h2 class="dg_title"><span>简介详情</span></h2><p class="dg_p">' + value.content + '</p></div>'

			$('.Certification').empty().append(htmlList);
			if($(".dh_Star").attr("num")==1){
				$(".dh_Star").text("★")
			}
			if($(".dh_Star").attr("num")==2){
				$(".dh_Star").text("★★")
			}
			
			if($(".dh_Star").attr("num")==3){
				$(".dh_Star").innerHTML="★★★"
			}
			
			if($(".dh_Star").attr("num")==4){
				$(".dh_Star").innerHTML="★★★★"
			}
			
			if($(".dh_Star").attr("num")==5){
				$(".dh_Star").innerHTML="★★★★★"
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);

		}
	});

	$.ajax({
		type: "post",
		url: "http://47.93.192.128:5001/daoguan/Activity_Record",
		async: true,
		dataType: 'json',
		data: {
			active_Id: "",
			user_id: "",
			dgId: 7,
			time_Start: "",
			time_End: ""
		},
		success: function(data) {
			console.log(data);
			var str = template("Activity", {
				Activity: data.Data.Data
			})
			$(".Activity").html(str);
		},
		error: function() {

		}
	});

});