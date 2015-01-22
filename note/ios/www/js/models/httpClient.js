//http:// neonstudio.zapto.org:3222/viplus/
//http:// 192.168.1.14/quickdealSourcecode/duplicate_quickdeal/
//http:// viplus.vinaphone.com.vn/viplus/
var host = "http://viplus.vinaphone.com.vn/";
var httpReq = null;

var client ={
    GetListPromotions: function (s_callback, f_callback) {
        var r = request.GetListPromotions();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    GetPromotionsAdds: function (s_callback, f_callback) {
    },

    GetListShops: function (s_callback, f_callback) {
        var r = request.GetListShops();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    GetListPartners: function (s_callback, f_callback) {
        var r = request.GetListPartners();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    GetBestView: function (s_callback, f_callback) {
        var r = request.GetBestView();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    GetEndUserInfo: function () {
        var r = request.GetUserInfo();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    client.UpdateEndUserInfo(d.data);
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    UpdateUserInfo:function(s_callback, f_callback){
        var r = request.UpdateUserInfo();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback();
			},
			function (res) {
			});
    },

    GetDealCode: function (s_callback, f_callback) {
        var r = request.GetDealCode();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    if (d.status == "ok") {
			        addPromotionCode(d.data.promotionId, d.data.code);
			        s_callback(d);
			    }
			    else {
			        //ui.Alert(d.msg, "Lỗi", function () { });
			        f_callback(d);
			    }
			},
			function (res) {
			    ui.Alert("Lỗi kết nối", "Lỗi", function () { })
			});
    },

    Rate: function (stars, s_callback, f_callback) {
        var r = request.Rate(stars);
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    if (d.status == "ok") {
			        promotions[d.promotionId].SetRate(d);
			        s_callback(d);
			    } else {
			        ui.Alert(d.msg, "Lỗi", function () { });
			    }
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    Like: function (s_callback, f_callback) {
        var r = request.Like();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    if (d.status == "ok") {
			        promotions[d.promotionId].SetLike(d);
			        s_callback(d);
			    } else {
			        ui.Alert(d.msg, "Lỗi", function () { });
			    }
			    
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    Comment: function (content, s_callback, f_callback) {
        var r = request.Comment(content);
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    if (d.status == "ok") {
			        s_callback(d);
			    } else {
			        ui.Alert(d.msg, "Lỗi", function () { });
			    }
			},
			function (res) {
			});
    },

    GetComments: function (s_callback, f_callback) {
        var r = request.GetComments();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    GetMemberInfo: function (s_callback, f_callback) {
        var r = request.MemberAds();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    s_callback(JSON.parse(res.data));
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    AddViewPromotion: function () {
        var r = request.AddViewPromotion();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			},
			function (res) {
			});
    },

    GetCodeByPhone: function (callback) {
        var r = request.GetCodeByPhone();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var d = JSON.parse(res.data);
			    callback(d);
			    if (d.data == "3") {
			        client.GetEndUserInfo();
			    }
			},
			function (res) {
			    f_callback(res.error);
			});
    },

    VerifyCode: function (callback) {
        var r = request.VerifyCode();
        cordovaHTTP.get(r, {}, {},
			function (res) {
			    var jd = JSON.parse(res.data);
			    if (jd.status == "ok") {
			        token = jd.token;
			        window.localStorage.setItem('token', jd.token);
			        client.GetEndUserInfo();
			    }
			    callback(jd);
			},
			function (res) {
			});
    },
    UpdateEndUserInfo: function (data) {
        var p = "0";
        for (var i = 2; i < data.phone.length; i++) {
            p += data.phone[i];
        }
        endUser.phone = p;
        endUser.userName = data.userName;
        endUser.loyaltyPoint = data.loyaltyPoint;
        endUser.email = data.email;
        endUser.avatar = data.avatar;
        $("#inf_txthoten").val(endUser.userName);
        $("#inf_txtemail").val(endUser.email);
        $("#inf_txtsdt").val(endUser.phone);
    }
}