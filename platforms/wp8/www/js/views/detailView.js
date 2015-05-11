var detailView = {
    Update: function () {
		console.log("update")
        var p = store.promotions[store.currentPromotionId];
        //check remain
        if (p.Remain == "-1") {
            $("#remain-text-1").addClass("hidden");
            $("#remain-text-2").addClass("hidden");
        } else if (p.Remain == "0"){
			$("#remain-text-1").removeClass("hidden");
            $("#remain-text-2").removeClass("hidden");
            $("#remain-text-1").html("(Đã hết)");
            $("#remain-text-2").html("(Đã hết)");
			
		}else{
            $("#remain-text-1").removeClass("hidden");
            $("#remain-text-2").removeClass("hidden");
            $("#remain-text-1").html("(Còn lại " + p.Remain + " mã)");
            $("#remain-text-2").html("(Còn lại " + p.Remain + " mã)");
        }
		if (store.promotionsCode[store.currentPromotionId] != null) {
			$(".getcodecontainer1").addClass('hidden');
			$(".getcodecontainer").removeClass('hidden');
		} else {
			$(".getcodecontainer1").removeClass('hidden');
			$(".getcodecontainer").addClass('hidden');
		}
		if (p.ActiveService == '1') {
			$(".active70").removeClass('hidden');
		} else {
			$(".active70").addClass('hidden');
		}

		if (store.Contains(store.likeList[store.currentCategoryId], store.currentPromotionId)) {
		    $(".like-img").attr("src", "img/like3.png");
		} else {
		    $(".like-img").attr("src", "img/like.png");
		}

		var padd = p.PromotionAdd;
		var part = store.partners[store.shops[p.ListShop[0]].PartnerId];
		//add slider images
		slider.RemoveAllSlide("promotion_detail_slider");
		for (var i = 0; i < p.Photo.length; i++) {
			slider.AddSlide("promotion_detail_slider", host + p.Photo[i]);
		}

		var percent_number = Number(p.PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0");

		if (percent_number == 0) {
			$("#detail_page_percent img").attr("src", padd != null ? "img/percent_0_add.png" : "img/percent_0.png");
			$("#detail_page_percent_text").html('');
		} else {
			$("#detail_page_percent img").attr("src", padd != null ? "img/percent_add.png" : "img/percent.png");
			$("#detail_page_percent_text").html('-' + percent_number + "%");
		}

		$("#detail_description").empty();
		//add social information

		//add description
		var title = "<b>" + part.PartnerName + "</b> " + p.Title +
			". <i>Thời gian từ " + utils.GetDayFromString(p.StartDate) + " đến " + utils.GetDayFromString(p.EndDate) + "</i><br><br>" +
			(padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utils.GetDayFromString(padd.StartDate) + " đến " + utils.GetDayFromString(padd.EndDate) + "</i></font><br><br>" : "");

		$("#detail_title").html(title);
		//$("#detail_title").marquee({
		//    duration: 9000
		//});
		var item = "<b class='detail-partner-name'>" + part.PartnerName + "<br></b>" + part.Title + "<br>";// + p.Title + "</div>";
			
		$("#detail_above").html(item);
		item = "<img class='detail-icon' src='img/comment/info1.png'/><div class='location-text'>" + p.Title + "</div><br>";
		$(".promotion_title").html(item);
		item = "<img class='detail-icon' src='img/comment/clock.png'/>Áp dụng: <font style='  color: #2d5be3;'> Từ " + utils.GetDayFromString(p.StartDate) + " đến " + utils.GetDayFromString(p.EndDate) + "</font>" +
			(padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utils.GetDayFromString(padd.StartDate) + " đến " + utils.GetDayFromString(padd.EndDate) + "</i></font>" : "");
		if (p.Description != '') {
		    item += "<div style='margin-top:1em;'><img class='detail-icon' src='img/comment/info.png'/><div class='location-text'>" + p.Description + "<br>" + (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Description + "</font>. " : "") + "</div></div>"; //<a href='#' onclick='OpenSearchPanel(1)'>Nhận tại đây</a>
		}
		
		$(".promotion_des").html(item);
		item = "<img class='detail-icon' src='img/comment/phone.png'/><b>Điện thoại:</b> " + part.Phone + ".<br><br>" +
		"<img class='detail-icon' src='img/comment/website.png'/><b>Trang web: </b><a href='#' style='color: #168DFE;' onclick=\"utils.OpenLink('" + part.Website + "')\">Tại đây</a><br><br>" +
        "<img class='detail-icon' src='img/comment/location.png'/><b>Địa điểm:</b>";

		if (store.currentShopId == -1) {
		    var color = 0;
		    for (var i = 0; i < store.promotions[store.currentPromotionId].ListShop.length; i++) {
		        item += '<div class="detail-content-location"><img class="detail-icon" src="img/comment/location1.png"/><div class="location-text">' + store.shops[store.promotions[store.currentPromotionId].ListShop[i]].Address + '</div></div><div class="line"></div>';
		    }
		} else {
		    var color = Math.round((Math.random() * 10)) % 5;
		    item += '<div class="detail-content-location"><img class="detail-icon" src="img/comment/location1.png"/><div class="location-text">' + store.shops[store.currentShopId].Address + '</div></div>';
		}
		//item += "<br><img src='" + host + store.partners[store.shops[store.promotions[store.currentPromotionId].ListShop[0]].PartnerId].Logo + "' style='width:100%;height:auto;'/><br>";

		$("#detail_under").html(item);
		//fill detail extend content
		$("#like_count span").html(p.Like);
		$("#rate_count span").html(p.Rate);
		$("#comment_count span").html(p.Comment);
		detailView.LoadComment();
		detailView.Refresh();
		scrolls[8].swipeTo(0);
	},

    Refresh: function () {
        $('.banner-text').css('height', docWidth / 9);
        scrolls.banner_slider.reInit();
        scrolls.banner_slider.swipeTo(1);
		scrolls[8].reInit();
		slider.ReInit("promotion_detail_slider");
	},

	LoadComment : function () {
		var loading = '<img src="img/loading.gif" class="loading_comment" />';
		$("#detail_comment_panel").html(loading);
		loadingComment = true;
		client.GetComments(function (data) {
			detailView.FillComment(data);
		},
        function (msg) { });
	},

	FillComment : function (data) {
		if (data.data == null) {
		    $("#detail_comment_panel").html(languageControl.GetText(2));
		    detailView.Refresh();
			return;
		}
		$("#detail_comment_panel").html('');
		for (var i = 0; i < data.data.length; i++) {
			$("#detail_comment_panel").prepend(detailView.CommentField(data.data[i]));
		}
		setTimeout(detailView.Refresh, 500);
		setTimeout(detailView.Refresh, 1000);
	},
	CommentField: function (data) {
	    var d = new Date();
		return "<div class='comment_item'>" +
		"<img src='" + host + data.avatar + "?" + d.getTime() + "' />" +
		"<span class='comment_text font_size_12' style='width:" + (comment_text - 10) + "px;'>" +
		"<p class='comment-username'>" + data.userName + "</p><p class='comment-content'>" + data.content + "</p><p class='comment-time'>" + data.createDate + "</p></span> </div><div class='line'></div>";

	},

	UserComment: function (content) {
	    var d = new Date();
		return "<div class='comment_item'>" +
		"<img src='" + userControl.endUser.avatar + "?" + d.getTime() + "' />" +
		"<span class='comment_text font_size_12' style='width:" + (comment_text - 10) + "px;'>" +
		"<p  class='comment-username'>" + userControl.endUser.userName + "</p><p class='comment-content'>" + content + "</p><p class='comment-time'>" + utils.GetDateString() + "</p></span> </div><div class='line'></div>";
	},
	AddComment: function (data) {
	    if ($("#detail_comment_panel").html() == "<p class='text-center'>Chưa có bình luận nào</p>") {
	        $("#detail_comment_panel").html('');
	    }
	    $(".comments").prepend(commentPage.CommentField(data.data[i]));
	},
};
