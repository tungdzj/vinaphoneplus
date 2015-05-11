var store = {
    currentPromotionId: -1,
    currentPromotionAddId: -1,
    currentCategoryId: -1,
    currentShopId: -1,
    notifyId: -1,
    promotions: [],
    newPromotions: [],
    promotionsAdds: [],
    shops: [],
    partners: [],
    nearShops: [],
    categories: [],
    likeList: { '1': [], '2': [], '3': [], '4': [], '5': [], '6': []},
    likeListAll: [],


    endUser: null,
    promotionsCode: [],
    bestView: [],
    bestBuy: [],
    plist: null,
    shopDis: [],
    group: new Array(),
    //home 
    homeImages: [],
    bannerImages: [],
    bannerText: [],
    headLine: [],

    CalculateLikeList: function(){
        if (store.shops.length == 0 || 
            store.promotions.length == 0 ||
            store.likeListAll.length == 0) {
            return;
        }
        for (var l in store.likeListAll) {
            if (store.promotions[store.likeListAll[l]] == null) {
                promotionControl.Like1(store.likeListAll[l]);
                continue;
            }
            var categoryId = store.shops[store.promotions[store.likeListAll[l]].ListShop[0]].CategoryId;
            store.likeList[categoryId].push(store.likeListAll[l])
            
        }
    },
	
	UpdateLike:function(id){
	    var index = store.likeList[store.currentCategoryId].indexOf(id);
	    var currentLike = Number($("#like_count span").html());
	    if (index == -1) {
	        currentLike++;
		    $(".pid" + id).attr('src', 'img/like1.png');
		    store.likeList[store.currentCategoryId].push(id);
	    } else {
	        currentLike--
		    $(".pid" + id).attr('src', 'img/like4.png');
		    store.likeList[store.currentCategoryId].splice(index, 1);
	    }
	    store.promotions[id].Like = currentLike;
	    $("#like_count span").html(currentLike)
		promotionView.UpdateLike();
		promotionControl.Like1(id);
	},
	test: [],
	ProcessMemberData: function (data) {
		test = data;
		console.log(data)
	    $('.banner-text').css('height', docWidth / 9);
        if (data != null) {
            for (var i in data.images) {
                store.homeImages.push(data.images[i]);
            }
            for (var i in data.banner) {
                store.bannerImages.push(data.banner[i]);
                store.bannerText.push(data.banner[i].description)
                $(".banner_slider .swiper-wrapper").append("<div class='swiper-slide'>" + data.banner[i].url + "'/></div>")

            }
            for (var h in data.headline) {
                store.headLine.push(data.headline[h]);
            }
            
            homeView.Update();
            scrolls.banner_slider = $(".banner_slider").swiper({
                mode: 'horizontal',
                pagination: '.dot',
                loop: true,
                autoplay: 2000,
                onSlideChangeEnd: function (swiper, direction) {
                    var index = swiper.activeLoopIndex;
                    $('.banner-text').html(store.bannerText[index % store.bannerText.length]);
                    $('.banner-text').css('height', docWidth / 9);
                },
                onSlideChangeStart: function (swiper, direction) {
                    $('.banner-text').css('height', 0);
                },
            })
        }
    },

    UpdateLikeList:function(data){
        for (var p in data) {
            store.likeListAll.push(data[p]);
        }
        store.CalculateLikeList();
    },
	
	CorrectLikeList: function(){
		var tmp = [];
		if (store.promotions.length > 0 && store.likeListAll.length > 0){
			for (var i = 0; i < store.likeListAll.length; i++){
				if (store.promotions[store.likeListAll[i]] != null){
					tmp.push(store.likeListAll[i]);
				} else {
				    client.Like1(store.likeListAll[i]);
					console.log("remove " + store.likeListAll[i]);
				}
			}
			store.likeListAll = tmp;
		}
	},

    ProcessBestBuyData: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (store.promotions[data[i]] == null) {
                continue;
            }
            store.bestBuy.push(data[i]);
        }
    },

    ProcessPromotionsData: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (store.partners[data[i].info.partnerId] == null ||
                data[i].info.status == '0') {
                continue;
            }
            store.promotions[data[i].info.promotionId] = new PromotionInfo(data[i]);
            store.newPromotions.push(data[i].info.promotionId);
        }
        store.UpdateListShop();
        geoAddShopTitle();
    },

    ProcessListShopData: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (store.partners[data[i].partnerId] == null) {
                continue;
            }
            var t = new ShopInfo(data[i]);
            store.shops[data[i].shopId] = t;
        }
        geoProcessShopLocation();
        geoAddShopTitle();
        geoCalculateDistance();
        if (store.currentPage == "promotions_page") {
            geoAddMarker(-1, currentCategoryId);
        }
        for (var s = 0; s < store.nearShops.length; s++) {
            if (store.shops[store.nearShops[s][0]].CategoryId) {
                store.categories[store.shops[store.nearShops[s][0]].CategoryId].push(store.nearShops[s][0]);
            }
        }
        store.UpdateListShop();
    },

    ProcessListPartnerData: function (data) {
        for (var i = 0; i < data.length; i++) {
            store.partners[data[i].partnerId] = new PartnerInfo(data[i]);
        }
        geoAddShopTitle();

        if (store.currentPage == "promotions_page") {
            geoAddMarker(-1, currentCategoryId);
        }
    },

    GetPromotionByShop: function (shopId, type) {
        var p = new Array();
        if (type == 0) {
            for (var i = 0; i < store.newPromotions.length; i++) {
                if (store.Contains(store.promotions[store.newPromotions[i]].ListShop, shopId)) {
                    p.push(store.newPromotions[i]);
                }
            }
            return p;
        } else if (type == 1) {
            for (var i in store.promotionsAdds) {
                if (store.Contains(store.promotionsAdds[i].ListShop, shopId)) {
                    p.push(store.promotionsAdds[i].PromotionId);
                }
            }
            return p;
        }
    },

    Contains: function (arr, e) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == e) {
                return true;
            }
        }
        return false;
    },

    UpdateListShop: function () {
        //if (store.promotions.length == 0 ||
        //    store.shops.length == 0) {
        //    return;
        //}
        //for (var p in store.promotions) {
        //    if (store.promotions[p].ListShop.length == 0) {
        //        for (var s in store.shops) {
        //            if (store.shops[s].PartnerId == store.promotions[p].PartnerId) {
        //                store.promotions[p].ListShop.push(s);
        //            }
        //        }
        //    }
        //}
        if (store.promotions.length == 0 ||
            store.shops.length == 0) {
            return;
        }
        
        for (var p in store.promotions) {
			var areat = -1;
			var first = 1;
            if (store.promotions[p].ListShop.length == 0) {
                first = 1;
                for (var s in store.shops) {
                    if (store.shops[s].PartnerId == store.promotions[p].PartnerId) {
                        if (first) {
                            first = 0;
                            areat = store.shops[s].Area;
                            store.promotions[p].ListShop.push(s);
                        } else {
                            store.promotions[p].ListShop.push(s);
                            if (store.shops[s].Area != areat) {
                                areat = -1;
                            }
                        }
                    }
                }
            }else{
				if (store.promotions[p].ListShop.length == 1){
					areat = store.shops[store.promotions[p].ListShop[0]].Area;
				}else{
					areat = store.shops[store.promotions[p].ListShop[0]].Area;
					for (var i = 1; i < store.promotions[p].ListShop.length; i++){
						if (store.promotions[p].ListShop[i].Area != store.promotions[p].ListShop[i - 1].Area){
							areat = -1;
							break;
						}
					}
				}
			}
            if (areat != -1) {
                store.promotions[p].AreaText = '[' + getAreaName(areat) + ']';
            } else {
                store.promotions[p].AreaText = '[Toàn quốc]';
            }
        }
    },
    containsArr: function (a, b) {
        var r = new Array();
        for (var i = 0; i < a.lenght; i++) {
            for (var j = 0; j < b.length; j++) {
                if (a[i] == b[j]) {
                    r.push(i);
                    r.push(j);
                    return r;
                }
            }
        }
        return null;
    },

    Createplist: function () {

        if (store.promotions.length == 0 ||
            store.shops.length == 0 ||
            store.partners.length == 0 ||
            store.bestBuy.length == 0) {
            return;
        }

        store.plist = new Array();
        for (var i = 1; i < 7; i++) {
            store.plist[i] = new Array();
            for (var j = 0; j < 5; j++) {
                store.plist[i][j] = new Array();
            }
        }
        //random store.promotions 0
        var ta = new Array();
        for (var i = 0; i < store.newPromotions.length; i++) {
            ta.push([store.newPromotions[i], Math.random()]);
        }
        ta.sort(function (a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        });
        for (var i = 0; i < ta.length; i++) {
            if (store.valid(ta[i][0])) {
                store.plist[store.shops[store.promotions[ta[i][0]].ListShop[0]].CategoryId][0].push([ta[i][0], -1]);
            }
        }

        //create list newest
        for (var p = 0; p < store.newPromotions.length; p++) {
            var s = store.promotions[store.newPromotions[p]].ListShop[0];
            var c = store.shops[s].CategoryId;
            //hottest
            if (store.promotions[store.newPromotions[p]].Hot == 1) {
                if (store.valid(store.newPromotions[p])) {
                    store.plist[c][1].push([store.newPromotions[p], -1]);
                }
            }
            //newest

            if (store.valid(store.newPromotions[p])) {
                if (store.newPromotions[p] == 216) {
                    console.log("valid:" + store.promotions[store.newPromotions[p]].Title)
                }
                store.plist[c][2].push([store.newPromotions[p], -1, change_alias(store.partners[store.promotions[store.newPromotions[p]].PartnerId].PartnerName + " " + store.partners[store.promotions[store.newPromotions[p]].PartnerId].Slogan), store.promotions[store.newPromotions[p]].PartnerId]);
            }

        }
        //nearest
        var max = 15;
        for (var c = 1; c < 7; c++) {
            for (var s = 0; s < store.categories[c].length; s++) {
                for (var p in store.promotions) {
                    if (store.Contains(store.promotions[p].ListShop, store.categories[c][s])) {
                        if (store.plist[c][3].length < max) {
                            if (store.valid(p)) {
                                store.plist[c][3].push([p, store.categories[c][s]]);
                            }
                        }
                    }
                }
            }
        }
        //bestbuy
        for (var d = 0; d < store.bestBuy.length; d++) {
            var p = store.bestBuy[d];
            var s = store.promotions[p].ListShop[0];
            var c = store.shops[s].CategoryId;
            //newest
            if (store.plist[c][4].length < max) {
                if (store.valid(p)) {
                    store.plist[c][4].push([p, s]);
                }

            }
        }
    },
    valid: function (p) {
        if (store.endUser == null) {
            if (store.promotions[p].GroupUser.length == 0) {
                return true;
            }
        } else {
            if (store.promotions[p].GroupUser.length == 0) {
                return true;
            }
            for (var i = 0; i < store.promotions[p].GroupUser.length; i++) {
                if (store.endUser.groupId == store.promotions[p].GroupUser[i]) {
                    return true;
                }
            }
        }
        return false;
    }
}

 for (var  i = 1; i <= 6; i++) {
     store.categories[i + ""] = [];
 }