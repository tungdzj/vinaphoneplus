//http:// neonstudio.zapto.org:3222/viplus/
//http:// 192.168.1.14/quickdealSourcecode/duplicate_quickdeal/
//http:// viplus.vinaphone.com.vn/
//var host = "http://192.168.1.45/viplus/";
var host = "http://viplus.vinaphone.com.vn/";
var httpReq = null;
var connectionError = 0;
var isInternet = 1;

var client = {

    NoInternet: function(){
        //isInternet = 0;
        //utils.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
        //});
        //client.criticalError = 1;
        //client.CheckInternet();
    },

    criticalError: 0,

    CheckInternet: function () {
        var r = "http://viplus.vinaphone.com.vn/?json=neon/checkInternet";
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                location.reload();
            },
            error: function (responseData, textStatus, errorThrown) {
                client.CheckInternet();
            }
        });
    },


    GetAllInfo: function (s_callback, f_callback) {
        var r = request.GetAllInfo();
        $.ajax({
            url: r,
            timeout: 0,
            crossDomain: true, //dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                $("#moreani4").addClass('hidden');
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                utils.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                });
                client.criticalError = 1;
                client.CheckInternet();
            }
        });
    },
    
    GetEndUserInfo: function () {
        var r = request.GetUserInfo();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                for (var i = 0; i < data.groupInfo.length; i++) {
                   store.group[data.groupInfo[i].groupEnduserId] = new GroupUser(data.groupInfo[i]);
                }
                var d = data;
                client.UpdateEndUserInfo(data.data);
				store.CorrectLikeList();
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {

                    });
                }
            }
        });
    },

    UpdateUserInfo: function (s_callback, f_callback) {
        var r = request.UpdateUserInfo();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                if (data.status == 'ok'){
					client.UpdateEndUserInfo(data.data);
					s_callback(data);
				}else{
					ui.Alert('Thông tin không hợp lệ', 'Thông báo', function(){});
				}
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    GetDealCode: function (s_callback, f_callback) {
        var r = request.GetDealCode();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                if (data.status == "ok") {
                    
                    store.promotions[data.data.promotionId].Remain = data.data.remain;
                    promotionControl.AddPromotionCode(data.data.promotionId, data.data.code);
                    s_callback(data);
                }
                else {
                    //ui.Alert(d.msg, "Thông báo", function () { });
                    f_callback(data);
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    Rate: function (stars, s_callback, f_callback) {
        var r = request.Rate(stars);
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                if (data.status == "ok") {
                    var d = data;
                    if (d.status == "ok") {
                        store.promotions[d.promotionId].SetRate(d);
                        s_callback(d);
                    } else {
                        ui.Alert(d.msg, "Thông báo", function () { });
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
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
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
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                var d = data;
                if (d.status == "ok") {
                    store.promotions[d.promotionId].SetLike(d);
                    s_callback(d);
                } else {
                    ui.Alert(d.msg, "Thông báo", function () { });
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối internet.", "Thông báo", function () {
                    });
                }
            }
        });
    },
	
	Like1:function(id){
		var r = request.Like1(id);
		console.log("liked: " + r);
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {

            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối internet.", "Thông báo", function () {
                    });
                }
            }
        });
	},

    Comment: function (content, s_callback, f_callback) {
		if (content == ""){
			return;
		}
		var r = request.Comment(content);
		$.ajax({
		    url: r,
		    crossDomain: true,//dataType: 'jsonp',
		    success: function (data, textStatus, jqXHR) {
		        var d = data;
		        if (d.status == "ok") {
		            s_callback(d);
		        } else {
		            ui.Alert(d.msg, "Thông báo", function () { });
		        }
		    },
		    error: function (responseData, textStatus, errorThrown) {
		        if (connectionError == 0) {
		            connectionError = 1;
		            ui.Alert("Quý khách vui lòng kiểm tra lại kết nối internet.", "Thông báo", function () {
		            });
		        }
		    }
		});
    },

    GetComments: function (s_callback, f_callback) {
        var r = request.GetComments();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    AddViewPromotion: function () {
        var r = request.AddViewPromotion();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                s_callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    GetCodeByPhone: function (callback) {
        var r = request.GetCodeByPhone();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                $("#moreani4").addClass('hidden');
                var d = data;
                
                callback(d);
                if (d.data == "3") {
                    client.GetEndUserInfo();
                    store.UpdateLikeList(d.liked);
                }
                
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    VerifyCode: function (callback) {
        var r = request.VerifyCode();
        console.log(r);
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data));
                var jd = data;
                if (jd.status == "ok") {
                    userControl.token = jd.token;
                    window.localStorage.setItem('token', jd.token);
                    client.GetEndUserInfo();
                    store.UpdateLikeList(jd.liked);
                }
                callback(jd);
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    ui.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
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
        utils.ShowLoading();
        $.ajax({
            url: r,
            crossDomain: true,//dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                utils.HideLoading();
                CloseSearchPanel();
                //ui.Alert('Quý khách đã kích hoạt thành công gói cước MAX_KM. Chi tiết liên hệ 9191. Cảm ơn quý khách đã sử dung dịch vụ', 'Thông báo', function () { })
                utils.Alert(data.msg, "Thông báo", function () { });
            },
            error: function (responseData, textStatus, errorThrown) {
            }
        });
    },

    SendOrder: function () {
        var r = request.SendOrder();
        utils.ShowLoading();
        $.ajax({
            url: r,
            crossDomain: true,
            //dataType: 'jsonp', //dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                utils.HideLoading();
                utils.Alert(data.msg, 'Thông báo', function () {
                })
            },
            error: function (responseData, textStatus, errorThrown) {
                if (connectionError == 0) {
                    connectionError = 1;
                    utils.Alert("Quý khách vui lòng kiểm tra lại kết nối Internet.", "Thông báo", function () {
                        pageManager.ChangePage("categories_page");
                    });
                }
            }
        });
    },

    UpdateEndUserInfo: function (data) {
        utils.HideLoading();
		$(".loading-container").addClass('hidden');
        userControl.endUser = new EndUserInfo(data);
        $("#inf_txthoten").html(userControl.endUser.userName);
        $("#inf_txtemail").html(userControl.endUser.email);
        $("#txt_address").html(userControl.endUser.address);
        $("#inf_txtsdt").html(userControl.endUser.phone);
        var img = userControl.endUser.groupId;
        if (img > 11) {
            img = 3;
        }
        d = new Date();
        $("#avatar_img").attr("src", userControl.endUser.avatar + "?" + d.getTime());
        $("#avatar_img1").attr("src", userControl.endUser.avatar + "?" + d.getTime());
        $("#imguser1").attr('src', 'img/levels/' + img + '.png' + "?" + d.getTime());
        $("#imguser").attr('src', 'img/levels/' + img + '.png' + "?" + d.getTime());
        $("#lblleveltext2").html(store.group[userControl.endUser.groupId].name);
        $("#lblleveltext1").html(store.group[userControl.endUser.groupId].name);
        $("#lblleveltext").html(store.group[userControl.endUser.groupId].name);
        $("#uName2").html(userControl.endUser.userName.toUpperCase());
        $("#uName1").html(userControl.endUser.userName);
        $("#uName").html(userControl.endUser.userName);
        $("#loyalty_point2").html("Điểm: " + userControl.endUser.loyaltyPoint);
        $("#loyalty_point1").html("Điểm: " + userControl.endUser.loyaltyPoint);
        $("#loyalty_point").html("Điểm: " + userControl.endUser.loyaltyPoint);
        store.Createplist();
        if (pageManager.currentPage == "promotions_page") {
            //ui.ReloadPromotionsPage();
            pageManager.ChangePage("promotions_page");
        }
    },

    CheckVersion: function (callback) {
        var r = request.CheckVersion();
        $.ajax({
            url: r,
            //dataType: 'jsonp', crossDomain: true, //dataType: 'jsonp',
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
            }
        });
    },
}

function showUserInfo() {

}
