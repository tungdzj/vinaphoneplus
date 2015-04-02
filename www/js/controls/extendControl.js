var extendControl = {
    slider: $('.detail_extend_slider').swiper({
        noSwiping: true,
        onSlideChangeStart: function (swiper, direction) {
            extendControl.UpdateExtendTabStatus();
        },
        onSlideChangeEnd:function (swiper, direction) {
            extendControl.UpdateExtendTabStatus();
        }
    }),
    ChangeExtendTab: function (index) {
        this.UpdateExtendTabStatus();
        extendControl.slider.swipeTo(index);
    },
    UpdateExtendTabStatus: function () {
        this.SetActiveTab(extendControl.slider.activeIndex);
        if (extendControl.slider.activeIndex == 1) {
            if (subMap != null) {
                google.maps.event.trigger(subMap, 'resize');
                if (store.currentShopId == -1) {
                    subMap.setCenter(map_marker[store.promotions[store.currentPromotionId].ListShop[0]].Marker.getPosition());
                } else {
                    subMap.setCenter(map_marker[store.currentShopId].Marker.getPosition());
                }
            }
        }
    },
    SetActiveTab: function (index) {
        for (var i = 0; i < 4; i++) {
            $("#e" + i).removeClass("active");
        }
        $("#e" + index).addClass("active");
    },
    OnTabClick: function (index) {
        switch (index) {
            case -1:
                pageManager.OnBackClick();
                break;
            default:
                this.ChangeExtendTab(index);
                break;
        }
    },
    OnLocationItemClick: function (shopId) {
        if (map_marker[shopId] == null) {
            console.log("marker null");
            return;
        }
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