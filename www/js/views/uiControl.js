var popupOpen = "none";
var currentPage = "categories_page";
var lastPage = "categories_page";
var backClick = false;
var currentTab = 0;
var next_extend_tab = 0;
var loadingComment = false;
var isLoading = false;
var promotionColor = (Math.round(Math.random() * 10) % 5);

var testapp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
var isapp = 0;
if (testapp) {
    isapp = 1;
} else {
    isapp = 0;
}

var ui = {

    ShowCommentPage: function () {
        ChangePage("comment_page");
    },

    ReloadNear:function(){
        scrolls["near"].removeAllSlides();
        for (var i = 0; i < store.plist[currentCategoryId][3].length; i++) {
            scrolls["near"].appendSlide(ui.PromotionItemSlide(store.plist[currentCategoryId][3][i][0], store.plist[currentCategoryId][3][i][1]));
        }
        scrolls["near"].reInit();
        scrolls["near"].swipeTo(0);
    },

    FillSearchArea: function () {
        currentSlide[5] = 0;
        scrolls["search"].swipeTo(0);
        scrolls["search"].removeAllSlides();
        var range = sPage.range;
        var max = 20;
        var count = 0;
        var pName = $("#txt_search").val();
        pName = change_alias(pName).toLowerCase();
        if (pName == "") {
            for (var d = 0; d < store.plist[currentCategoryId][2].length; d++) {
                var p = store.plist[currentCategoryId][2][d][0];
                if (sPage.areaId == 1) {
					
					count++;
                    searchresult.push(p);
                } else {
					
                    for (var si = 0; si < promotions[store.plist[currentCategoryId][2][d][0]].ListShop.length; si++) {
                        if (shops[promotions[store.plist[currentCategoryId][2][d][0]].ListShop[si]].Area == sPage.areaId ||
                            shops[promotions[store.plist[currentCategoryId][2][d][0]].ListShop[si]].Area == 1) {
								console.log(shops[promotions[store.plist[currentCategoryId][2][d][0]].ListShop[si]])
                            //scrolls["search"].appendSlide(ui.PromotionItemSlide(p, -1));
                            count++;
                            searchresult.push(p);
                            break;
                        }
                    }
                }
            }
        } else {
            var tmp = new Array();
            for (var p = 0; p < store.plist[currentCategoryId][2].length; p++) {
                if (utils.MatchName(store.plist[currentCategoryId][2][p][2], pName)) {
                    tmp.push(store.plist[currentCategoryId][2][p][0]);
                }
            }

            for (var i = 0; i < tmp.length; i++) {
                var p = tmp[i];
                if (sPage.areaId == 1) {
                    searchresult.push(p);
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
                scrolls["search"].appendSlide(ui.PromotionItemSlide(searchresult[i], -1));
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

    //PromotionItemSlide: function (p, s) {
    //    var padd = promotions[p].PromotionAdd;
    //    var description = '';
    //    var len = 45 - promotions[p].AreaText.length;
    //    if (s == -1) {
    //        description = promotions[p].AreaText + ' ';
    //        onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, -1)";
    //        description += "<b>" + truncate(partners[promotions[p].PartnerId].PartnerName, len) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
    //    } else {
    //        onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, " + s + ")";
    //        description += "<b>" + truncate(shops[s].ShopName, 40) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
    //    }
    //    var url = (partners[promotions[p].PartnerId] != null ? host + partners[promotions[p].PartnerId].Logo : "img/default_partner.png");
        
    //    var time = "(" + utils.GetDayFromString(promotions[p].StartDate) + "-" + utils.GetDayFromString(promotions[p].EndDate) + ")";
    //    var percent = Number(promotions[p].PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0")
    //    var add = padd != null;
    //    if (percent > 0) {
    //        return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
    //            "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
    //            "<div class=\"description font_size_12\" style=\"position:relative;width:" + descriptionSize + "px;\">" +
    //            description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
    //            "</div><div class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
    //            "<span class='font_size_24' style='margin-top:27%;'>" + percent + "\%</span></div></div><div class='line'></div></div>";
    //    }
    //    return "<div class='swiper-slide'><div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
    //            "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
    //            "<div class=\"description font_size_12\" style=\"position:relative; width:" + descriptionSize + "px;\">" +
    //            description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
    //            "</div><div class='" + (!add ? "percent_0" : "percent_0_add") + "' style='width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; '></div></div><div class='line'></div></div>";
    //},
    //PromotionItem: function (p, s) {
    //    var padd = promotions[p].PromotionAdd;
    //    if (s == -1) {
    //        onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, -1)";
    //    } else {
    //        onclick_func = "promotionControl.OnPromotionClick(" + p + "," + "-1, " + s + ")";
    //    }
    //    var url = (partners[promotions[p].PartnerId] != null ? host + partners[promotions[p].PartnerId].Logo : "img/default_partner.png");
    //    var description = "<b>" + truncate(partners[promotions[p].PartnerId].PartnerName, 40) + "</b><br> " + truncate(promotions[p].Title, 40) + "<br><br>"
    //    var time = "(" + utils.GetDayFromString(promotions[p].StartDate) + "-" + utils.GetDayFromString(promotions[p].EndDate) + ")";
    //    var percent = Number(promotions[p].PromotionPercent) + Number(padd != null ? padd.PercentAdd : "0")
    //    var add = padd != null;
    //    if (percent > 0) {
    //        return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
    //            "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
    //            "<div class=\"description font_size_12\" style=\"position:relative;width:" + descriptionSize + "px;\">" +
    //            description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
    //            "</div><div class='" + (!add ? "percent" : "percent_add") + "' style=\"width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; \">" +
    //            "<span class='font_size_24' style='margin-top:27%;'>" + percent + "\%</span></div></div><div class='line'></div>";
    //    }
    //    return "<div class='promotion_item grad_p' style='height: " + (thumbnail_size + 1) + "px;padding-top:1px;' onclick=\"" + onclick_func + "\">" +
    //            "<div id='over' style='width:" + thumbnail_size + "px;height:" + thumbnail_size + "px;'><span class='Centerer'></span><img class='Centered lazy' style=\"width: " + thumbnail_size + "px; max-height:" + thumbnail_size + "px; \" src=\"" + url + "\" /></div>" +
    //            "<div class=\"description font_size_12\" style=\"position:relative; width:" + descriptionSize + "px;\">" +
    //            description + "<div style='position:absolute; bottom:5px;'>" + time + "</div>" +
    //            "</div><div class='" + (!add ? "percent_0" : "percent_0_add") + "' style='width: " + thumbnail_size * 2 / 3 + "px; height: " + thumbnail_size + "px; '></div></div><div class='line'></div>";
    //},

    //LoadComment: function () {
    //    $(".comments").empty();
    //    loadingComment = true;
    //    client.GetComments(function (data) {
    //        loadingComment = false;
    //        if (currentPage == "comment_page") {
    //            ui.HideLoading();
    //        }
    //        commentPage.FillData(data);
    //    },
    //    function (msg) {
    //    });
    //},

    ShowPromotionDetailPage: function (reload) {
        
    },

    //AddExtendInfo: function () {
    //    $(".infoItems").empty();
    //    $(".locationItems").empty();
    //    $(".imagesItems").empty();
    //    var s = "";
    //    //add info
    //    var p = partners[shops[promotions[currentPromotionId].ListShop[0]].PartnerId];
    //    if (p != null) {
    //        $(".infoItems").append("<br><img src='" + host + p.Logo + "' style='width:100%;height:auto;'/>");
    //        s += "<b class='font_size_20'>" + p.PartnerName + "</b><br>";
    //        s += p.Title + "<br><br>";
    //        s += "<b>Điện thoại: </b> " + p.Phone + "<br>";
    //        s += "<b>Email: </b> " + p.Email + "<br>";
    //        s += "<b>Website: </b><a href='#' onclick=\"ui.OpenLink('" + p.Website + "')\">Tại đây</a><br><br>";
    //        s += p.Detail + "<br>";
    //        $(".infoItems").append(s + "<br><br>");
    //        //add list shops
    //        if (currentShopId == -1) {
    //            var color = 0;
    //            for (var i = 0; i < promotions[currentPromotionId].ListShop.length; i++) {
    //                var item = "<div onclick='ePage.OnLocationItemClick(" + promotions[currentPromotionId].ListShop[i] + ")'class=\"font_size_12 location_item grad_" + color % 5 + "\" >" + shops[promotions[currentPromotionId].ListShop[i]].Address + "</div>";
    //                color++;
    //                $(".locationItems").append(item);
    //            }
    //            ePage.OnLocationItemClick(promotions[currentPromotionId].ListShop[0]);
    //            //add subMap marker
    //        } else {
    //            var color = Math.round((Math.random() * 10)) % 5;
    //            var item = "<div onclick='ePage.OnLocationItemClick(" + currentShopId + ")' class=\"font_size_12 location_item grad_" + color + "\" >" + shops[currentShopId].Address + "</div>";
    //            color++;
    //            $(".locationItems").append(item);
    //            ePage.OnLocationItemClick(currentShopId);
    //            //map_marker[currentShopId].Marker.setMap(subMap);
    //        }
            
    //    }
    //    //add images
    //    scrolls[7].swipeTo(0);
    //    scrolls[7].removeAllSlides();
    //    for (var i = 0; i < promotions[currentPromotionId].Photo.length; i++) {
    //        var item = "<img src='" + host + promotions[currentPromotionId].Photo[i] + "' style='width:100%;height:auto;'/>";
    //        scrolls[7].appendSlide(item);
    //        //$(".imagesItems").append(item);
    //    }
    //},

    ShowPromotionTab: function (tabIndex) {
        ui.ChangePromotionTab(tabIndex);
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

//$("body").on("pagecontainerchange", function (event, ui) {
//    if (currentPage == "search_page" && currentPage != $.mobile.activePage.attr('id')) {
//        CloseSearchPanel();
//    }
//    currentPage = $.mobile.activePage.attr('id');
//    switch (currentPage) {
//        case "promotion_detail_page":
//            scrolls[8].reInit();
//            slider.ReInit("promotion_detail_slider");
//            break;
//        case "detail_extend_page":
//            scrolls[5].swipeTo(0);
//            scrolls[6].swipeTo(0);
//            scrolls[7].swipeTo(0);
//            scrolls[5].reInit();
//            scrolls[6].reInit();
//            scrolls[7].reInit();
//            if (infowindow != null) {
//                infowindow.close();
//            }
//            ePage.ChangeExtendTab(next_extend_tab);
//            ePage.SetActiveTab(next_extend_tab);
            
//            break;
//        case "categories_page":
//            connectionError = 0;
//            slider.ReInit('member_image_slider');
//            for (var i = 1; i <= 6; i++) {
//                slider.ReInit('category_slider' + i);
//            }
//            break;
//        case "promotions_page":
//            if (infowindow != null) {
//                infowindow.close();
//            }
//            geoAddMarker(1, currentCategoryId);
//            if (!backClick) {
//                rl();
//            } else {
//                scrolls["random"].reInit();
//                scrolls["hot"].reInit();
//                scrolls["new"].reInit();
//                scrolls["near"].reInit();
                
//                scrolls["bestbuy"].reInit();
//                scrolls["search"].reInit();
//            }
            
//            //promotionControl.slider.swipeTo(0);
//            //scrolls["promotion_nav"].swipeTo(0);
//            scrolls["promotion_nav"].reInit();
//            promotionControl.slider.reInit();
            
//            break;
//        case "comment_page":
//            $("#comment_input").css("height", docWidth / 4 + 10 + "px");
//            break;
//        case "help_page":
//            $("#help_text").removeClass("hidden");
//            help_scroll.reInit();
//            break;
//        case "search_page":
//            OpenSearchPanel(0);
//            break;
//    }
//    backClick = false;
//    isLoading = false;
//});

//function rl() {
//    utils.ShowLoading();
//    ui.ReloadPromotionsPage();
//}
//ui.ChangePage("categories_page");