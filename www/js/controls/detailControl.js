//social

var detailControl = {
    Like: function () {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            pageManager.ChangePage("login_dialog");
            return;
        }
        else {
            store.UpdateLike(store.currentPromotionId + '');
            if (store.Contains(store.likeList, store.currentPromotionId)) {
                $(".like-img").attr("src", "img/like3.png");
            } else {
                $(".like-img").attr("src", "img/like.png");
            }
            //client.Like(function (data) { }, function (msg) { });
        }
    },

    GetCode: function () {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ LẤY MÃ ƯU ĐÃI");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            pageManager.ChangePage("login_dialog");
            return;
        }
        else {
            utils.ShowLoading();
            client.GetDealCode(function (data) {
                utils.HideLoading();
                if (data.status == 'ok') {
                    $(".getcodecontainer1").addClass('hidden');
                    $(".getcodecontainer").removeClass('hidden');
                    $("#deal_code_button").html(utils.GenSlash(data.data.code));
                    $(".showQRButton").removeClass("hidden");
                } else {
                    utils.Alert(data.msg, "Thông báo", function () { });
                }
            },
             function (data) {
                 utils.HideLoading();
                 utils.Alert(data.msg, "Thông báo", function () { });
             })
        }
    },

    OnCommentClick: function () {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ BÌNH LUẬN");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1");
            pageManager.ChangePage("login_dialog");
            return;
        }
        pageManager.ChangePage("comment_page");
        if (loadingComment) {
            utils.ShowLoading();
        }
    },

    Rate: function () {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ ĐÁNH GIÁ");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            pageManager.ChangePage("login_dialog");
            return;
        }
        utils.OpenPopup("#rate_dialog");
    },

    RateCallback: function (data) {
    },

    UpdateStars: function (stars) {
        for (var i = 1; i <= stars; i++) {
            $("#rate_pic_" + i).attr("src", "img/star_filled.png");
        }
        for (var i = stars + 1; i <= 5; i++) {
            $("#rate_pic_" + i).attr("src", "img/star_empty.png");
        }
    },

    SendComment: function () {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            pageManager.ChangePage("login_dialog");
            return;
        }
        else {
            var s = $("#comment_text_area").val();
            if (s == '') {
                return;
            }
            $("#comment_text_area").val('');
            if ($("#comment_count span").html() == '0') {
                $("#detail_comment_panel").html('');
            }
            $("#detail_comment_panel").prepend(detailView.UserComment(s));
            detailView.Refresh();
            client.Comment(s, function (data) {
                $("#comment_count span").html(data.totalComment);
            },
         function (msg) { });
        }
    },

    OnStarClick: function (index) {
        detailControl.UpdateStars(index);
        setTimeout(detailControl.CloseRate, 1000);
        client.Rate(index, function () { }, function (msg) {
            utils.Alert(msg, "Lỗi", function () { })
        });
    },

    CloseRate:function(){
        utils.ClosePopup("#rate_dialog")
    },

    OnFooterClick: function (index) {
        if (index == -1) {
            pageManager.OnBackClick();
            return;
        }
        pageManager.ChangePage("detail_extend_page");
        extendControl.slider.swipeTo(index);
        extendControl.next_extend_tab = index;
        extendControl.SetActiveTab(index);
    },
    OnShowQRClick: function () {
        this.GenQRCode();
        utils.OpenPopup('#qr_dialog');
        //$('#qrcode').removeClass('hidden');
        //scrolls[8].reInit();
    },

    OnInfoMenuClick: function () {
        utils.CloseMenu();
        utils.OpenPopup('#info_dialog');
    },

    GenQRCode: function () {
        var elText = utils.RemoveSlash($("#deal_code_button").html());
        qrcode.makeCode(elText);
    },
    OnSocialClick: function (index) {
        switch (index) {
            case 1: //like
                detailControl.Like();
                break;
            case 2: //comment
                scrolls[8].swipeTo(2);
                break;
            case 3:
                detailControl.Rate();
                break; //rate
            case 4:
                var p = store.promotions[store.currentPromotionId];
                var url = "https://www.facebook.com/dialog/feed?app_id=849496091767631&display=popup&redirect_uri=https://facebook.com";
                url += "&link=" + store.partners[store.shops[p.ListShop[0]].PartnerId].Website;
                url += "&caption=" + store.partners[store.shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Title + " cho khách hàng Vinaphone";
                url += "&description=" + store.partners[store.shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Description + " cho khách hàng Vinaphone";
                url += "&picture=" + host + p.Photo[0];
                url = encodeURI(url);
                utils.OpenLink(url);
                break; //share
        }
    },
}

var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: docWidth / 3 * 2,
    height: docWidth / 3 * 2
});