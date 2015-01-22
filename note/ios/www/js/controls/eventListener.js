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

function onReceiveBestView(data) {
    bestView = data.data;
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
}

function onReceiveBestBuy(data) {
    bestBuy = data.data;
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
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
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
}

function onReceivedPromotionAdds(data) {
    mdlProcessPromotionAddsData(data);
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
    //ui.ShowCategoryPage(true);
}

function onRequestFailed(msg) {
    ui.Alert("Có lỗi! Hãy kiểm tra lại kết nối mạng của bạn và khởi động lại ứng dụng.", "Lỗi", function () { navigator.app.exitApp(); });
    
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
    client.GetMemberInfo(onReceiveMemberInfo, onRequestFailed);
    client.GetBestView(onReceiveBestView, onRequestFailed);
    client.GetListShops(onReceivedListShops, onRequestFailed);
    client.GetListPromotions(onReceivedPromotions, onRequestFailed);
    client.GetListPartners(onReceivedListPartners, onRequestFailed);
    client.GetBestBuy(onReceiveBestBuy, onRequestFailed);
    //ui.ShowCategoryPage(true);
    //check fb login
}

function onMapReady() {
    geoProcessShopLocation();
    geoAddShopTitle();
    if (currentCategoryId != -1) {
        geoAddMarker(-1, currentCategoryId);
    }
    geoSetDeviceMarker();
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