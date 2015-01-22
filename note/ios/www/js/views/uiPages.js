

var cPage = { //categories page
    OnMenuClick:function(index){
        ui.CloseMenu();
        switch (index) {
            case 1:
                $(".category_title").html("Ẩm thực");
                break;
            case 2:
                $(".category_title").html("Mua sắm");
                break;
            case 3:
                $(".category_title").html("Giải trí");
                break;
            case 4:
                $(".category_title").html("Du lịch");
                break;
            case 5:
                $(".category_title").html("Sức khỏe");
                break;
            case 6:
                $(".category_title").html("Giáo dục");
                break;
        }
        geoAddMarker(currentCategoryId, index);
        currentCategoryId = index;
        ui.ShowPromotionsPage(false);
        ui.ReloadPromotionsPage();
    },
    OnCategoryClick: function (index) {
        ui.CloseMenu();
        switch (index) {
            case 1:
                $(".category_title").html("Ẩm thực");
                break;
            case 2:
                $(".category_title").html("Mua sắm");
                break;
            case 3:
                $(".category_title").html("Giải trí");
                break;
            case 4:
                $(".category_title").html("Du lịch");
                break;
            case 5:
                $(".category_title").html("Sức khỏe");
                break;
            case 6:
                $(".category_title").html("Giáo dục");
                break;
        }
        geoAddMarker(currentCategoryId, index);
        currentCategoryId = index;
        ui.ShowPromotionsPage(true);
    },
    Login: function () {
        user.Login();
    }
}


