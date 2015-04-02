

//ui. EVENT LISTENER
function onExtendBackClick() {
    utils.ShowPromotionDetailPage(-1);
}

//END ui. EVENT LISTENER



//REQUEST EVENT LISTENER

function onRequestFailed(msg) {
    //ui.Alert("Có lỗi! Hãy kiểm tra lại kết nối mạng của bạn và khởi động lại ứng dụng.", "Lỗi", function () { navigator.app.exitApp(); });
    
}

function onReceivedAll(data) {
    store.ProcessMemberData(data.member_info[0]);
    store.ProcessListPartnerData(data.partners);
    store.ProcessPromotionsData(data.promotions);
    store.ProcessListShopData(data.shops);
    store.ProcessBestBuyData(data.bestbuy);
    store.Createplist();
	store.CorrectLikeList();
    if (pageManager.currentPage == "promotions_page") {
        promotionView.Update();
    }
    onNotification();
}

//END REQUEST EVENT LISTENER

//OTHER EVENT LISTENER
function onDocumentReady() {
    slider.InitSlider("member_image_slider", 3000);
    slider.InitSlider("promotion_detail_slider", 3000);
    for (var i = 1 ; i <= 6; i++) {
        slider.InitSlider('category_slider' + i, 0);
    }
    //request all information

    client.GetAllInfo(onReceivedAll, onRequestFailed);
    var first_help = window.localStorage.getItem('firstHelp');
    if (first_help == null) {
        window.localStorage.setItem('firstHelp', 'ok');
        pageManager.ChangePage("help_page");
    }
    //$('#headline').marquee({
    //    duration: 9000
    //});
    //$("#detail_title").marquee({
    //    duration: 9000
    //});
}

function onMapReady() {
    geoProcessShopLocation();
    geoAddShopTitle();
    if (store.currentCategoryId != -1) {
        geoAddMarker(-1, store.currentCategoryId);
    }
    updateHereMarker();
}

function onGetDeviceLocation() {
    geoCalculateDistance();
    if (map == null) {
        return;
    }
    map.setCenter(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
    map.panTo(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
    geoSetDeviceMarker();
}

function onUpdateDeviceLocation() {
    updateHereMarker();
}

function onNotification() {
    //if (promotions.length == 0) {
    //    return;
    //}
    //if (promotions[notifyId] == null) {
    //    return;
    //}
    //store.currentCategoryId = shops[promotions[notifyId].ListShop[0]].CategoryId;
    //currentShopId = -1;
    //currentPromotionId = notifyId;
    //promotionControl.OnPromotionClick(notifyId, -1, -1);
}


$(document).ready(function () {
    //request all information
    onDocumentReady();
});

$("body").on("pagecontainerchange", function (event, ui) {
    if (utils.currentPage == "search_page" && utils.currentPage != $.mobile.activextendControl.attr('id')) {
        CloseSearchPanel();
    }
    utils.currentPage = $.mobile.activePage.attr('id');
    switch (utils.currentPage) {
        case "first_help":
            scrolls["first_help"].reInit();
            break;
        case "promotion_detail_page":
            detailView.Refresh();
            break;
        case "detail_extend_page":
            extendView.Refresh();
            break;
        case "categories_page":
            homeView.Refresh();
            break;
        case "promotions_page":
            promotionView.Refresh();
            break;
        case "comment_page":
            //$("#comment_input").css("height", docWidth / 4 + 10 + "px");
            break;
        case "help_page":
            helpView.Refresh();
            break;
        case "search_page":
            OpenSearchPanel(0);
            break;
    }
    utils.backClick = false;
    utils.isLoading = false;
});

function hardback() {
    pageManager.OnBackClick();
}

document.addEventListener("backbutton", hardback, false);