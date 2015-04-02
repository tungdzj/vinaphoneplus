var promotionView = {
    currentSlide: [],
	currentLikeSlide: 0,
    slShow: 10,
    slideSize: 0,
    searchresult: [],
    Update: function () {
        promotionView.ReloadPromotionsPage();
        promotionControl.slider.swipeTo(1);
		//if (scrolls["promotion_nav"].activeIndex == 0 && promotionControl.likeList.length == 0){
		//	scrolls["promotion_nav"].swipeTo(1);
		//}
		promotionView.Refresh();
    },
	
	UpdateLike:function(){
		$(".likeScroll .swiper-wrapper").empty();
		 //show liked
        var l2 = store.likeList.length;
        var d = 0;
		var l1 = promotionView.slShow / 2 * 3;
        while (d < l1 && d < l2) {
			if (store.promotions[store.likeList[d]] != null) {
            $(".likeScroll .swiper-wrapper ").append(promotionView.PromotionItemSlide(store.likeList[d], -1));
            d++;
			}
        }
		scrolls["like"].reInit();
		
		
	},

    Refresh: function () {
        scrolls["random"].reInit();
        scrolls["hot"].reInit();
        scrolls["new"].reInit();
        scrolls["near"].reInit();
        //scrolls["promotion_nav"].reInit();
        promotionControl.slider.reInit();
        //scrolls["bestbuy"].reInit();
        scrolls["search"].reInit();
		scrolls["like"].reInit();

    },

    OnPromotionClick: function () {

    },

    ShowRequireLogin:function(){
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
        userView.HideAllPopupTab();
        utils.Show("#login_popup1")
        pageManager.ChangePage("login_dialog");
        return;
    },
    ReloadPromotionsPage: function () {
        if (store.promotions.length == 0) {
            utils.ShowLoading();
            return;
        }
        for (var i in promotionView.currentSlide) {
            promotionView.currentSlide[i] = 0;
        }

        var da = new Date();
        utils.HideLoading();
        $(".randomScroll .swiper-wrapper").empty();
        $(".hotScroll .swiper-wrapper").empty();
        $(".newScroll .swiper-wrapper").empty();
        $(".nearScroll .swiper-wrapper").empty();
        //$(".bestbuyScroll .swiper-wrapper").empty();
        $(".searchScroll .swiper-wrapper").empty();
        $(".likeScroll .swiper-wrapper").empty();
        var color = 0;
        //show random
        var l1 = promotionView.slShow / 2 * 3;
        var l2 = store.plist[store.currentCategoryId][0].length;
        if (promotionControl.slider.activeIndex != 5) {
            $("#moredata1").removeClass("visible");
        }
        $("#moredata2").removeClass("visible");
        if (l2 > 0) {
            var d = 0;
            while (d < l1 && d < l2) {
                $(".randomScroll .swiper-wrapper ").append(
                    promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][0][d][0], store.plist[store.currentCategoryId][0][d][1]));
                d++;
            }
        } else {
            $("#moredata1").addClass("visible");
            $("#moredata1").html("Chưa có ưu đãi nào trong mục này.");
            utils.HideLoading();
            ReInitPromotionsScroll();
        }
        //show liked
        var l2 = store.likeList.length;
        if (l2 == 0) {
            if (userControl.loggedIn) {
                $(".likeScroll .swiper-wrapper ").append("<div class='swiper-slide'><p class='no-promotion'>Chưa có ưu đãi nào</p></div>")
            } else {
                $(".likeScroll .swiper-wrapper ").append("<div class='swiper-slide'><p class='no-promotion'><span style='color:blue;' onclick='promotionView.ShowRequireLogin()'>Vui lòng đăng nhập</span></p></div>")
            }
            
        } else {
            var d = 0;
            while (d < l1 && d < l2) {
                if (store.promotions[store.likeList[d]] != null) {
                    $(".likeScroll .swiper-wrapper ").append(promotionView.PromotionItemSlide(store.likeList[d], -1));
                }
                d++;
            }
        }
        
        //show hot
        var l2 = store.plist[store.currentCategoryId][1].length;
        var d = 0;
        while (d < l1 && d < l2) {
            $(".hotScroll .swiper-wrapper ").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][1][d][0], store.plist[store.currentCategoryId][1][d][1]));
            d++;
        }
        //show new
        var l2 = store.plist[store.currentCategoryId][2].length;
        var d = 0;
        while (d < l1 && d < l2) {
            $(".newScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][2][d][0], store.plist[store.currentCategoryId][2][d][1]));
            d++;
        }
        //show near
        for (var i = 0; i < store.plist[store.currentCategoryId][3].length; i++) {
            //scrolls["near"].appendSlide(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][3][i][0], store.plist[store.currentCategoryId][3][i][1]));
            $(".nearScroll .swiper-wrapper ").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][3][i][0], store.plist[store.currentCategoryId][3][i][1]));
        }
        //show best buy
        //for (var i = 0; i < store.plist[store.currentCategoryId][4].length; i++) {
        //    //scrolls["bestbuy"].appendSlide(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][4][i][0], store.plist[store.currentCategoryId][4][i][1]));
        //    $(".bestbuyScroll .swiper-wrapper ").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][4][i][0], store.plist[store.currentCategoryId][4][i][1]));
        //}
        utils.HideLoading();
        ReInitPromotionsScroll();
        if (promotionView.slideSize == 0) {
            promotionView.slideSize = $(".newScroll .swiper-wrapper .swiper-slide").height();
        }
    },
	
    PromotionItemSlide: function (p, s) {
        var padd = store.promotions[p].PromotionAdd;
        var description = "";
        if (s == -1) {
            onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, -1)";
            description = "<p class='location'>"+store.promotions[p].AreaText + " </p><p class='partner'>" + store.partners[store.promotions[p].PartnerId].PartnerName + "</p><p class='slogan'> " + store.promotions[p].Slogan + "</p>"
        } else {
            onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, " + s + ")";
            description = "<p class='partner'>" + store.shops[s].ShopName + "</p><p class='slogan'>" + store.promotions[p].Slogan + "</p>"
        }
        var url = (store.partners[store.promotions[p].PartnerId] != null ? host + store.partners[store.promotions[p].PartnerId].Logo : "img/default_partner.png");

        var time = "(" + utils.GetDayFromString(store.promotions[p].StartDate) + "-" + utils.GetDayFromString(store.promotions[p].EndDate) + ")";
        var percent = Number(store.promotions[p].PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0")
        var like = 0;
        if (store.Contains(store.likeList, p)) {
            like = 1;
        }
        var add = (padd != null);
        if (percent > 0) {
            return "<div class='swiper-slide'><div class='promotion_item grad_p'>" +
                "<img class='logo'  src=\"" + url + "\"  onclick='" + onclick_func + "'/>" +
                "<div class='des' onclick='" + onclick_func + "'>" + description + "</div>" +
                "<div class='" + (!add ? "percent" : "percent_add") + "' onclick='promotionControl.OnLikeClick(this, " + p + ")'>" +
                "<p>-" + percent + "\%</p>" +
				"<img class='p-like pid" + p + "' src='img/like" + (like == 0 ? '4' : "1") + ".png'/></div></div>" +
                "<div class='line'></div></div>";

        }
        return "<div class='swiper-slide'><div class='promotion_item grad_p'>" +
                "<img class='logo' src=\"" + url + "\" onclick='" + onclick_func + "' />" +
                "<div class='des' onclick=\"" + onclick_func + "\" >" + description + "</div>" +
                "<div class='" + (!add ? "percent_0" : "percent_0_add") + "' onclick='promotionControl.OnLikeClick(this, " + p + ")'>" +
				"<img class='p-like pid" + p + "' src='img/like" + (like == 0 ? '4' : '1') + ".png'/></div></div>"+
                "<div class='line'></div></div>";
        //if (percent > 0) {
        //    return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;'>" +
        //        "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;' onclick=\"" + onclick_func + "\"><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
        //        "<div class=\"description font_size_12\" style=\"position:relative;width:" + descriptionSize + "px;\" onclick=\"" + onclick_func + "\">" +
        //        description + "</div>" +
        //        "<div onclick='promotionControl.OnLikeClick(this, " + p + ")' class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
        //        "<span class='font_size_24' style='margin-top:27%;'>-" + percent + "\%</span>"+
		//		"<img class='p-like pid"+ p +"' src='img/like" + (like == 0 ? '': "1") + ".png'/></div></div></div>";
        //}
        //return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;'>" +
        //        "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;' onclick=\"" + onclick_func + "\"><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
        //        "<div onclick=\"" + onclick_func + "\" class=\"description font_size_12\" style=\"position:relative; width:" + descriptionSize + "px;\">" +
        //        description +
        //        "</div><div onclick='promotionControl.OnLikeClick(this, " + p + ")' class='" + (!add ? "percent_0" : "percent_0_add") + "' style='width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; '>"+
		//		"<img class='p-like pid" + p + "' src='img/like" + (like == 0 ? '' : "1") + ".png'/></div></div></div>";
    }
}

//init value
for (var i = 0; i < 5; i++) {
    promotionView.currentSlide[i] = 0;
}