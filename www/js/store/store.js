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
    likeList: [],

    endUser: null,
    promotionsCode: [],
    bestView: [],
    bestBuy: [],
    plist: null,
    shopDis: [],
    group: new Array(),
    //home 
    homeImages: [],
    headLine: [],
	
	UpdateLike:function(id){
	    var index = store.likeList.indexOf(id);
	    var currentLike = Number($("#like_count span").html());
	    if (index == -1) {
	        currentLike++;
		    $(".pid" + id).attr('src', 'img/like1.png');
			store.likeList.push(id);
	    } else {
	        currentLike--
		    $(".pid" + id).attr('src', 'img/like4.png');
			store.likeList.splice(index, 1);
	    }
	    $("#like_count span").html(currentLike)
		promotionView.UpdateLike();
		promotionControl.Like1(id);
	},
	
    ProcessMemberData: function (data) {
        if (data != null) {
            for (var i in data.images) {
                store.homeImages.push(data.images[i]);
            }
            for (var h in data.headline) {
                store.headLine.push(data.headline[h]);
            }
            homeView.Update();
        }
    },

    UpdateLikeList:function(data){
        for (var p in data) {
            store.likeList.push(data[p]);
        }
    },
	
	CorrectLikeList: function(){
		var tmp = [];
		if (store.promotions.length > 0 && store.likeList.length > 0){
			for (var i = 0; i < store.likeList.length; i++){
				if (store.promotions[store.likeList[i]] != null){
					tmp.push(store.likeList[i]);
				} else {
				    client.Like1(store.likeList[i]);
					console.log("remove " + store.likeList[i]);
				}
			}
			store.likeList = tmp;
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
        var areat = -1;
        var first = 1;
        for (var p in store.promotions) {
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
                store.plist[c][2].push([store.newPromotions[p], -1, change_alias(store.partners[store.promotions[store.newPromotions[p]].PartnerId].PartnerName + " " + store.partners[store.promotions[store.newPromotions[p]].PartnerId].Detail), store.promotions[store.newPromotions[p]].PartnerId]);
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