var pPage = { //promotions page
    OnPromotionClick: function (id, addId, shopId) {
        currentPromotionId = id;
        currentPromotionAddId = addId;
        currentShopId = shopId;
        ui.ShowPromotionDetailPage(true);
        client.AddViewPromotion();
    },
    OnNavItemClick: function (index) {
        this.ChangePromotionTab(index);
    },
    ChangePromotionTab: function (index) {
        var selector = "#p" + index;
        this.UpdatePromotionTabStatus();
        promotion_slider.swipeTo(index);
    },
    UpdatePromotionTabStatus: function () {
        for (var i = 0; i < 4; i++) {
            $("#nav_item" + i).removeClass("active");
        }
        $("#nav_item" + promotion_slider.activeIndex).addClass("active");
        if (promotion_slider.activeIndex == 1) {
            if (map != null) {
                google.maps.event.trigger(map, 'resize');
                if (deviceLocation == null) {
                    map.setCenter(new google.maps.LatLng(defaultLocation[0], defaultLocation[1]));
                }
                else {
                    map.setCenter(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
                }
            }
        }
    },
}

var promotion_slider = $('.promotion_page_slider').swiper({
    noSwiping: true,
    onSlideChangeStart: function (swiper, direction) {
        pPage.UpdatePromotionTabStatus();
    }
});



function ReInitPromotionsScroll() {
    newScroll
}
var dPage = { //promotion detail page

    OnHomeClick: function () {
        ui.ShowCategoryPage(false);
    },

    OnSocialClick:function(index){
        switch (index) {
            case 1: //like
                detailLike();
                break;
            case 2: //comment
                detailCommentClick();
                break;
            case 3:
                detailRate();
                break; //rate
            case 4:
                var p = promotions[currentPromotionId];
                var url = "https://www.facebook.com/dialog/feed?app_id=849496091767631&display=popup&redirect_uri=https://facebook.com&link=http://vinaphoneplus.com.vn";
                url += "&caption=" + partners[shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Title + " cho khách hàng Vinaphone";
                url += "&description=" + partners[shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Description + " cho khách hàng Vinaphone";
                url += "&picture=" + host + p.Photo[0];
                ui.OpenLink(url);
                break; //share
        }
    },

    OnFooterClick: function (index) {
        if (index == -1) {
            ui.OnBackClick();
            return;
        }
        ui.ChangePage("detail_extend_page");
        extend_slider.swipeTo(index);
        next_extend_tab = index;
        ePage.SetActiveTab(index);
    },
    
    OnGetDealCodeClick: function () {
        detailGetCode();
    },

    OnInfoMenuClick: function () {
        ui.CloseMenu();
        ui.OpenPopup('#info_dialog');
    }
}


var ePage = {
    ChangeExtendTab: function (index) {
        this.UpdateExtendTabStatus();
        extend_slider.swipeTo(index);
    },
    UpdateExtendTabStatus: function () {
        this.SetActiveTab(extend_slider.activeIndex);
        if (extend_slider.activeIndex == 1) {
            if (subMap != null) {
                google.maps.event.trigger(subMap, 'resize');
                subMap.setCenter(map_marker[promotions[currentPromotionId].ListShop[0]].Marker.getPosition());
            }
        }
    },
    SetActiveTab:function(index){
        for (var i = 0; i < 4; i++) {
            $("#e" + i).removeClass("active");
        }
        $("#e" + index).addClass("active");
    },
    OnTabClick: function (index) {
        switch (index) {
            case -1:
                ui.OnBackClick();
                break;
            default:
                this.ChangeExtendTab(index);
                break;
        }
    },
    OnLocationItemClick: function (shopId) {
        var marker = map_marker[shopId].Marker;
        subMap.setCenter(marker.getPosition());
        marker.setMap(subMap);
        /*var infowindow = new google.maps.InfoWindow({
            content: '<div id="content">' +
                          '<div id="siteNotice"><b>' + partners[shops[shopId].PartnerId].Title +
                          '</b></div>' +
                          '<div id="bodyContent"><b>Phone:</b> ' + partners[shops[shopId].PartnerId].Phone + '<br><b>Website:</b> <a href="' + partners[shops[shopId].PartnerId].Website + '">' + partners[shops[shopId].PartnerId].Website + '</a>' +
                          '</div>' +
                          '</div>'
        });
        infowindow.open(subMap, marker);*/
    }
}

var extend_slider = $('.detail_extend_slider').swiper({
    noSwiping: true,
    onSlideChangeStart: function (swiper, direction) {
        ePage.UpdateExtendTabStatus();
    },
    onSlideChangeEnd:function (swiper, direction) {
        ePage.UpdateExtendTabStatus();
    }
});

var commentPage = {
    FillData: function (data) {
        if (data.data == null) {
            return;
        }
        for (var i = 0; i < data.data.length; i++) {
            $(".comments").prepend(commentPage.CommentField(data.data[i]));
        }
    },
    CommentField: function (data) {
        return "<div class='comment_item'>" +
                "<img src='" + host + data.avatar + "' />" +
                "<span class='comment_text font_size_14' style='width:" + (comment_text - 5) + "px;'>" +
                    "<b>" + data.userName + "</b><br />" + data.content + "<br>" + data.createDate + "</span> </div><div class='clear'></div>";
    },
    AddComment: function (data) {
        $(".comments").prepend(commentPage.CommentField(data.data[i]));
    },
    SendComment: function () {
        var s = $("#comment_input").val();
        $("#comment_input").val('');
        client.Comment(s, function (data) {
            if (data.data.avatar == null) {
                data.data.avatar = 'Uploads/avatar/avatar_default.png';
            }
            promotions[data.data.promotionId].AddComment(data.data);
            data.data.createDate = data.data.createrDate;
            $(".comments").prepend(commentPage.CommentField(data.data));
            $("#comment_count").html(data.totalComment);
        },
        function (msg) { });
    }
}

var loginPage = {
    UpdateClick: function () {
        ui.ChangePage("login_dialog");
        user.HideAllPopupTab();
        ui.Show("#login_popup5");
        $("#inf_txthoten").val(endUser.userName);
        $("#inf_txtemail").val(endUser.email);
        $("#inf_txtsdt").html(endUser.phone);
    },

    ProcessUpdate: function () {
        endUser.userName = $("#inf_txthoten").val();
        endUser.email = $("#inf_txtemail").val();
        if (!validateForm(endUser.email)) {
            ui.Alert("Email không hợp lệ.", "Lỗi", function () { });
            return;
        }
        ui.ShowLoading();
        endUser.userName = $("#inf_txthoten").val();
        endUser.email = $("#inf_txtemail").val();
        client.UpdateUserInfo(
            function () {
                ui.HideLoading();
                ui.Alert("Cập nhật thông tin thành công.", "Thông báo",
                    function () {
                        //ui.ClosePopup("#login_dialog");
                        ui.OnBackClick();
                    });
            },
            function () { });
    }
}
function validateForm(val) {
    var x = val;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        return false;
    }
    return true;
}