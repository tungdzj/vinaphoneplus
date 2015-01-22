//http:// neonstudio.zapto.org:3222/viplus/
//http:// 192.168.1.14/quickdealSourcecode/duplicate_quickdeal/
//http:// viplus.vinaphone.com.vn/
//var host = "http://192.168.1.45/viplus/";
var host = "http://viplus.vinaphone.com.vn/";
var httpReq = null;

var client ={
    GetListPromotions: function (s_callback, f_callback) {
        var r = request.GetListPromotions();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetListShops: function (s_callback, f_callback) {
        var r = request.GetListShops();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetListPartners: function (s_callback, f_callback) {
        var r = request.GetListPartners();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetBestView: function (s_callback, f_callback) {
        var r = request.GetBestView();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetBestBuy: function (s_callback, f_callback) {
        var r = request.GetBestBuy();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetEndUserInfo: function () {
        var r = request.GetUserInfo();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var d = JSON.parse(xmlhttp.responseText);
                client.UpdateEndUserInfo(d.data);
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    UpdateUserInfo: function (s_callback, f_callback) {
        var r = request.UpdateUserInfo();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback();
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetDealCode: function (s_callback, f_callback) {
        var r = request.GetDealCode();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var d = JSON.parse(xmlhttp.responseText);
                if (d.status == "ok") {
                    addPromotionCode(d.data.promotionId, d.data.code);
                    s_callback(d);
                }
                else {
                    //ui.Alert(d.msg, "Lỗi", function () { });
                    f_callback(d);
                }
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    Rate: function (stars, s_callback, f_callback) {
        var r = request.Rate(stars);
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
                var d = JSON.parse(xmlhttp.responseText);
                if (d.status == "ok") {
                    promotions[d.promotionId].SetRate(d);
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Lỗi", function () { });
                }
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    Like: function (s_callback, f_callback) {
        var r = request.Like();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var d = JSON.parse(xmlhttp.responseText);
                if (d.status == "ok") {
                    promotions[d.promotionId].SetLike(d);
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Lỗi", function () { });
                }
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    Comment: function (content, s_callback, f_callback) {
		if (content == ""){
			return;
		}
        var r = request.Comment(content);
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var d = JSON.parse(xmlhttp.responseText);
                if (d.status == "ok") {
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Lỗi", function () { });
                }
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetComments: function (s_callback, f_callback) {
        var r = request.GetComments();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetMemberInfo: function (s_callback, f_callback) {
        var r = request.MemberAds();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //s_callback(JSON.parse());
                s_callback(JSON.parse(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    AddViewPromotion: function () {
        var r = request.AddViewPromotion();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    GetCodeByPhone: function (callback) {
        var r = request.GetCodeByPhone();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var d = JSON.parse(xmlhttp.responseText);
                callback(d);
                if (d.data == "3") {
                    client.GetEndUserInfo();
                }
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
    },

    VerifyCode: function (callback) {
        var r = request.VerifyCode();
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var jd = JSON.parse(xmlhttp.responseText);
                if (jd.status == "ok") {
                    token = jd.token;
                    window.localStorage.setItem('token', jd.token);
                    client.GetEndUserInfo();
                }
                callback(jd);
            }
        }
        xmlhttp.open("GET", r, true);
        xmlhttp.send();
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
        $("#inf_txtsdt").html(endUser.phone);
    }
}