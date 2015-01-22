var userPhoneNumber = "none";
var token = "";
var uuid = "none";
var verifyCode = "none";
var loggedIn = false;

var user = {
    HideAllPopupTab:function(){
        for (var i = 1; i <= 5; i++) {
            ui.Hide("#login_popup" + i);
        }
    },

    LogOut: function () {
        token = "none";
        loggedIn = false;
        ui.UpdateLoginStatus(false);
        window.localStorage.clear();
    },

    Login: function (s_callback, f_callback) {
        this.HideAllPopupTab();
        ui.Show("#login_popup2");
        //ui.OpenPopup("#login_dialog");
        ui.ChangePage("login_dialog");
    },
    
    CheckLogin: function (callback) {
        client.GetCodeByPhone(callback);
    },

    UserLoginSuccess: function (newToken) {
        token = newToken;
        loggedIn = true;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('phoneNumber', userPhoneNumber);
        ui.UpdateLoginStatus(true);
    },

    Info: function () {
        user.HideAllPopupTab();
        ui.OpenPopup("#login_dialog");
        ui.Show("#login_popup5");
    }
}


$("#login_btn_login").click(function () {
    ui.ShowLoading();
    verifyCode = $("#txt_maxacnhan").val();
    client.VerifyCode(function (data) {
        ui.HideLoading();
        if (data.status == "ok") {
            user.UserLoginSuccess(data.token);
            user.HideAllPopupTab();
            ui.Show("#login_popup4");
        } else {
            $(".warning_text").html(data.msg);
        }
    });
});

$("#login_btn_next").click(function () {
    userPhoneNumber = $("#txt_sdt").val();
    var str = "Số điện thoại của quý khách là \n               " + userPhoneNumber + "\nMột SMS có chứa mã xác nhận của Quý khách sẽ được gửi tới số này. Vui lòng kiểm tra tin nhắn và tiếp tục đăng nhập";
    navigator.notification.confirm(
                    str,
                    function (button) {
                        if (button == 2) {
                            ui.ShowLoading();
                            client.GetCodeByPhone(
                                function (data) {
                                    ui.HideLoading();
                                    switch (data.data) {
                                        case 1:
                                            ui.Alert("Số điện thoại không hợp lệ, hãy nhập lại...", "Thông báo", function () { });
                                            break;
                                        case 2:   //dang nhap lan dau
                                            user.HideAllPopupTab();
                                            ui.Show("#login_popup3");
                                            break;
                                        case 3:   //dang nhap lai tren 1 thiet bi
                                            user.UserLoginSuccess(data.token);
                                            user.HideAllPopupTab();
                                            ui.Show("#login_popup4");
                                            break;
                                        case 4:
                                            user.HideAllPopupTab();
                                            ui.Show("#login_popup3");
                                            break;
                                    }
                                });
                        }
                    },
                    'Thông báo',
                    ['Sửa số điện thoại', 'Tiếp tục']
                    );
    
})

$("#login_btn_back").click(function () {
    user.HideAllPopupTab();
    ui.Show("#login_popup2");
})

