var extendView = {
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

            s += "<div class='detail-content-block'><b class='detail-partner-name'>" + p.PartnerName + "</b><br>";
            s += "<div class='color: #4e595d;'>" + p.Title + "</div></div><br><br>";
            s += "<div class='detail-content-block'><img class='detail-icon' src='img/comment/phone.png'/><b>Điện thoại: </b> " + p.Phone + "<br><br>";
            s += "<img class='detail-icon' src='img/comment/email.png'/><b>Hòm thư: </b> " + p.Email + "<br><br>";
            s += "<img class='detail-icon' src='img/comment/website.png'/><b>Trang web: </b><a style='  color: #168DFE;' href='#' onclick=\"ui.OpenLink('" + p.Website + "')\">Tại đây</a><br><br>";
            s += p.Detail + "</div><br>";
            $(".infoItems").append(s + "<br><br>");
            //add list shops
            if (store.currentShopId == -1) {
                var color = 0;
                for (var i = 0; i < store.promotions[store.currentPromotionId].ListShop.length; i++) {
                    var item = "<div onclick='extendControl.OnLocationItemClick(" + store.promotions[store.currentPromotionId].ListShop[i] + ")'class='font_size_12 location_item grad_0' ><img class='text-img' src='img/comment/location1.png'/><div class='location-text'>" + store.shops[store.promotions[store.currentPromotionId].ListShop[i]].Address + "</div></div>";
                    color++;
                    $(".locationItems").append(item);
                }
                extendControl.OnLocationItemClick(store.promotions[store.currentPromotionId].ListShop[0]);
                //add subMap marker
            } else {
                var color = Math.round((Math.random() * 10)) % 5;
                var item = "<div onclick='extendControl.OnLocationItemClick(" + store.currentShopId + ")' class=\"font_size_12 location_item grad_0\"><img class='text-img' src='img/comment/location1.png'/>" + store.shops[store.currentShopId].Address + "</div>";
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