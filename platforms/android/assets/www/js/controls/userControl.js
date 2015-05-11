var userControl = {
    userPhoneNumber: "none",
    token: "",
    uuid: "none",
    verifyCode: "none",
    loggedIn: false,
    endUser: null,

    OnBtnLoginClick: function () {
        utils.ShowLoading();
        verifyCode = $("#txt_maxacnhan").val();
        client.VerifyCode(function (data) {
            utils.HideLoading();
            if (data.status == "ok") {
                userControl.UserLoginSuccess(data.token);
                userView.HideAllPopupTab();
                utils.Show("#login_popup4");
            } else {
                $(".warning_text").html(data.msg);
            }
        });
    },

    OnBtnNextClick: function () {
        this.userPhoneNumber = $("#txt_sdt").val();
        var str = "Số điện thoại của quý khách là:\n" +
            this.userPhoneNumber + "\n\nMột SMS có chứa mã xác nhận của Quý khách sẽ được gửi tới số này. Vui lòng kiểm tra tin nhắn và tiếp tục đăng nhập";
        utils.ShowLoading();
        client.GetCodeByPhone(
            function (data) {
                utils.HideLoading();
                switch (data.data) {
                    case 1:
                        utils.Alert("Số điện thoại không hợp lệ, hãy nhập lại...", "Thông báo", function () { });
                        break;
                    case 2:   //dang nhap lan dau
                        userView.HideAllPopupTab();
                        utils.Show("#login_popup3");
                        utils.Alert(str, "Thông báo", function () { });
                        break;
                    case 3:   //dang nhap lai tren 1 thiet bi
                        userControl.UserLoginSuccess(data.token);
                        userView.HideAllPopupTab();
                        utils.Show("#login_popup4");
                        break;
                    case 4:
                        userView.HideAllPopupTab();
                        utils.Show("#login_popup3");
                        utils.Alert(str, "Thông báo", function () { });
                        break;
                    case '5':
                        utils.Alert(data.msg, 'Thông báo', function () { })
                        break;
                }
            });
    },

    OnBtnBackClick: function () {
        userView.HideAllPopupTab();
        utils.Show("#login_popup2");
    },
    LogOut: function () {
        store.likeList = [];
        utils.Confirm("Đăng xuất?", "Thông báo", function () {
            userControl.token = "none";
            userControl.loggedIn = false;
            userView.UpdateLoginStatus(false);
            window.localStorage.clear();
            var d = new Date();
            $("#avatar_img").attr("src", 'img/avatar_default.png' + "?" + d.getTime());
            $("#avatar_img1").attr("src", 'img/avatar_default.png' + "?" + d.getTime());
            $("#imguser1").attr('src', 'img/levels/' + 3 + '.png' + "?" + d.getTime());
            $("#imguser").attr('src', 'img/levels/' + 3 + '.png' + "?" + d.getTime());
            $("#lblleveltext2").html('Chưa đăng nhập');
            $("#lblleveltext1").html('Chưa đăng nhập');
            $("#lblleveltext").html('Chưa đăng nhập');
            $("#uName2").html('...');
            $("#uName1").html('');
            $("#uName").html('');
            $("#loyalty_point2").html('Điểm: 0');
            $("#loyalty_point1").html('Điểm: 0');
            $("#loyalty_point").html("Điểm: " + '0');
        }, function () { });

    },
    UserLoginSuccess: function (newToken) {
        userControl.token = newToken;
        userControl.loggedIn = true;
        window.localStorage.setItem('token', userControl.token);
        window.localStorage.setItem('phoneNumber', userControl.userPhoneNumber);
        userView.UpdateLoginStatus(true);
    },
    CheckLogin: function (callback) {
        client.GetCodeByPhone(callback);
    },

    OnAvatarClick: function () {
        if (window.navigator.platform == "Win32") {
            if (confirm("Chụp ảnh?")) {
                capturePhoto(1);
            }else{
                capturePhoto(0);
            }
        } else {
            navigator.notification.confirm(
                    'Cập nhật ảnh đại diện?',
                    function (button) {
                        if (button == 1) {
                            capturePhoto(1);
                        } else if (button == 2) {
                            capturePhoto(0);
                        }
                    },
                    'Thông báo',
                    ['Từ thư viện', 'Chụp', 'Hủy']
                    );
        }
    },
    UpdateClick: function () {
        if (userControl.loggedIn) {
            pageManager.ChangePage("login_dialog");
            userView.HideAllPopupTab();
            utils.Show("#login_popup5");
            if (userControl.endUser == null) {
                utils.ShowLoading();
                return;
            }
            $("#inf_txthoten").html(userControl.endUser.userName);
            $("#inf_txtemail").html(userControl.endUser.email);
            $("#inf_txtsdt").html(userControl.endUser.phone);
        } else {
            pageManager.ChangePage("login_dialog");
        }

    },

    ProcessUpdate: function () {
        userControl.endUser.userName = $("#inf_txthoten").html();
        userControl.endUser.email = $("#inf_txtemail").html();
        userControl.endUser.address = $("#txt_address").html();
        if (!userControl.validateForm(userControl.endUser.email)) {
            utils.Alert("Email không hợp lệ.", "Thông báo", function () { });
            return;
        }
        utils.ShowLoading();
        userControl.endUser.userName = $("#inf_txthoten").html();
        userControl.endUser.email = $("#inf_txtemail").html();
        client.UpdateUserInfo(
            function () {
                utils.HideLoading();
                utils.Alert("Cập nhật thông tin thành công.", "Thông báo",
                    function () {
                        //ui.ClosePopup("#login_dialog");
                        pageManager.OnBackClick();
                    });
            },
            function () { });
    },
    validateForm: function (val) {
        if (val == '') {
            return true;
        }
        var x = val;
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            return false;
        }
        return true;
    }
}
$(document).ready(function () {
    if (window.navigator.platform == "Win32") { //run on
        if (window.localStorage.getItem('phoneNumber') != null &&
                window.localStorage.getItem('phoneNumber') != "none") {
            userControl.userPhoneNumber = window.localStorage.getItem('phoneNumber');
            userControl.CheckLogin(function (data) {
                if (data.data == "3") {
                    userControl.UserLoginSuccess(data.token);
                } else {
                    userControl.loggedIn = false;
                    userControl.userPhoneNumber = "none";
                    userView.UpdateLoginStatus();
                    window.localStorage.clear();
                }
            });
        }
    }
});
