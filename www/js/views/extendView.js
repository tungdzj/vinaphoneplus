﻿var extendView = {
    next_extend_tab: 0,

    Update: function () {
        $(".infoItems").empty();
        $(".locationItems").empty();
        $(".imagesItems").empty();
        var s = "";
        //add info
        var p = store.partners[store.shops[store.promotions[store.currentPromotionId].ListShop[0]].PartnerId];
        if (p != null) {
            $(".infoItems").append("<img class='partner-img'src='" + host + p.Logo + "'/>");

            s += "<div class='detail-content-block'><b class='extend-partner-name'>" + p.PartnerName + " - ";
            s += p.Title + "</b></div><br><br>";
            s += "<div class='detail-content-block'><b>Điện thoại: </b> " + p.Phone + "<br>";
            s += "<b>Email: </b> " + p.Email + "<br>";
            s += "<b>Website: </b><a href='#' onclick=\"ui.OpenLink('" + p.Website + "')\">Tại đây</a><br><br>";
            s += p.Detail + "</div><br>";
            $(".infoItems").append(s + "<br><br>");
            //add list shops
            if (store.currentShopId == -1) {
                var color = 0;
                for (var i = 0; i < store.promotions[store.currentPromotionId].ListShop.length; i++) {
                    var item = "<div onclick='extendControl.OnLocationItemClick(" + store.promotions[store.currentPromotionId].ListShop[i] + ")'class=\"font_size_12 location_item grad_" + color % 5 + "\" >" + store.shops[store.promotions[store.currentPromotionId].ListShop[i]].Address + "</div>";
                    color++;
                    $(".locationItems").append(item);
                }
                extendControl.OnLocationItemClick(store.promotions[store.currentPromotionId].ListShop[0]);
                //add subMap marker
            } else {
                var color = Math.round((Math.random() * 10)) % 5;
                var item = "<div onclick='extendControl.OnLocationItemClick(" + store.currentShopId + ")' class=\"font_size_12 location_item grad_" + color + "\" >" + store.shops[store.currentShopId].Address + "</div>";
                color++;
                $(".locationItems").append(item);
                extendControl.OnLocationItemClick(store.currentShopId);
                //map_marker[currentShopId].Marker.setMap(subMap);
            }
        }
        //add images
        scrolls[7].swipeTo(0);
        scrolls[7].removeAllSlides();
        for (var i = 0; i < store.promotions[store.currentPromotionId].Photo.length; i++) {
            var item = "<img src='" + host + store.promotions[store.currentPromotionId].Photo[i] + "' style='width:100%;height:auto;'/>";
            scrolls[7].appendSlide(item);
            //$(".imagesItems").append(item);
        }
        this.Refresh();
    },

    Refresh: function () {
        scrolls[5].swipeTo(0);
        scrolls[6].swipeTo(0);
        scrolls[7].swipeTo(0);
        scrolls[5].reInit();
        scrolls[6].reInit();
        scrolls[7].reInit();
        extendControl.ChangeExtendTab(extendView.next_extend_tab);
        extendControl.SetActiveTab(extendView.next_extend_tab);
    }
}