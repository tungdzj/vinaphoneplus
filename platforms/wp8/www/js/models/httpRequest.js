var request = {

    Login: function () {
        return host;
    },

    GetAllInfo: function(){
        return host + "?json=neon/NewGetAllInfo";
    },

    GetDealCode: function () {
        return host + "?json=neon/CreatePromotionCode&token=" + token +
            "&promotionId=" + currentPromotionId +
            "&uuid=" + uuid;
    },

    GetPromotionAdds: function () {
        return host + "?json=neon/getListPromotionAdds";
    },

    GetListShops: function () {
        return host + "?json=neon/getListShops";
    },

    GetListPartners: function () {
        return host + "?json=neon/getListPartners";
    },

    GetListPromotions: function () {
        return host + "?json=neon/getListPromotions";
    },

    Comment: function (text) {
        return host + "?json=neon/addComment&token=" + token +
            "&promotionId=" + currentPromotionId +
            "&content=" + text +
            "&uuid=" + uuid;
    },

    GetComments: function () {
        return host + "?json=neon/getListComments&promotionId=" + currentPromotionId;
    },

    Like: function () {
        return host + "?json=neon/processLike&token=" + token +
            "&promotionId=" + currentPromotionId +
            "&uuid=" + uuid;
    },

    Rate: function (stars) {
        return host + "?json=neon/operatorRating&token=" + token +
            "&promotionId=" + currentPromotionId +
            "&votecount=" + stars +
            "&uuid=" + uuid;
    },

    MemberAds: function () {
        return host + "?json=neon/getMemberInfo&memberId=25";
    },

    AddViewPromotion: function () {
        return host + "?json=neon/addViewPromotion&promotionId=" + currentPromotionId;
    },

    GetBestView: function () {
        return host + "?json=neon/getBestView";
    },

    GetBestBuy: function () {
        return host + "?json=neon/getBestBuy";
    },

    GetCodeByPhone: function () {
        var r = "84";
        for (var i = 1; i < userPhoneNumber.length; i++) {
            r += userPhoneNumber[i];
        }
        return host + "?json=neon/getCodeByPhone&phone=" + r +
            "&uuid=" + uuid;
    },

    VerifyCode: function () {
        var r = "84";
        for (var i = 1; i < userPhoneNumber.length; i++) {
            r += userPhoneNumber[i];
        }
        return host + "?json=neon/verifyCodeLogin&phone=" + r +
            "&code=" + verifyCode +
            "&uuid=" + uuid;
    },

    GetUserInfo: function () {
        return host + "?json=neon/getInfoEnduser&token=" + token +
            "&uuid=" + uuid;
    },

    UpdateUserInfo: function () {
        var r = "84";
        for (var i = 1; i < endUser.phone.length; i++) {
            r += userPhoneNumber[i];
        }
        return host + "?json=neon/updateEndUser&token=" + token +
            "&uuid=" + uuid +
            "&userName=" + endUser.userName +
            "&phone=" + r + 
            "&email=" + endUser.email;
    }
}