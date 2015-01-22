var popupOpen = "none";
var currentPage = "categories_page";
var lastPage = "categories_page";
var backClick = false;
var currentTab = 0;
var next_extend_tab = 0;
var loadingComment = false;
var isLoading = false;
var promotionColor = (Math.round(Math.random() * 10) % 5);

var ui = {
    Alert: function (message, title, callback) {
        if (window.cordova) {
            navigator.notification.alert(
            message,
            callback,         // callback
            title,
            "Đóng"
            );
        } else {
            alert(message);
            callback();
        }
        
    },

    OpenLink: function (link) {
        window.open(link, '_blank', 'location=yes');
    },

    OnBackClick: function () {
        backClick = true;
        if (popupOpen != "none") {
            ui.ClosePopup(popupOpen);
            popupOpen = "none";
            return;
        }
        switch (currentPage) {
            case "promotions_page":
                this.ChangePage("categories_page");
                break;
            case "promotion_detail_page":
                this.ShowPromotionsPage(0, false);
                break;
            case "detail_extend_page":
                this.ShowPromotionDetailPage(false);
                break;
            case "comment_page":
                this.ShowPromotionDetailPage(false);
                break;
            case "login_dialog":
                ui.ChangePage(lastPage);
                break;
            default:
                navigator.notification.confirm(
                    'Thoát ứng dụng?',
                    function (button) {
                        if (button == 1) {
                            navigator.app.exitApp();
                        }
                    },
                    'Thông báo',
                    ['Thoát','Trở lại']
                    );
                break;
        }
    },

    ShowCommentPage: function () {
        ChangePage("comment_page");
    },

    ChangePage: function (page) {
        //console.log("change page to : " + page + ":" + lastPage + ":" + currentPage);
        if (page == currentPage) {
            return;
        }
        lastPage = currentPage;
        $.mobile.changePage("#" + page, {
            transition: "pop",
            changeHash: false
        });
    },

    Show: function (page) {
        if ($(page).hasClass("hidden")) {
            $(page).removeClass("hidden");
        }
        if (page == "#login_popup3") {
            $(".warning_text").html("");
        }
    },

    Hide: function (page) {
        if (!$(page).hasClass("hidden")) {
            $(page).addClass("hidden");
        }
    },

    ShowCategoryPage: function (reload) {
        
        ui.ChangePage("categories_page");
        var max = 5;
        if (!reload) {
            return;
        }
        if (promotions.length <= 0 ||
            promotionsAdds.length <= 0 ||
            shops.length <= 0 ||
            partners.length <= 0) {
            return;
        }
    },

    ReloadPromotionsPage: function () {
        //console.log(promotions.length + ":" + shops.length + ":" + partners.length + ":" + bestView.length + ":" + bestBuy.length);
        //ui.ShowLoading();
        if (promotions.length == 0 ||
            shops.length == 0 ||
            partners.length == 0 ||
            bestView.length == 0 ||
            bestBuy.length == 0) {
            ui.ShowLoading();
            return;
        }
        $("#new_items").empty();
        $("#near_items").empty();
        $("#bestbuy_panel").empty();
        $("#bestview_panel").empty();
        scrolls[0].swipeTo(0);
        scrolls[1].swipeTo(0);
        scrolls[2].swipeTo(0);
        scrolls[3].swipeTo(0);
        var color = 0;
        //show new
        for (var p = 0; p < newPromotions.length; p++) {
            for (var s = 0; s < categories[currentCategoryId].length; s++) {
                if (contains(promotions[newPromotions[p]].ListShop, categories[currentCategoryId][s])) {
                    var padd = promotions[newPromotions[p]].PromotionAdd;
                    $("#new_items").append(ui.PromotionItem(
                        "pPage.OnPromotionClick(" + newPromotions[p] + "," + "-1, -1)",
                        partners[shops[categories[currentCategoryId][s]].PartnerId] != null ? host + partners[shops[categories[currentCategoryId][s]].PartnerId].Logo : "img/default_partner.png",
                        "<b>" + partners[shops[categories[currentCategoryId][s]].PartnerId].PartnerName + "</b> " +
                        promotions[newPromotions[p]].Title + "<br>" + 
                        "<i>Từ ngày</i> " + utilGetDayFromString(promotions[newPromotions[p]].StartDate) + " <i>đến ngày</i> " + utilGetDayFromString(promotions[newPromotions[p]].EndDate) + 
                        (padd != null ? "<br>" + padd.Title : ""),
                        Number(promotions[newPromotions[p]].PromotionPercent) + 
                        Number(padd != null ? padd.PercentAdd : "0"),
                        color++,
                        padd != null));
                    break;
                }
            }
        }
        
        //show near 
        color = 0;
        var maxnear = 15;
        var nearcount = 0;
        for (var s = 0; s < categories[currentCategoryId].length; s++) {
            for (var p in promotions) {
                if (contains(promotions[p].ListShop, categories[currentCategoryId][s])) {
                    var padd = promotions[p].PromotionAdd;
                    $("#near_items").append(ui.PromotionItem(
                        "pPage.OnPromotionClick(" + p + "," + "-1," + categories[currentCategoryId][s] + ")",
                        partners[shops[categories[currentCategoryId][s]].PartnerId] != null ? host + partners[shops[categories[currentCategoryId][s]].PartnerId].Logo : "img/default_partner.png",
                        "<b>" + partners[shops[categories[currentCategoryId][s]].PartnerId].PartnerName + "</b> " +
                        promotions[p].Title + "<br>" +
                        "<i>Từ ngày</i> " + utilGetDayFromString(promotions[p].StartDate) + " <i>đến ngày<i> " + utilGetDayFromString(promotions[p].EndDate) +
                        (padd != null ? "<br>" + padd.Title : ""),
                        Number(promotions[p].PromotionPercent) +
                        Number(padd != null ? padd.PercentAdd : "0"),
                        color++,
                        padd != null));
                    if (nearcount < maxnear) {
                        nearcount++;
                    }
                }
            }
            if (nearcount >= maxnear) {
                break;
            }
        }

        //show best view
        color = 0;
        var maxbest = 10;
        var count = 0;
        for (var p = 0; p < bestView.length; p++) {

            for (var s = 0; s < categories[currentCategoryId].length; s++) {
                if (promotions[bestView[p]] == null) {
                    continue;
                }
                if (contains(promotions[bestView[p]].ListShop, categories[currentCategoryId][s])) {
                    
                    var padd = promotions[bestView[p]].PromotionAdd;
                    count++;
                    $("#bestview_panel").append(ui.PromotionItem(
                        "pPage.OnPromotionClick(" + bestView[p] + "," + "-1, -1)",
                        host + partners[shops[categories[currentCategoryId][s]].PartnerId].Logo,
                        "<b>" + partners[shops[categories[currentCategoryId][s]].PartnerId].PartnerName + "</b> " + 
                        promotions[bestView[p]].Title + "<br>" +
                        "<i>Từ ngày<i> " + utilGetDayFromString(promotions[bestView[p]].StartDate) + " <i>đến ngày<i> " + utilGetDayFromString(promotions[bestView[p]].EndDate) +
                        (padd != null ? "<br>" + padd.Title : ""),
                        Number(promotions[bestView[p]].PromotionPercent) +
                        Number(padd != null ? padd.PercentAdd : "0"),
                        color++,
                        padd != null));
                    break;
                }
            }
            if (count >= maxbest) {
                break;
            }
        }
        
        //show best buy
        color = 0;
        count = 0;
        for (var p = 0; p < bestBuy.length; p++) {

            for (var s = 0; s < categories[currentCategoryId].length; s++) {
                if (promotions[bestBuy[p]] == null) {
                    continue;
                }
                if (contains(promotions[bestBuy[p]].ListShop, categories[currentCategoryId][s])) {

                    var padd = promotions[bestBuy[p]].PromotionAdd;
                    count++;
                    $("#bestbuy_panel").append(ui.PromotionItem(
                        "pPage.OnPromotionClick(" + bestBuy[p] + "," + "-1, -1)",
                        host + partners[shops[categories[currentCategoryId][s]].PartnerId].Logo,
                        "<b>" + partners[shops[categories[currentCategoryId][s]].PartnerId].PartnerName + "</b> " +
                        promotions[bestBuy[p]].Title + "<br>" +
                        "<i>Từ ngày<i> " + utilGetDayFromString(promotions[bestBuy[p]].StartDate) + " <i>đến ngày<i> " + utilGetDayFromString(promotions[bestBuy[p]].EndDate) +
                        (padd != null ? "<br>" + padd.Title : ""),
                        Number(promotions[bestBuy[p]].PromotionPercent) +
                        Number(padd != null ? padd.PercentAdd : "0"),
                        color++,
                        padd != null));
                    break;
                }
            }
            if (count >= maxbest) {
                break;
            }
        }
        ui.HideLoading();
        promotion_slider.reInit();
        //ReInitPromotionsScroll();
        scrolls[0].reInit();
        scrolls[1].reInit();
        scrolls[2].reInit();
        scrolls[3].reInit();
    },

    ShowPromotionsPage: function (reload) {
        if (reload) {
            $("#new_items").empty();
            $("#near_items").empty();
            $("#bestbuy_panel").empty();
            $("#bestview_panel").empty();
        }
        ui.ChangePage("promotions_page");
    },

    PromotionItem: function (onclick_func, url, description, percent, color, add) {
        if (percent > 0) {
            return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"width:" + descriptionSize + "px;\">" +
                description +
                "</div><div class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
                "<span class='font_size_24' style='margin-top:27%;'>" + percent + "\%</span></div></div><div class='line'></div>";
        }
        return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"width:" + descriptionSize + "px;\">" +
                description +
                "</div><div class='" + (!add ? "percent_0" : "percent_0_add") + "' style='width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; '></div></div><div class='line'></div>";
    },

    LoadComment: function () {
        $(".comments").empty();
        loadingComment = true;
        client.GetComments(function (data) {
            loadingComment = false;
            if (currentPage == "comment_page") {
                ui.HideLoading();
            }
            commentPage.FillData(data);
        },
        function (msg) {
        });
    },

    ShowPromotionDetailPage: function (reload) {
        ui.ChangePage("promotion_detail_page");
        if (promotionsCode[currentPromotionId] != null) {
            $("#deal_code_button").html(promotionsCode[currentPromotionId]);
        }
        else {
            $("#deal_code_button").html("Nhấn vào đây <br>để nhận mã ưu đãi");
        }
        var p = promotions[currentPromotionId];
        var padd = p.PromotionAdd;
        var part = partners[shops[p.ListShop[0]].PartnerId];
        //ui.ShowLoading();
        if (reload) {//back from another page
            ui.ChangePage("promotion_detail_page");
            //add slider images
            slider.RemoveAllSlide("promotion_detail_slider");
            for (var i = 0; i < p.Photo.length; i++){
                slider.AddSlide("promotion_detail_slider", host + p.Photo[i]);
            }
            
            if (promotionsCode[currentPromotionId] != null) {
                $("#deal_code_button").html(promotionsCode[currentPromotionId]);
            }
            else {
                $("#deal_code_button").html("Nhấn vào đây <br>để nhận mã ưu đãi");
            }
            var percent_number = Number(p.PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0");

            if (percent_number == 0) {
                $("#detail_page_percent img").attr("src", padd != null ? "img/percent_0_add.png" : "img/percent_0.png");
                $("#detail_page_percent_text").html('');
            } else {
                $("#detail_page_percent img").attr("src", padd != null ? "img/percent_add.png" : "img/percent.png");
                $("#detail_page_percent_text").html(percent_number + "%");
            }

            $("#detail_description").empty();
            //add social information

            //add description
            var item = "<b>" + part.PartnerName + "</b> " + p.Title +
                ". <i>Thời gian từ " + utilGetDayFromString(p.StartDate) + " đến " + utilGetDayFromString(p.EndDate) + "</i><br>" +
                (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utilGetDayFromString(padd.StartDate) + " đến " + utilGetDayFromString(padd.EndDate) + "</i></font><br>" : "");

            
            $("#detail_above").html(item + "<br>");
            $("#detail_title").html(item);
            item = "";
            item += "Hotline: " + part.Phone + ".<br>"+ 
                "<b>Website:</b><a href='#' onclick=\"ui.OpenLink('" + part.Website + "')\">" + part.Website + "</a><br>"
            item += p.Description + "<br>" + (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Description + "</font>": "");
            item += "<br><br>";
            $("#detail_under").html(item);
            //scrolls[4].reInit();
            //fill detail extend content
            $("#like_count").html(p.Like);
            $("#rate_count").html(p.Rate);
            $("#comment_count").html(p.Comment);
            ui.AddExtendInfo();
            ui.LoadComment();
        }
    },
    AddExtendInfo: function () {
        $(".infoItems").empty();
        $(".locationItems").empty();
        $(".imagesItems").empty();
        var s = "";
        //add info
        var p = partners[shops[promotions[currentPromotionId].ListShop[0]].PartnerId];
        if (p != null) {
            $(".infoItems").append("<img src='" + host + p.Logo + "' style='width:100%;height:auto;'/>");
            s += "<b class='font_size_20'>" + p.PartnerName + "</b><br>";
            s += p.Title + "<br>";
            s += "<b>ĐT: </b> " + p.Phone + "<br>";
            s += "<b>Email: </b> " + p.Email + "<br>";
            s += "<b>Website: </b><a href='#' onclick=\"ui.OpenLink('" + p.Website + "')\">" + p.Website + "</a><br>";
            s += p.Detail + "<br>";
            $(".infoItems").append(s + "<br><br>");
            //add list shops
            if (currentShopId == -1) {
                var color = 0;
                for (var i = 0; i < promotions[currentPromotionId].ListShop.length; i++) {
                    var item = "<div onclick='ePage.OnLocationItemClick(" + promotions[currentPromotionId].ListShop[i] + ")'class=\"font_size_12 location_item grad_" + color % 5 + "\" >" + shops[promotions[currentPromotionId].ListShop[i]].Address + "</div>";
                    color++;
                    $(".locationItems").append(item);
                }
                //add subMap marker
            } else {
                var color = Math.round((Math.random() * 10)) % 5;
                var item = "<div onclick='ePage.OnLocationItemClick(" + currentShopId + ")' class=\"font_size_12 location_item grad_" + color + "\" >" + shops[currentShopId].Address + "</div>";
                color++;
                $(".locationItems").append(item);
                //map_marker[currentShopId].Marker.setMap(subMap);
            }
        }
        //add images
        for (var i = 0; i < promotions[currentPromotionId].Photo.length; i++) {
            var item = "<img src='" + host + promotions[currentPromotionId].Photo[i] + "' style='width:100%;height:auto;'/>";
            $(".imagesItems").append(item);
        }
    },

    ShowPromotionTab: function (tabIndex) {
        ui.ChangePromotionTab(tabIndex);
    },

    UpdateLoginStatus: function (logged) {
        if (logged) {
            ui.Hide("#login_panel");
            ui.Show("#login_success_notify");
            $("#not_login_footer").addClass("hidden");
            $("#loggedin_footer").removeClass("hidden");
            return;
        }
        token = "none";
        $("#not_login_footer").removeClass("hidden");
        $("#loggedin_footer").addClass("hidden");
    },

    OpenPopup: function (selector) {
        popupOpen = selector;
        $(selector).popup('open', { transition: 'pop' });
    },

    ClosePopup: function (selector) {
        $(selector).popup('close');
        popupOpen = "none";
    },

    ToggleMenu: function () {
        $("#menu_panel").panel("toggle");
    },

    OpenMenu:function(){
        $("#menu_panel").panel("open");
    },

    CloseMenu: function () {
        $("#menu_panel").panel("close");
    },

    ShowLoading: function () {
        if (!isLoading) {
            isLoading = true;
            $.mobile.loading("show");
        }
    },

    HideLoading: function () {
        if (isLoading) {
            $.mobile.loading("hide");
            isLoading = false;
        }
    },

    UpdateCategorySlider: function () {
    }
}
function hardback() {
    ui.OnBackClick();
}

document.addEventListener("backbutton", hardback, false);

$("#rate_dialog").on("popupafterclose", function(event, ui){
    popupOpen = "none";
})

$("#login_dialog").on("popupafterclose", function (event, ui) {
    popupOpen = "none";
})

$("#info_dialog").on("popupafterclose", function (event, ui) {
    popupOpen = "none";
})

$("body").on("pagecontainerchange", function (event, ui) {
    currentPage = $.mobile.activePage.attr('id');
    switch (currentPage) {
        case "promotion_detail_page":
            slider.ReInit("promotion_detail_slider");
            break;
        case "detail_extend_page":
            scrolls[5].reInit();
            scrolls[6].reInit();
            scrolls[7].reInit();
            ePage.ChangeExtendTab(next_extend_tab);
            ePage.SetActiveTab(next_extend_tab);
            
            break;
        case "categories_page":
            slider.ReInit('member_image_slider');
            for (var i = 1; i <= 6; i++) {
                slider.ReInit('category_slider' + i);
            }
            break;
        case "promotions_page":
            if (!backClick) {
                rl();
            }
            promotion_slider.reInit();
            break;
        case "comment_page":
            $("#comment_input").css("height", docWidth / 4 + 10 + "px");
            break;
    }
    isLoading = false;
});

function rl() {
    ui.ShowLoading();
    ui.ReloadPromotionsPage();
}
ui.ChangePage("categories_page");