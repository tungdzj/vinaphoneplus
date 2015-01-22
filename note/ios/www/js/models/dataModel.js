//data model
function PromotionInfo(data) {
    this.PromotionId = data.info.promotionId;
    if (data.info.listShop == "{}") {
        this.ListShop = new Array();
    } else {
        var s = data.info.listShop;
        s = s.replace('{', '');
        s = s.replace('}', '');
        this.ListShop = s.split(",");
    }
    this.PartnerId          = data.info.partnerId;
    this.Title              = data.info.title;
    this.Description        = data.info.description;
    this.PromotionPercent   = data.info.promotionPercent;
    this.LifeTime           = data.info.lifetime;
    this.StartDate          = data.info.startDate;
    this.EndDate            = data.info.endDate;
    this.Rate               = Math.round(parseFloat(data.rate));
    this.Like               = data.like;
    this.Comment            = data.countComment;
    this.Photo = data.photo;
    if (data.info.promotionAdd != null) {
        this.PromotionAdd = new PromotionAddInfo(data.info.promotionAdd);
    } else {
        this.PromotionAdd = null;
    }
}

PromotionInfo.prototype.AddComment = function (data) {
    this.Comment++;
    if (currentPromotionId == data.promotionId) {
        $("#comment_count").html(this.Comment);
    }
}

PromotionInfo.prototype.SetRate = function (data) {
    this.Rate = Math.round(data.ratecount);
    if (currentPromotionId == data.promotionId) {
        $("#rate_count").html(this.Rate);
    }
}

PromotionInfo.prototype.SetLike = function (data) {
    this.Like = data.totalLike;
    $("#like_count").html(data.totalLike);
}

function EndUserInfo() {
    this.phone = "";
    this.userName = "";
    this.loyaltyPoint = "";
    this.email = "";
    this.avatar = "";
}

function PromotionAddInfo(data) {
    this.PromotionAddId     = data.promotionAddId;
    this.MemberId           = data.memberId;
    this.Description        = data.description;
    this.PercentAdd         = data.percentAdd;
    this.StartDate          = data.startDate;
    this.EndDate            = data.endDate;
    this.GroupEndUserId     = data.groupEnduserId;
    this.CreaterId          = data.createrId;
    this.Title              = data.title;
}

function ShopInfo(data) {
    this.ShopId = data.shopId;
    this.ShopName = data.shopName;
    this.Address = data.address;
    this.PartnerId = data.partnerId;
    this.MemberId = data.memberId;
    this.LoyaltyPoint = data.loyaltyPoint;
    this.ValueLoyaltyPoint = data.valueLoyaltyPoint;
    this.CategoryId = data.categoryId;
    this.LatLong = data.vitriGPSShop;
    this.CreaterId = data.createrId;
}

function PartnerInfo(data) {
    this.PartnerId = data.partnerId;
    this.MemberId = data.memberId;
    this.PartnerName = data.partnerName;
    this.Title = data.title;
    this.Logo = data.logo;
    this.Detail = data.details;
    this.Phone = data.phone;
    this.LoyaltyPoint = data.loyaltyPoint;
    this.ValueLoyaltyPoint = data.valueLoyaltyPoint;
    this.Website = data.website;
    this.Email = data.email;
}

//process data model

function mdlProcessPromotionsData(data) {
    for (var i = 0; i < data.data.length; i++) {
        promotions[data.data[i].info.promotionId] = new PromotionInfo(data.data[i]);
     
        newPromotions.push(data.data[i].info.promotionId);
    }
    updateListShop();
    geoAddShopTitle();
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
}

function mdlProcessListShopData(data) {
    for (var i = 0; i < data.data.length; i++) {
        var t = new ShopInfo(data.data[i]);
        shops[data.data[i].shopId] = t;
    }
    geoProcessShopLocation();
    geoAddShopTitle();
    geoCalculateDistance();
    if (currentPage == "promotions_page") {
        geoAddMarker(-1, currentCategoryId);
    }
    for (var s = 0; s < nearShops.length; s++) {
        if (shops[nearShops[s][0]].CategoryId) {
            categories[shops[nearShops[s][0]].CategoryId].push(nearShops[s][0]);
        }
    }
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
    updateListShop();
}

function mdlProcessListPartnerData(data) {
    for (var i = 0; i < data.data.length; i++) {
        partners[data.data[i].partnerId] = new PartnerInfo(data.data[i]);
    }
    if (currentPage == "promotions_page") {
        ui.ReloadPromotionsPage();
    }
    geoAddShopTitle();
    if (currentPage == "promotions_page") {
        geoAddMarker(-1, currentCategoryId);
    }
}

function mdlGetPromotionByShop(shopId, type) {
    var p = new Array();
    if (type == 0) {
        for (var i = 0; i < newPromotions.length; i++) {
            if (contains(promotions[newPromotions[i]].ListShop, shopId)) {
                p.push(newPromotions[i]);
            }
        }
        return p;
    } else if (type == 1) {
        for (var i in promotionsAdds) {
            if (contains(promotionsAdds[i].ListShop, shopId)) {
                p.push(promotionsAdds[i].PromotionId);
            }
        }
        return p;
    }
}

function contains(arr, e) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e) {
            return true;
        }
    }
    return false;
}

function updateListShop() {
    if (promotions.length == 0 ||
        shops.length == 0) {
        return;
    }
    for (var p in promotions) {
        if (promotions[p].ListShop.length == 0) {
            for (var s in shops) {
                if (shops[s].PartnerId == promotions[p].PartnerId) {
                    promotions[p].ListShop.push(s);
                }
            }
        }
    }
}
function containsArr(a, b) {
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
}