

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
            case 7:
                this.ShowHelp();
                break;
        }
        if (index > 6) {
            return;
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
    },
    ShowHelp: function () {
        ui.ChangePage("help_page");
    },

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
        scrolls[9].swipeTo(index);
        promotion_slider.swipeTo(index);
        this.UpdatePromotionTabStatus();
        
    },
    UpdatePromotionTabStatus: function () {
        $("#moredata1").addClass('hidden');
        $("#moredata2").addClass('hidden');
        scrolls[9].swipeTo(promotion_slider.activeIndex);
        if (promotion_slider.activeIndex == 5) {
            if (scrolls[11].slides.length == 0) {
                $("#moredata1").removeClass('hidden');
                $("#moredata1").html("Chưa có ưu đãi nào trong mục này.");
                OpenSearchPanel(0);
            }
        } else if (promotion_slider.previousIndex == 5) {
            if (plist[currentCategoryId][0].length > 0) {
                $("#moredata1").addClass("hidden");
            }
        }
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

    OnSearchClick: function () {
        OpenSearchPanel(0);
        //promotion_slider.swipeTo(5);
    },

    SearchPromotion: function () {
        var max = 10;
        var count = 0;
        CloseSearchPanel();
        if (partners.length == 0) {
            ui.Alert("Đang tải dữ liệu, quý khách vui lòng thử lại sau vài giây.", "Lỗi", function () {
            });
            return;
        }
        $("#search_result").empty();
        var result = ui.FillSearchArea();
        scrolls[11].swipeTo(0);
        scrolls[11].reInit();
        if (result == 0) {
            $("#moredata1").html("Không có ưu đãi nào trong mục này.")
            $("#moredata1").removeClass('hidden');
            ui.Alert("Không tìm được kết quả nào phù hợp", "Tìm kiếm", function () { });
            
        } else {
            $("#moredata1").addClass("hidden");
            promotion_slider.swipeTo(5);
        }
    }
}

var promotion_slider = $('.promotion_page_slider').swiper({
    noSwiping: true,
    onSlideChangeStart: function (swiper, direction) {
        pPage.UpdatePromotionTabStatus();
    },

});

var dPage = { //promotion detail page
    Order: function () {
        if (!loggedIn) {

        }
        OpenSearchPanel()
    },
    ActiveCode:function(){
        CloseSearchPanel();
    },
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
                var url = "https://www.facebook.com/dialog/feed?app_id=849496091767631&display=popup&redirect_uri=https://facebook.com";
                url += "&link=" + partners[shops[p.ListShop[0]].PartnerId].Website;
                url += "&caption=" + partners[shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Title + " cho khách hàng Vinaphone";
                url += "&description=" + partners[shops[p.ListShop[0]].PartnerId].PartnerName + " giảm giá " + p.Description + " cho khách hàng Vinaphone";
                url += "&picture=" + host + p.Photo[0];
                url = encodeURI(url);
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

    OnShowQRClick: function () {
        this.GenQRCode();
        ui.OpenPopup('#qr_dialog');
        //$('#qrcode').removeClass('hidden');
        //scrolls[8].reInit();
    },

    OnInfoMenuClick: function () {
        ui.CloseMenu();
        ui.OpenPopup('#info_dialog');
    },

    GenQRCode: function () {
        var elText = removeSlash($("#deal_code_button").html());
        qrcode.makeCode(elText);
    }
}
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: docWidth / 3 * 2,
    height: docWidth / 3 * 2
});

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
        clearRoute();
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
    OnAvatarClick: function () {
        navigator.notification.confirm(
                    'Cập nhật ảnh đại diện?',
                    function (button) {
                        if (button == 1) {
                            capturePhoto(1);
                        } else {
                            capturePhoto(0);
                        }
                        
                    },
                    'Thông báo',
                    ['Từ thư viện', 'Chụp']
                    );
        
    },
    UpdateClick: function () {
        if (loggedIn) {
            ui.ChangePage("login_dialog");
            user.HideAllPopupTab();
            ui.Show("#login_popup5");
            if (endUser == null) {
                ui.ShowLoading();
                return;
            }
            $("#inf_txthoten").html(endUser.userName);
            $("#inf_txtemail").html(endUser.email);
            $("#inf_txtsdt").html(endUser.phone);
        } else {
            cPage.Login();
        }
        
    },

    ProcessUpdate: function () {
        endUser.userName = $("#inf_txthoten").html();
        endUser.email = $("#inf_txtemail").html();
        endUser.address = $("#txt_address").html();
        if (!validateForm(endUser.email)) {
            ui.Alert("Email không hợp lệ.", "Lỗi", function () { });
            return;
        }
        ui.ShowLoading();
        endUser.userName = $("#inf_txthoten").html();
        endUser.email = $("#inf_txtemail").html();
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
    /*var x = val;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        return false;
    }*/
    return true;
}

