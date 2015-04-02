var detailView = {
    Update: function () {
		var p = store.promotions[store.currentPromotionId];
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

		if (store.Contains(store.likeList, store.currentPromotionId)) {
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
		var title = "<p>" + part.PartnerName + "</p> " + p.Title +
			". <i>Thời gian từ " + utils.GetDayFromString(p.StartDate) + " đến " + utils.GetDayFromString(p.EndDate) + "</i><br>" +
			(padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utils.GetDayFromString(padd.StartDate) + " đến " + utils.GetDayFromString(padd.EndDate) + "</i></font><br>" : "");

		$("#detail_title").html(title);
		//$("#detail_title").marquee({
		//    duration: 9000
		//});
		var item = "<b>" + part.PartnerName + "<br></b>" + part.Title + "<br>";// + p.Title + "</div>";
			
		$("#detail_above").html(item);
		item = p.Title;
		$(".promotion_title").html(item);
		item = "<b>Thời gian áp dụng: Từ " + utils.GetDayFromString(p.StartDate) + " đến " + utils.GetDayFromString(p.EndDate) + "</b><br>" +
			(padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utils.GetDayFromString(padd.StartDate) + " đến " + utils.GetDayFromString(padd.EndDate) + "</i></font><br>" : "");
		item += p.Description + "<br>" + (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Description + "</font>. " : ""); //<a href='#' onclick='OpenSearchPanel(1)'>Nhận tại đây</a>
		$(".promotion_des").html(item);
		item = "<b>Hotline:</b> " + part.Phone + ".<br>" +
		"<b>Website: </b><a href='#' onclick=\"utils.OpenLink('" + part.Website + "')\">Tại đây</a><br><p style='font-weight:bold;'>Địa điểm:</p>";

		if (store.currentShopId == -1) {
		    var color = 0;
		    for (var i = 0; i < store.promotions[store.currentPromotionId].ListShop.length; i++) {
		        item += '<div class="detail-content-location">' + store.shops[store.promotions[store.currentPromotionId].ListShop[i]].Address + '</div><div class="line"></div>';
		    }
		} else {
		    var color = Math.round((Math.random() * 10)) % 5;
		    item += '<div class="detail-content-location">' + store.shops[store.currentShopId].Address + '</div>';
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

	Refresh : function () {
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
			function (msg) {});
	},

	FillComment : function (data) {
		if (data.data == null) {
			$("#detail_comment_panel").html(languageControl.GetText(2));
			return;
		}
		$("#detail_comment_panel").html('');
		for (var i = 0; i < data.data.length; i++) {
			$("#detail_comment_panel").prepend(detailView.CommentField(data.data[i]));
		}
		detailView.Refresh();
	},
	CommentField : function (data) {
		return "<div class='comment_item'>" +
		"<img src='" + host + data.avatar + "' />" +
		"<span class='comment_text font_size_12' style='width:" + (comment_text - 10) + "px;'>" +
		"<b>" + data.userName + "</b><br />" + data.content + "<br><i>" + data.createDate + "</i></span> </div><div class='line'></div>";

	},

	UserComment : function (content) {
		return "<div class='comment_item'>" +
		"<img src='" + userControl.endUser.avatar + "' />" +
		"<span class='comment_text font_size_12' style='width:" + (comment_text - 10) + "px;'>" +
		"<b>" + userControl.endUser.userName + "</b><br />" + content + "<br><i>" + utils.GetDateString() + "</i></span> </div><div class='line'></div>";
	},
	AddComment: function (data) {
	    if ($("#detail_comment_panel").html() == "<p class='text-center'>Chưa có bình luận nào</p>") {
	        $("#detail_comment_panel").html('');
	    }

	    $(".comments").prepend(commentPage.CommentField(data.data[i]));
	},
};
