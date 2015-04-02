var promotionControl = {
    areaId : 1,
    promotionsCode: [],
    wrapperSize: 0, 
    slider : $('.promotion_page_slider').swiper({
        noSwiping: true,
        onInit: function(swiper){
            promotionControl.wrapperSize = $(swiper.wrapper).width();
        },
        onSlideChangeStart: function (swiper, direction) {
            promotionControl.UpdatePromotionTabStatus();
            
        },

    }),
	
	OnLikeClick: function(img, id){
		if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            pageManager.ChangePage("login_dialog");
            return;
        }
        else {
            store.UpdateLike(id + '');
        }
		
	},
    OnPromotionClick: function (id, addId, shopId) {
        store.currentPromotionId = id;
        store.currentPromotionAddId = addId;
        store.currentShopId = shopId;
        pageManager.ChangePage("promotion_detail_page");
        //client.AddViewPromotion();
    },
    OnNavItemClick: function (index) {
        this.ChangePromotionTab(index);
    },
    ChangePromotionTab: function (index) {
        //scrolls["promotion_nav"].swipeTo(index);
        promotionControl.slider.swipeTo(index);
        this.UpdatePromotionTabStatus();

    },
    UpdatePromotionTabStatus: function () {
        for (var i = 0; i < 6; i++) {
            $(".p-nav-" + (i + 1)).removeClass("p-nav-active");
            $('.cursor-container').removeClass("cursor-" + i);
        }
        $(".p-nav-" + (promotionControl.slider.activeIndex + 1)).addClass("p-nav-active");
        $('.cursor-container').addClass("cursor-" + promotionControl.slider.activeIndex);
        $("#moredata1").addClass('hidden');
        $("#moredata2").addClass('hidden');
        //scrolls["promotion_nav"].swipeTo(promotionControl.slider.activeIndex);
        if (promotionControl.slider.activeIndex == 5) {
            if (scrolls["search"].slides.length == 0) {
                $("#moredata1").removeClass('hidden');
                $("#moredata1").html("Chưa có ưu đãi nào trong mục này.");
                OpenSearchPanel(0);
            }
        } else if (promotionControl.slider.previousIndex == 4) {
            if (store.plist[store.currentCategoryId][0].length > 0) {
                $("#moredata1").addClass("hidden");
            }
        }
        if (promotionControl.slider.activeIndex == 4) {
            if (map != null) {
                google.maps.event.trigger(map, 'resize');
                if (deviceLocation == null) {
                    map.setCenter(new google.maps.LatLng(defaultLocation[0], defaultLocation[1]));
                    map.setZoom(16);
                } else {
                    map.setCenter(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
                    map.setZoom(16);
                }
            }
        }
    },

    OnSearchClick: function () {
        OpenSearchPanel(0);
    },

    CloseSearchPromotion: function () {
        CloseSearchPanel();
        for (var i = 0; i < slideAdded; i++) {
            scrolls["search"].removeSlide(0);
        }
        slideAdded = 0;
    },
    SearchPromotion: function () {
        var max = 10;
        var count = 0;
        CloseSearchPanel();
        if (store.partners.length == 0) {
            ui.Alert("Đang tải dữ liệu, quý khách vui lòng thử lại sau vài giây.", "Thông báo", function () {
            });
            return;
        }
        $("#search_result").empty();
        promotionView.searchresult = [];
        var result = promotionControl.FillSearchArea();
        scrolls["search"].swipeTo(0);
        scrolls["search"].reInit();
        if (result == 0) {
            $("#moredata1").html("Không có ưu đãi nào trong mục này.")
            $("#moredata1").removeClass('hidden');
            utils.Alert("Không tìm được kết quả nào phù hợp", "Tìm kiếm", function () { });

        } else {
            $("#moredata1").addClass("hidden");
            promotionControl.slider.swipeTo(6);
        }
    },

    ToggleMenu: function () {
        $("#menu_panel").panel("toggle");
    },

    OpenMenu: function () {
        $("#menu_panel").panel("open");
    },

    CloseMenu: function () {
        $("#menu_panel").panel("close");
    },
    AddPromotionCode: function (id, code) {
        promotionControl.promotionsCode[id + ""] = code;
    },

    suggestText: [
        ["Lẩu", "Nướng", "Buffet", "Bánh", "Cà phê", "Coffee", "Pizza", "Bia", "Cá", "Chim", "Gà", "Dê", "Bò", "Bít tết", "BBQ", "Chè", "Sinh tố", "Phở", "Bánh Cuốn", "Rượu", "Tiệc cưới"],
        ["Mỹ phẩm", "Nước hoa", "Thời trang", "Quần", "Áo", "Váy", "Xe máy", "Nội thất", "Đồng hồ", "Giầy", "Dép", "Trang sức", "Hoa", "Điện máy"],
        ["Karaoke", "Golf", "Bar", "Phim", "Cinema", "Bóng đá", "Tennis"],
        ["Khách sạn", "Phòng", "Nghỉ", "Máy bay", "Resort"],
        ["Spa", "Tóc", "Da", "Móng", "Sức khỏe", "Bệnh viện", "Phòng khám", "Đa khoa", "Răng", "Fitness", "Yoga"],
        ["Online", "Tiếng Anh", "Tiếng Nhật", "Marketting", "Trung tâm"]
    ],
    suggestTag: [],
    areaId: 1,
    onRangeTextChange: function () {
        var name = change_alias($("#txt_range").val());
        $(".suggest_range").removeClass('hidden');
        $(".suggest_range").empty();
        var first = 1;

        if (name == '') {
            $(".suggest_range").removeClass('hidden');
            this.areaId = 1;
        } else {
            for (var i in area) {
                if (utils.MatchName(area[i].tag, name)) {
                    if (first) {
                        this.areaId = area[i].id;
                        first = 0;
                    }
                    $(".suggest_range").append('<li onmousedown="promotionControl.onRangeItemClick(' + i + ')">' + area[i].areaName + '</li>')
                }
            }
        }

    },
    onRangeBlur: function () {
        setTimeout(function () {
            $(".suggest_range").addClass('hidden');
        }, 500);
    },

    onRangeItemClick: function (r) {
        $(".suggest_range").addClass('hidden');
        $("#txt_range").val(area[r].areaName)
        this.areaId = area[r].id;
    },

    onRangeTextClick: function () {
        $(".suggest_range").removeClass('hidden');
    },

    onSearchTextChange: function () {
        $(".suggest_text").removeClass('hidden');
        $(".suggest_text").empty();
        var name = change_alias($("#txt_search").val());
        for (var i in this.suggestTag[Number(store.currentCategoryId) - 1]) {
            if (utils.MatchName(this.suggestTag[Number(store.currentCategoryId) - 1][i], name)) {
                $(".suggest_text").append('<li onmousedown="promotionControl.onSearchItemClick(' + i + ')">' + this.suggestText[Number(store.currentCategoryId) - 1][i] + '</li>')
            }
        }
    },
    onSearchBlur: function () {
        setTimeout(function () {
            $(".suggest_text").addClass('hidden');
        }, 500);
    },
    onSearchItemClick: function (index) {
        $(".suggest_text").addClass('hidden');
        $("#txt_search").val(this.suggestText[Number(store.currentCategoryId) - 1][index])
    },

    ActiveCode: function () {
        client.ActiveCode(userControl.endUser.phone, $("#txt_active_code").val());
    },

    Order: function () {
        if ($("#inf_txthoten1").html() == '' ||
            $("#inf_txtemail1").html() == '' ||
            $("#inf_txtaddress1").html() == '') {
            ui.Alert('Quý khách cần nhập đủ thông tin', 'Thông báo', function () {

            })
        } else {
            client.SendOrder();
        }

    },

    CreateSuggestTag: function () {
        for (var i in this.suggestText) {
            this.suggestTag[i] = [];
            for (var j in this.suggestText[i]) {

                this.suggestTag[i].push(change_alias(this.suggestText[i][j]));
            }

        }
    },

    FillSearchArea: function () {
        promotionView.currentSlide["search"] = 0;
        scrolls["search"].swipeTo(0);
        scrolls["search"].removeAllSlides();
        var max = 20;
        var count = 0;
        var pName = $("#txt_search").val();
        pName = change_alias(pName).toLowerCase();
        if (pName == "") {
            for (var d = 0; d < store.plist[store.currentCategoryId][2].length; d++) {
                var p = store.plist[store.currentCategoryId][2][d][0];
                if (promotionControl.areaId == 1) {

                    count++;
                    promotionView.searchresult.push(p);
                } else {

                    for (var si = 0; si < store.promotions[store.plist[store.currentCategoryId][2][d][0]].ListShop.length; si++) {
                        if (store.shops[store.promotions[store.plist[store.currentCategoryId][2][d][0]].ListShop[si]].Area == promotionControl.areaId ||
                            store.shops[store.promotions[store.plist[store.currentCategoryId][2][d][0]].ListShop[si]].Area == 1) {
                            //console.log(store.shops[store.promotions[store.plist[store.currentCategoryId][2][d][0]].ListShop[si]])
                            //scrolls["search"].appendSlide(ui.PromotionItemSlide(p, -1));
                            count++;
                            promotionView.searchresult.push(p);
                            break;
                        }
                    }
                }
            }
        } else {
            var tmp = new Array();
            for (var p = 0; p < store.plist[store.currentCategoryId][2].length; p++) {
                if (utils.MatchName(store.plist[store.currentCategoryId][2][p][2], pName)) {
                    tmp.push(store.plist[store.currentCategoryId][2][p][0]);
                }
            }

            for (var i = 0; i < tmp.length; i++) {
                var p = tmp[i];
                if (promotionControl.areaId == 1) {
                    promotionView.searchresult.push(p);
                    count++;
                } else {
                    for (var si = 0; si < store.promotions[p].ListShop.length; si++) {
                        if (store.shops[store.promotions[p].ListShop[si]].Area == promotionControl.areaId ||
                            store.shops[store.promotions[p].ListShop[si]].Area == 1) {
                            //
                            promotionView.searchresult.push(p);
                            count++;
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < promotionView.slShow / 2 * 3; i++) {
            if (i < promotionView.searchresult.length) {
                scrolls["search"].appendSlide(promotionView.PromotionItemSlide(promotionView.searchresult[i], -1));
            } else {
                break;
            }
        }
        return count;
    },
	
	Like1: function (id) {
        if (!userControl.loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
            userView.HideAllPopupTab();
            utils.Show("#login_popup1")
            utils.ChangePage("login_dialog");
            return;
        }
        else {
            client.Like1(id);
        }
	},
	UpdatePlist: function () {
	    //regen nearshop
	    geoCalculateDistance();
	    //regen categories
	    for (var i = 1; i < 7; i++) {
	        store.categories[i].length = 0;
	    }
	    for (var s = 0; s < store.nearShops.length; s++) {
	        if (store.shops[store.nearShops[s][0]].CategoryId) {
	            store.categories[store.shops[store.nearShops[s][0]].CategoryId].push(store.nearShops[s][0]);
	        }
	    }
	    //nearest
	    var max = 15;
	    for (var c = 1; c < 7; c++) {
	        store.plist[c][3].length = 0;
	        for (var s = 0; s < store.categories[c].length; s++) {
	            for (var p in store.promotions) {
	                if (contains(store.promotions[p].ListShop, store.categories[c][s])) {
	                    if (store.plist[c][3].length < max) {
	                        store.plist[c][3].push([p, store.categories[c][s]]);
	                    }
	                }
	            }
	        }
	    }
	},
	ReloadNear: function () {
	    scrolls["near"].removeAllSlides();
	    for (var i = 0; i < store.plist[store.currentCategoryId][3].length; i++) {
	        scrolls["near"].appendSlide(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][3][i][0], store.plist[store.currentCategoryId][3][i][1]));
	    }
	    scrolls["near"].reInit();
	    scrolls["near"].swipeTo(0);
	},

	Rate: function () {
	    //itms-apps://itunes.apple.com/app/id941561372
	    var ios = '941561372';
	    var android = 'com.vn.viplus';
	    var wp = '8e760e30-e1a2-47e3-8990-71fa8b03ff8d';
	    var url = device.platform == "Android" ?
                ("https://play.google.com/store/apps/details?id=" + android) :
                device.platform == "iOS" ?
                ("itms-apps://itunes.apple.com/app/id" + ios) :
                "http://windowsphone.com/s?appId=" + wp;
	    window.open(url, "_blank");
	}
}

promotionControl.CreateSuggestTag();