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

    Prompt: function (selector, message) {
        navigator.notification.prompt(
            message,
            function (result) {
                if (result.buttonIndex == 1) {
                    $(selector).html(result.input1);
                }
            },
            'Nhập',
            ['Xong', 'Hủy'],
            '');
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
            case "help_page":
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
        ui.HideLoading();
        CloseSearchPanel();
        if (page == currentPage) {
            return;
        }
        lastPage = currentPage;
        $.mobile.changePage("#" + page,
            {
                transition:'none',
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
    },

    ReloadPromotionsPage: function () {
        //console.error(promotions.length + ":" + shops.length + ":" + partners.length + ":" + bestView.length + ":" + bestBuy.length);
        //ui.ShowLoading();
        if (promotions.length == 0) {
            ui.ShowLoading();
            return;
        }
        for (var i = 0; i < 6; i++) {
            currentSlide[i] = 0;
        }
        
        var da = new Date();
        ui.HideLoading();
        $(".randomScroll .swiper-wrapper").empty();
        $(".hotScroll .swiper-wrapper").empty();
        $(".newScroll .swiper-wrapper").empty();
        $(".nearScroll .swiper-wrapper").empty();
        $(".bestbuyScroll .swiper-wrapper").empty();
        $(".searchScroll .swiper-wrapper").empty();
        var color = 0;
        //show random
        var l1 = slShow / 2 * 3;
        var l2 = plist[currentCategoryId][0].length;
        if (promotion_slider.activeIndex != 5) {
            $("#moredata1").removeClass("visible");
        }
        $("#moredata2").removeClass("visible");
        if (l2 > 0) {
            var d = 0;
            while (d < l1 && d < l2) {
                $(".randomScroll .swiper-wrapper ").append(ui.PromotionItemSlide(plist[currentCategoryId][0][d][0], plist[currentCategoryId][0][d][1]));
                d++;
            }
        } else {
            $("#moredata1").addClass("visible");
            $("#moredata1").html("Chưa có ưu đãi nào trong mục này.");
            ui.HideLoading();
            scrolls[0].reInit();
            scrolls[1].reInit();
            scrolls[2].reInit();
            scrolls[3].reInit();
            scrolls[10].reInit();
            scrolls[11].reInit();

            scrolls[0].swipeTo(0);
            scrolls[1].swipeTo(0);
            scrolls[2].swipeTo(0);
            scrolls[3].swipeTo(0);
            scrolls[10].swipeTo(0);
            scrolls[11].reInit();
        }
        
        //show hot
        var l2 = plist[currentCategoryId][1].length;
        var d = 0;
        while (d < l1 && d < l2) {
            $(".hotScroll .swiper-wrapper ").append(ui.PromotionItemSlide(plist[currentCategoryId][1][d][0], plist[currentCategoryId][1][d][1]));
            d++;
        }
        //show new
        var l2 = plist[currentCategoryId][2].length;
        var d = 0;
        while (d < l1 && d < l2) {
            $(".newScroll .swiper-wrapper ").append(ui.PromotionItemSlide(plist[currentCategoryId][2][d][0], plist[currentCategoryId][2][d][1]));
            d++;
        }
        //show near
        for (var i = 0; i < plist[currentCategoryId][3].length; i++) {
            //scrolls[3].appendSlide(ui.PromotionItemSlide(plist[currentCategoryId][3][i][0], plist[currentCategoryId][3][i][1]));
            $(".nearScroll .swiper-wrapper ").append(ui.PromotionItemSlide(plist[currentCategoryId][3][i][0], plist[currentCategoryId][3][i][1]));
        }
        //show best buy
        for (var i = 0; i < plist[currentCategoryId][4].length; i++) {
            //scrolls[10].appendSlide(ui.PromotionItemSlide(plist[currentCategoryId][4][i][0], plist[currentCategoryId][4][i][1]));
            $(".bestbuyScroll .swiper-wrapper ").append(ui.PromotionItemSlide(plist[currentCategoryId][4][i][0], plist[currentCategoryId][4][i][1]));
        }
        n = new Date();
        console.log("finish 0:" + n.getSeconds() + "-" + n.getMilliseconds());
        ui.HideLoading();
        scrolls[0].reInit();
        scrolls[1].reInit();
        scrolls[2].reInit();
        scrolls[3].reInit();
        scrolls[10].reInit();
        scrolls[11].reInit();

        scrolls[0].swipeTo(0);
        scrolls[1].swipeTo(0);
        scrolls[2].swipeTo(0);
        scrolls[3].swipeTo(0);
        scrolls[10].swipeTo(0);
        //promotion_slider.swipeTo(0);
        //scrolls[9].swipeTo(0);
        n = new Date();
        console.log("finish 1:" + n.getSeconds() + "-" + n.getMilliseconds());
        da = new Date();
    },

    ReloadNear:function(){
        scrolls[3].removeAllSlides();
        for (var i = 0; i < plist[currentCategoryId][3].length; i++) {
            scrolls[3].appendSlide(ui.PromotionItemSlide(plist[currentCategoryId][3][i][0], plist[currentCategoryId][3][i][1]));
        }
        scrolls[3].reInit();
        scrolls[3].swipeTo(0);
    },

    FillSearchArea: function () {
        currentSlide[5] = 0;
        scrolls[11].swipeTo(0);
        scrolls[11].removeAllSlides();
        var range = sPage.range;
        var max = 20;
        var count = 0;
        var pName = $("#txt_search").val();
        pName = change_alias(pName).toLowerCase();
        if (pName == "") {
            for (var d = 0; d < plist[currentCategoryId][2].length; d++) {
                var p = plist[currentCategoryId][2][d][0];
                if (sPage.areaId == 1) {
                    scrolls[11].appendSlide(ui.PromotionItemSlide(p, -1));
                    count++;
                } else {
                    for (var si = 0; si < promotions[plist[currentCategoryId][2][d][0]].ListShop.length; si++) {
                        if (shops[promotions[plist[currentCategoryId][2][d][0]].ListShop[si]].Area == sPage.areaId ||
                            shops[promotions[plist[currentCategoryId][2][d][0]].ListShop[si]].Area == 1) {
                            //scrolls[11].appendSlide(ui.PromotionItemSlide(p, -1));
                            count++;
                            searchresult.push(p);
                            break;
                        }
                    }
                }
            }
        } else {
            var tmp = new Array();
            for (var p = 0; p < plist[currentCategoryId][2].length; p++) {
                if (matchName(plist[currentCategoryId][2][p][2], pName)) {
                    tmp.push(plist[currentCategoryId][2][p][0]);
                }
            }

            for (var i = 0; i < tmp.length; i++) {
                var p = tmp[i];
                if (sPage.areaId == 1) {
                    scrolls[11].appendSlide(ui.PromotionItemSlide(p, -1));
                    count++;
                } else {
                    for (var si = 0; si < promotions[p].ListShop.length; si++) {
                        if (shops[promotions[p].ListShop[si]].Area == sPage.areaId ||
                            shops[promotions[p].ListShop[si]].Area == 1) {
                            //
                            searchresult.push(p);
                            count++;
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < slShow / 2 * 3; i++) {
            if (i < searchresult.length) {
                scrolls[11].appendSlide(ui.PromotionItemSlide(searchresult[i], -1));
            } else {
                break;
            }
        }
        return count;
    },

    ShowPromotionsPage: function (reload) {
        if (reload) {
            $(".randomScroll .swiper-wrapper ").empty();
            $(".hotScroll .swiper-wrapper ").empty();
            $(".newScroll .swiper-wrapper ").empty();
            $(".bestbuyScroll .swiper-wrapper ").empty();
            $(".searchScroll .swiper-wrapper ").empty();
        }
        ui.ChangePage("promotions_page");
    },

    PromotionItemSlide: function (p, s) {
        var padd = promotions[p].PromotionAdd;
        var description = '';
        if (s == -1) {
            description = promotions[p].AreaText + ' ';
            onclick_func = "pPage.OnPromotionClick(" + p + "," + "-1, -1)";
            description += "<b>" + truncate(partners[promotions[p].PartnerId].PartnerName, 40) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
        } else {
            onclick_func = "pPage.OnPromotionClick(" + p + "," + "-1, " + s + ")";
            description += "<b>" + truncate(shops[s].ShopName, 40) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
        }
        var url = (partners[promotions[p].PartnerId] != null ? host + partners[promotions[p].PartnerId].Logo : "img/default_partner.png");
        
        var time = "(" + utilGetDayFromString(promotions[p].StartDate) + "-" + utilGetDayFromString(promotions[p].EndDate) + ")";
        var percent = Number(promotions[p].PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0")
        var add = padd != null;
        if (percent > 0) {
            return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"position:relative;width:" + descriptionSize + "px;\">" +
                description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
                "</div><div class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
                "<span class='font_size_24' style='margin-top:27%;'>" + percent + "\%</span></div></div><div class='line'></div></div>";
        }
        return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"position:relative; width:" + descriptionSize + "px;\">" +
                description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
                "</div><div class='" + (!add ? "percent_0" : "percent_0_add") + "' style='width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; '></div></div><div class='line'></div></div>";
    },
    PromotionItem: function (p, s) {
        var padd = promotions[p].PromotionAdd;
        if (s == -1) {
            onclick_func = "pPage.OnPromotionClick(" + p + "," + "-1, -1)";
        } else {
            onclick_func = "pPage.OnPromotionClick(" + p + "," + "-1, " + s + ")";
        }
        var url = (partners[promotions[p].PartnerId] != null ? host + partners[promotions[p].PartnerId].Logo : "img/default_partner.png");
        var description = "<b>" + truncate(partners[promotions[p].PartnerId].PartnerName, 40) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
        var time = "(" + utilGetDayFromString(promotions[p].StartDate) + "-" + utilGetDayFromString(promotions[p].EndDate) + ")";
        var percent = Number(promotions[p].PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0")
        var add = padd != null;
        if (percent > 0) {
            return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"position:relative;width:" + descriptionSize + "px;\">" +
                description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
                "</div><div class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
                "<span class='font_size_24' style='margin-top:27%;'>" + percent + "\%</span></div></div><div class='line'></div>";
        }
        return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
                "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
                "<div class=\"description font_size_12\" style=\"position:relative; width:" + descriptionSize + "px;\">" +
                description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
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
        var p = promotions[currentPromotionId];
        ui.ChangePage("promotion_detail_page");
        if (promotionsCode[currentPromotionId] != null) {
            $(".getcodecontainer1").addClass('hidden');
            $(".getcodecontainer").removeClass('hidden');
        }
        else {
            $(".getcodecontainer1").removeClass('hidden');
            $(".getcodecontainer").addClass('hidden');
        }
        if (p.ActiveService != null ||
            p.ActiveService == '0') {
            $(".active70").removeClass('hidden');
        } else {
            $(".active70").addClass('hidden');
        }
        
        var padd = p.PromotionAdd;
        var part = partners[shops[p.ListShop[0]].PartnerId];
        if (reload) {//back from another page
            ui.ChangePage("promotion_detail_page");
            //add slider images
            slider.RemoveAllSlide("promotion_detail_slider");
            for (var i = 0; i < p.Photo.length; i++){
                slider.AddSlide("promotion_detail_slider", host + p.Photo[i]);
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
            var title = "<b>" + part.PartnerName + "</b> " + p.Title +
                ". <i>Thời gian từ " + utilGetDayFromString(p.StartDate) + " đến " + utilGetDayFromString(p.EndDate) + "</i><br>" +
                (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utilGetDayFromString(padd.StartDate) + " đến " + utilGetDayFromString(padd.EndDate) + "</i></font><br>" : "");

            
            
            $("#detail_title").html(title);
            var item = "<br><b>" + part.PartnerName + "</b><br> " + p.Title +
               ". <i>Thời gian từ " + utilGetDayFromString(p.StartDate) + " đến " + utilGetDayFromString(p.EndDate) + "</i><br>" +
               (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Title + ". <i>Thời gian từ " + utilGetDayFromString(padd.StartDate) + " đến " + utilGetDayFromString(padd.EndDate) + "</i></font><br>" : "");
            $("#detail_above").html(item + "<br>");

            item = "";
            item += "<b>Hotline:</b> " + part.Phone + ".<br>"+ 
                "<b>Website: </b><a href='#' onclick=\"ui.OpenLink('" + part.Website + "')\">Tại đây</a><br>"
            item += p.Description + "<br>" + (padd != null ? "<font style='color:#00a0e4;'><b>VinaPhone</b> " + padd.Description + "</font>. " : "");//<a href='#' onclick='OpenSearchPanel(1)'>Nhận tại đây</a>
            item += "<br><br>";
            $("#detail_under").html(item);
            //fill detail extend content
            $("#like_count").html(p.Like);
            $("#rate_count").html(p.Rate);
            $("#comment_count").html(p.Comment);
            scrolls[8].reInit();
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
            $(".infoItems").append("<br><img src='" + host + p.Logo + "' style='width:100%;height:auto;'/>");
            s += "<b class='font_size_20'>" + p.PartnerName + "</b><br>";
            s += p.Title + "<br><br>";
            s += "<b>Điện thoại: </b> " + p.Phone + "<br>";
            s += "<b>Email: </b> " + p.Email + "<br>";
            s += "<b>Website: </b><a href='#' onclick=\"ui.OpenLink('" + p.Website + "')\">Tại đây</a><br><br>";
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
                ePage.OnLocationItemClick(promotions[currentPromotionId].ListShop[0]);
                //add subMap marker
            } else {
                var color = Math.round((Math.random() * 10)) % 5;
                var item = "<div onclick='ePage.OnLocationItemClick(" + currentShopId + ")' class=\"font_size_12 location_item grad_" + color + "\" >" + shops[currentShopId].Address + "</div>";
                color++;
                $(".locationItems").append(item);
                ePage.OnLocationItemClick(currentShopId);
                //map_marker[currentShopId].Marker.setMap(subMap);
            }
            
        }
        //add images
        scrolls[7].swipeTo(0);
        scrolls[7].removeAllSlides();
        for (var i = 0; i < promotions[currentPromotionId].Photo.length; i++) {
            var item = "<img src='" + host + promotions[currentPromotionId].Photo[i] + "' style='width:100%;height:auto;'/>";
            scrolls[7].appendSlide(item);
            //$(".imagesItems").append(item);
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
        /*if ($(".loading_animation").hasClass("hidden")) {
            $(".loading_animation").removeClass("hidden");
        }*/
        $.mobile.loading("show");
        /*if (!isLoading) {
            isLoading = true;
            $.mobile.loading("show");
        }*/
    },

    HideLoading: function () {
        $.mobile.loading("hide");
        /*if (!$(".loading_animation").hasClass("hidden")) {
            $(".loading_animation").addClass("hidden");
        }*/
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
    if (currentPage == "search_page" && currentPage != $.mobile.activePage.attr('id')) {
        CloseSearchPanel();
    }
    currentPage = $.mobile.activePage.attr('id');
    switch (currentPage) {
        case "promotion_detail_page":
            scrolls[8].reInit();
            slider.ReInit("promotion_detail_slider");
            break;
        case "detail_extend_page":
            scrolls[5].swipeTo(0);
            scrolls[6].swipeTo(0);
            scrolls[7].swipeTo(0);
            scrolls[5].reInit();
            scrolls[6].reInit();
            scrolls[7].reInit();
            ePage.ChangeExtendTab(next_extend_tab);
            ePage.SetActiveTab(next_extend_tab);
            
            break;
        case "categories_page":
            connectionError = 0;
            slider.ReInit('member_image_slider');
            for (var i = 1; i <= 6; i++) {
                slider.ReInit('category_slider' + i);
            }
            break;
        case "promotions_page":
            if (!backClick) {
                rl();
                
            } else {
                scrolls[0].reInit();
                scrolls[1].reInit();
                scrolls[2].reInit();
                scrolls[3].reInit();
                
                scrolls[10].reInit();
                scrolls[11].reInit();
            }
            
            //promotion_slider.swipeTo(0);
            //scrolls[9].swipeTo(0);
            scrolls[9].reInit();
            promotion_slider.reInit();
            
            break;
        case "comment_page":
            $("#comment_input").css("height", docWidth / 4 + 10 + "px");
            break;
        case "help_page":
            $("#help_text").removeClass("hidden");
            help_scroll.reInit();
            break;
        case "search_page":
            OpenSearchPanel(0);
            break;
    }
    backClick = false;
    isLoading = false;
});

function rl() {
    ui.ShowLoading();
    ui.ReloadPromotionsPage();
}
ui.ChangePage("categories_page");