var sPage = {
    suggestText: [
        ["Lẩu","Nướng","Buffet","Bánh","Cà phê","Coffee", "Pizza","Bia","Cá","Chim","Gà","Dê","Bò","Bít tết","BBQ","Chè","Sinh tố","Phở","Bánh Cuốn","Rượu","Tiệc cưới"],
        ["Mỹ phẩm", "Nước hoa", "Thời trang", "Quần", "Áo", "Váy", "Xe máy", "Nội thất", "Đồng hồ", "Giầy", "Dép", "Trang sức", "Hoa", "Điện máy"],
        ["Karaoke", "Golf", "Bar", "Phim", "Cinema", "Bóng đá", "Tennis"],
        ["Khách sạn", "Phòng", "Nghỉ", "Máy bay", "Resort"],
        ["Spa", "Tóc", "Da", "Móng", "Sức khỏe", "Bệnh viện", "Phòng khám", "Đa khoa", "Răng", "Fitness", "Yoga"],
        ["Online", "Tiếng Anh", "Tiếng Nhật", "Marketting", "Trung tâm"]
        ],
    suggestTag:[],
    areaId: 1,
    onRangeTextChange: function () {
        $(".suggest_range").removeClass('hidden');
        $(".suggest_range").empty();
        var first = 1;
        var name = $("#txt_range").val();
        for (var i in area) {
            if (matchName(area[i].tag, name)) {
                if (first) {
                    areaId = area[i].id;
                    first = 0;
                }
                $(".suggest_range").append('<li onclick="sPage.onRangeItemClick(' + i + ')">' + area[i].areaName + '</li>')
            }
        }
    },
    onRangeBlur:function(){
        setTimeout(function () {
            $(".suggest_range").addClass('hidden');
        }, 500);
    },

    onRangeItemClick: function (r) {
        $(".suggest_range").addClass('hidden');
        $("#txt_range").val(area[r].areaName)
        this.areaId = area[r].id;
    },

    onRangeTextClick:function(){
        $(".suggest_range").removeClass('hidden');
    },

    onSearchTextChange: function () {
        $(".suggest_text").removeClass('hidden');
        $(".suggest_text").empty();
        var name = $("#txt_search").val();
        for (var i in this.suggestTag[Number(currentCategoryId)-1]) {
            if (matchName(this.suggestTag[Number(currentCategoryId) - 1][i], name)) {
                $(".suggest_text").append('<li onclick="sPage.onSearchItemClick(' + i + ')">' + this.suggestText[Number(currentCategoryId) - 1][i] + '</li>')
            }
        }
    },
    onSearchBlur: function () {
        setTimeout(function () {
            $(".suggest_text").addClass('hidden');
        }, 500);
    },
    onSearchItemClick:function(index){
        $(".suggest_text").addClass('hidden');
        $("#txt_search").val(this.suggestText[Number(currentCategoryId) - 1][index])
    },

    ActiveCode: function () {
        client.ActiveCode(endUser.phone, $("#txt_active_code").val());
    },

    Order: function () {
        client.SendOrder();
    },

    CreateSuggestTag: function () {
        for (var i in this.suggestText) {
            this.suggestTag[i] = [];
            for (var j in this.suggestText[i]) {
                
                this.suggestTag[i].push(change_alias(this.suggestText[i][j]));
            }
            
        }
    }
}
sPage.CreateSuggestTag();