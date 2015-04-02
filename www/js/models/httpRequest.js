var request = {

    Login: function () {
        return host;
    },

    GetAllInfo: function(){
        return host + "?json=neon/NewGetAllInfo&lang=" + languageControl.lanString[languageControl.currentLan];
        //return "http://multilanguage.neonstudio.us/?json=neon/NewGetAllInfo&lang=" + languageControl.lanString[languageControl.currentLan];
    },

    GetDealCode: function () {
        return host + "?json=neon/CreatePromotionCode&token=" + userControl.token +
            "&promotionId=" + store.currentPromotionId +
            "&uuid=" + userControl.uuid;
    },

    GetPromotionAdds: function () {
        return host + "?json=neon/getListPromotionAdds";
    },

    GetListShops: function () {
        return host + "?json=neon/getListShops";
    },

    SendOrder:function(){
        return host + "?json=neon/order&token=" + userControl.token +
            "&uuid=" + userControl.uuid +
            "&phone=" + userControl.endUser.phone +
            "&promotionId=" + store.currentPromotionId +
            "&userName=" + $("#inf_txthoten1").html() +
            "&email=" + $("#inf_txtemail1").html() +
            "&address=" + $("#inf_txtaddress1").html(); 
    },
    GetListPartners: function () {
        return host + "?json=neon/getListPartners";
    },

    GetListPromotions: function () {
        return host + "?json=neon/getListPromotions";
    },

    Comment: function (text) {
        return host + "?json=neon/addComment&token=" + userControl.token +
            "&promotionId=" + store.currentPromotionId +
            "&content=" + text +
            "&uuid=" + userControl.uuid;
    },

    GetComments: function () {
        return host + "?json=neon/getListComments&promotionId=" + store.currentPromotionId;
    },

    Like: function () {
        return host + "?json=neon/processLike&token=" + userControl.token +
            "&promotionId=" + store.currentPromotionId +
            "&uuid=" + userControl.uuid;
    },
	
	Like1: function(id){
		return host + "?json=neon/processLike&token=" + userControl.token +
            "&promotionId=" + id +
            "&uuid=" + userControl.uuid;
	},

    Rate: function (stars) {
        return host + "?json=neon/operatorRating&token=" + userControl.token +
            "&promotionId=" + store.currentPromotionId +
            "&votecount=" + stars +
            "&uuid=" + userControl.uuid;
    },

    MemberAds: function () {
        return host + "?json=neon/getMemberInfo&memberId=25";
    },

    AddViewPromotion: function () {
        return host + "?json=neon/addViewPromotion&promotionId=" + store.currentPromotionId;
    },

    GetBestView: function () {
        return host + "?json=neon/getBestView";
    },

    GetBestBuy: function () {
        return host + "?json=neon/getBestBuy";
    },

    GetCodeByPhone: function () {
        var r = "84";
        for (var i = 1; i < userControl.userPhoneNumber.length; i++) {
            r += userControl.userPhoneNumber[i];
        }
        return host + "?json=neon/getCodeByPhone&phone=" + r +
            "&uuid=" + userControl.uuid;
    },

    VerifyCode: function () {
        var r = "84";
        for (var i = 1; i < userControl.userPhoneNumber.length; i++) {
            r += userControl.userPhoneNumber[i];
        }
        return host + "?json=neon/verifyCodeLogin&phone=" + r +
            "&code=" + verifyCode +
            "&uuid=" + userControl.uuid;
    },

    GetUserInfo: function () {
        return host + "?json=neon/getInfoEnduser&token=" + userControl.token +
            "&uuid=" + userControl.uuid;
    },

    UpdateUserInfo: function () {
        var r = "84";
        for (var i = 1; i < userControl.endUser.phone.length; i++) {
            r += userControl.userPhoneNumber[i];
        }
        return host + "?json=neon/updateEndUser&token=" + userControl.token +
            "&uuid=" + userControl.uuid +
            "&userName=" + userControl.endUser.userName +
            "&phone=" + r + 
            "&email=" + userControl.endUser.email +
            "&address=" + userControl.endUser.address;
    }
}