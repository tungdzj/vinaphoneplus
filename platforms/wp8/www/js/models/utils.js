var ui = {
    Alert: function (message, title, callback) {
        if (window.navigator.platform != "Win32") {
            navigator.notification.alert(
            message,
            callback,         // callback
            title,
            "Đóng"
            );
        } else {
            alert(message);
            callback();
        }
    },

    OpenLink: function (link) {
        window.open(link, '_blank', 'location=yes');
    },
}

var utils = {
    popupOpen: "none",
    Alert: function (message, title, callback) {
        if (window.navigator.platform != "Win32") {
            navigator.notification.alert(
            message,
            callback,         // callback
            title,
            "Đóng"
            );
        } else {
            alert(message);
            callback();
        }
    },

    Show: function (page) {
        if ($(page).hasClass("hidden")) {
            $(page).removeClass("hidden");
        }
        if (page == "#login_popup3") {
            $(".warning_text").html("");
        }
    },

    Hide: function (page) {
        if (!$(page).hasClass("hidden")) {
            $(page).addClass("hidden");
        }
    },

    OpenPopup: function (selector) {
        pageManager.popupOpen = selector;
        $(selector).popup('open', { transition: 'pop' });
    },

    ClosePopup: function (selector) {
        $(selector).popup('close');
        pageManager.popupOpen = "none";
    },

    ToggleMenu: function () {
        $("#menu_panel").panel("toggle");
    },

    OpenMenu: function () {
        $("#menu_panel").panel("open");
    },

    CloseMenu: function () {
        $("#menu_panel").panel("close");
    },

    ShowLoading: function () {
        $.mobile.loading("show");
    },

    HideLoading: function () {
        $.mobile.loading("hide");
    },

    ClosePopup: function (selector) {
        $(selector).popup('close');
        popupOpen = "none";
    },
    GetDayFromString: function (str) {
        var d = new Date(str.replace(" ", "T"));

        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + (d.getFullYear() + "")/*.substr(2,2)*/;
    },
    Prompt: function (selector, message) {
		if (window.navigator.platform == "Win32") {
			var content = prompt(message);
			if (content != "" && content != null){
				$(selector).html(content);
			}
		}else
		{
			navigator.notification.prompt(
            message,
            function (result) {
                if (result.buttonIndex == 1) {
                    $(selector).html(result.input1);
                }
            },
            'Nhập',
            ['Xong', 'Hủy'],
            '');
		}
    },
    OpenLink: function (link) {
        window.open(link, '_blank', 'location=yes');
    },

    Confirm: function (message, title, callback1, callback2) {
        if (window.navigator.platform == "Win32") {
            if (confirm(message)) {
                callback1();
            } else {
                callback2();
            }
        } else {
            navigator.notification.confirm(
                    message,
                    function (button) {
                        if (button == 1) {
                            callback1();
                        } else if (button == 2) {
                            callback2();
                        }
                    },
                    title,
                    ['Có', 'Không']
                    );
        }
    },

    Confirm1: function (message, title, callback1, callback2, btn1, btn2) {
        if (window.navigator.platform == "Win32") {
            if (confirm(message)) {
                callback1();
            } else {
                callback2();
            }
        } else {
            navigator.notification.confirm(
                    message,
                    function (button) {
                        if (button == 1) {
                            callback1();
                        } else if (button == 2) {
                            callback2();
                        }
                    },
                    title,
                    [btn1, btn2]
                    );
        }
    },

    GenSlash: function (code) {
        var t = '';
        for (var i = 0; i < code.length; i++) {
            if (i == 4 ||
                i == 9) {
                t += '&nbsp;&nbsp;';
            }
            t += code[i];
        }
        return t;
    },

    RemoveSlash: function (code) {
        console.log(code)
        var t = code.replace('&nbsp;&nbsp;', '');
        t = t.replace('&nbsp;&nbsp;', '');
        return t;
    },

    MatchName: function (a, b) {
        a = " " + a;
        for (var i = 1; i < a.length; i++) {
            if (a[i - 1] == ' ') {
                if (a[i] == b[0]) {
                    var flag = 1;
                    for (var j = 0; j < b.length; j++) {
                        if (a[i + j] != b[j]) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    GetDateString: function () {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var year = d.getFullYear();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var second = d.getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
    }
}