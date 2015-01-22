﻿

//ui. EVENT LISTENER
function onExtendBackClick() {
    ui.ShowPromotionDetailPage(-1);
}

//END ui. EVENT LISTENER



//REQUEST EVENT LISTENER

function onReceiveMemberInfo(data) {
    if (data != null) {
        slider.RemoveAllSlide('member_image_slider');
        for (var image in data.images) {
            slider.AddSlide('member_image_slider', host + data.images[image]);
        }
        slider.ReInit('member_image_slider');
        for (var headline in data.headline) {
            $(".headline_text").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data.headline[headline]);
        }
    }
}

function onReceiveBestBuy(data) {
    for (var i = 0; i < data.length; i++) {
        if (promotions[data[i]] == null){
            continue;
        }
        bestBuy.push(data[i]);
    }
}

function onReceivedListShops(data) {
    mdlProcessListShopData(data);
    ui.UpdateCategorySlider();
}

function onReceivedListPartners(data) {
    mdlProcessListPartnerData(data);
    ui.UpdateCategorySlider();
}

function onReceivedPromotions(data) {
    mdlProcessPromotionsData(data);
}

function onReceivedPromotionAdds(data) {
    mdlProcessPromotionAddsData(data);
}

function onRequestFailed(msg) {
    //ui.Alert("Có lỗi! Hãy kiểm tra lại kết nối mạng của bạn và khởi động lại ứng dụng.", "Lỗi", function () { navigator.app.exitApp(); });
    
}

function onReceivedAll(data) {
    onReceiveMemberInfo(data.member_info[0]);
    onReceivedListPartners(data.partners);
    onReceivedPromotions(data.promotions);
    onReceivedListShops(data.shops);
    onReceiveBestBuy(data.bestbuy);
    createplist();
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
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
    initAreaList();
    //request all information
    client.GetAllInfo(onReceivedAll, onRequestFailed);
}

function onMapReady() {
    geoProcessShopLocation();
    geoAddShopTitle();
    if (currentCategoryId != -1) {
        geoAddMarker(-1, currentCategoryId);
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
    if (promotions.length == 0) {
        return;
    }
    if (promotions[notifyId] == null) {
        return;
    }
    currentCategoryId = shops[promotions[notifyId].ListShop[0]].CategoryId;
    currentShopId = -1;
    currentPromotionId = notifyId;
    pPage.OnPromotionClick(notifyId, -1, -1);
}