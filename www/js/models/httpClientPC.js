//http:// neonstudio.zapto.org:3222/viplus/
//http:// 192.168.1.14/quickdealSourcecode/duplicate_quickdeal/
//http:// viplus.vinaphone.com.vn/
//var host = "http://192.168.1.45/viplus/";
var host = "http://viplus.vinaphone.com.vn/";
var httpReq = null;
var connectionError = 0;
var client = {
    CheckInternet: function () {
        console.log("check internet");
        var r = "http://viplus.vinaphone.com.vn/?json=neon/checkInternet";
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                //location.reload();
            },
            error: function (responseData, textStatus, errorThrown) {
                client.CheckInternet();
            }
        });
    },

    GetAllInfo: function (s_callback, f_callback) {
        uuid = "tungphone";
        var r = request.GetAllInfo();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                client.CheckInternet();
            }
        });
    },

    GetMemberInfo: function (s_callback, f_callback) {
        var r = request.MemberAds();
        console.log(r);
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                f_callback();
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                        client.CheckInternet();
                    });
                }
            }
        });
    },

    GetEndUserInfo: function () {
        var r = request.GetUserInfo();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                for (var i = 0; i < data.groupInfo.length; i++) {
                    
                    group[data.groupInfo[i].groupEnduserId] = new GroupUser(data.groupInfo[i]);
                }
                var d = data;
                client.UpdateEndUserInfo(data.data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {

                    });
                } else {
                    ui.ShowCategoryPage();
                }
            }
        });
    },

    UpdateUserInfo: function (s_callback, f_callback) {
        var r = request.UpdateUserInfo();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                client.UpdateEndUserInfo(data.data);
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    GetDealCode: function (s_callback, f_callback) {
        var r = request.GetDealCode();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.status == "ok") {
                    addPromotionCode(data.data.promotionId, data.data.code);
                    s_callback(data);
                }
                else {
                    //ui.Alert(d.msg, "Lỗi", function () { });
                    f_callback(data);
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    Rate: function (stars, s_callback, f_callback) {
        var r = request.Rate(stars);
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.status == "ok") {
                    var d = data;
                    if (d.status == "ok") {
                        promotions[d.promotionId].SetRate(d);
                        s_callback(d);
                    } else {
                        ui.Alert(d.msg, "Lỗi", function () { });
                    }
                }
                else {
                    f_callback(d);
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    if (connectionError == 0) {
                        connectionError = 1;
                        ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                            ui.ShowCategoryPage();
                        });
                    }
                }
            }
        });
    },

    Like: function (s_callback, f_callback) {
        var r = request.Like();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                var d = data;
                if (d.status == "ok") {
                    promotions[d.promotionId].SetLike(d);
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Lỗi", function () { });
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối internet.", "Lỗi", function () {
                    });
                }
            }
        });
    },

    Comment: function (content, s_callback, f_callback) {
        if (content == "") {
            return;
        }
        var r = request.Comment(content);
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                var d = data;
                if (d.status == "ok") {
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Lỗi", function () { });
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối internet.", "Lỗi", function () {
                    });
                }
            }
        });
    },

    GetComments: function (s_callback, f_callback) {
        var r = request.GetComments();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    AddViewPromotion: function () {
        /*var r = request.AddViewPromotion();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });*/
    },

    GetCodeByPhone: function (callback) {
        var r = request.GetCodeByPhone();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                var d = data;
                callback(d);
                if (d.data == "3") {
                    client.GetEndUserInfo();
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    ActiveCode: function (phone, code) {
        var p = "84";
        for (var i = 1; i < phone.length; i++) {
            p += phone[i];
        }
        
        var r = 'http://viplus.vinaphone.com.vn/?json=neon/activeWS&phone=' + p + '&activecode=' + code;
        ui.ShowLoading();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                ui.HideLoading();
                CloseSearchPanel();
                ui.Alert(data.msg, "Thông báo", function () { })
            },
            error: function (responseData, textStatus, errorThrown) {
            }
        });
    },

    VerifyCode: function (callback) {
        var r = request.VerifyCode();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                var jd = data;
                if (jd.status == "ok") {
                    token = jd.token;
                    window.localStorage.setItem('token', jd.token);
                    client.GetEndUserInfo();
                }
                callback(jd);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    SendRequest:function(url, login){
        var r = request.VerifyCode();

        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                alert(data.msg);
                ui.Alert(data.msg, 'Thông báo', function () {

                })
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    SendOrder: function () {
        var r = request.SendOrder();
        ui.ShowLoading();
        $.ajax({
            url: r,
            dataType: 'jsonp', crossDomain: true, async: false,
            success: function (data, textStatus, jqXHR) {
                ui.HideLoading();
                console.log(data);
                ui.Alert(data.msg, 'Thông báo', function () {
                    
                })
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Lỗi", function () {
                        ui.ShowCategoryPage();
                    });
                }
            }
        });
    },

    UpdateEndUserInfo: function (data) {
        ui.HideLoading();
        endUser = new EndUserInfo(data);
        $("#inf_txthoten").html(endUser.userName);
        $("#inf_txtemail").html(endUser.email);
        $("#inf_txtsdt").html(endUser.phone);
        var img = endUser.groupId;
        if (img > 11) {
            img = 3;
        }
        d = new Date();
        $("#avatar_img").attr("src", endUser.avatar + "?" + d.getTime());
        $("#avatar_img1").attr("src", endUser.avatar + "?" + d.getTime());
        $("#txt_address").html(endUser.address);
        $("#imguser1").attr('src', 'img/levels/' + img + '.png');
        $("#imguser").attr('src', 'img/levels/' + img + '.png');
        $("#lblleveltext1").html(group[endUser.groupId].name);
        $("#lblleveltext").html(group[endUser.groupId].name);
        $("#uName1").html(endUser.userName);
        $("#uName").html(endUser.userName);
        $("#loyalty_point1").html("Điểm: " + endUser.loyaltyPoint);
        $("#loyalty_point").html("Điểm: " + endUser.loyaltyPoint);
        createplist();
        if (currentCategoryId != -1) {
            ui.ReloadPromotionsPage();
        }
    },

    UploadAvatar: function (img) {
        var r = 'http://viplus.vinaphone.com.vn/?json=neon/uploadAvatar&token=' + token;

    }
}

$(document).ready(function () {
    onDocumentReady();
});