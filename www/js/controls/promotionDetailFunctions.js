﻿//social
function detailLike() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
        userView.HideAllPopupTab();
        utils.Show("#login_popup1")
        ui.ChangePage("login_dialog");
        return;
    }
    else {
        client.Like(function (data) { }, function (msg) { });
    }
}

function detailGetCode() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ LẤY MÃ ƯU ĐÃI");
        userView.HideAllPopupTab();
        utils.Show("#login_popup1")
        ui.ChangePage("login_dialog");
        return;
    }
    else {
        utils.ShowLoading();
        client.GetDealCode(function (data) {
            ui.HideLoading();
            $("#deal_code_button").html(genSlash(data.data.code));
            $(".getcodecontainer1").addClass('hidden');
            $(".getcodecontainer").removeClass('hidden');
            $(".showQRButton").removeClass("hidden");
            scrolls[8].reInit();
        },
        function (data) {
            console.log(data);
            ui.HideLoading();
            ui.Alert(data.msg, "Thông báo", function () { });
        })
    }
}

function detailCommentClick() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ BÌNH LUẬN");
        userView.HideAllPopupTab();
        utils.Show("#login_popup1");
        ui.ChangePage("login_dialog");
        return;
    }
    ui.ChangePage("comment_page");
    if (loadingComment) {
        utils.ShowLoading();
    }
}

function detailRate() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ ĐÁNH GIÁ");
        userView.HideAllPopupTab();
        utils.Show("#login_popup1")
        ui.ChangePage("login_dialog");
        return;
    }
    ui.OpenPopup("#rate_dialog");
}

function detailRateCallback(data) {
}
$("#rate_pic_1").click(function () {
    updateStars(1);
    ui.ClosePopup("#rate_dialog");
    client.Rate(1, detailRateCallback, function (msg) {
        ui.Alert(msg, "Lỗi", function () { })
    });
});
$("#rate_pic_2").click(function () {
    updateStars(2);
    ui.ClosePopup("#rate_dialog");
    client.Rate(2, detailRateCallback, function (msg) {
        ui.Alert(msg, "Lỗi", function () { })
    });
});
$("#rate_pic_3").click(function () {
    updateStars(3);
    ui.ClosePopup("#rate_dialog");
    client.Rate(3, detailRateCallback, function (msg) {
        ui.Alert(msg, "Lỗi", function () { })
    });
});
$("#rate_pic_4").click(function () {
    updateStars(4);
    ui.ClosePopup("#rate_dialog");
    client.Rate(4, detailRateCallback, function (msg) {
        ui.Alert(msg, "Lỗi", function () { })
    });
});
$("#rate_pic_5").click(function () {
    updateStars(5);
    ui.ClosePopup("#rate_dialog");
    client.Rate(5, detailRateCallback, function (msg) {
        ui.Alert(msg, "Lỗi", function () { })
    });
});

function updateStars(stars) {
    for (var i = 1; i <= stars; i++) {
        $("#rate_pic_" + i).attr("src", "img/star_filled.png");
    }
    for (var i = stars + 1; i <= 5; i++) {
        $("#rate_pic_" + i).attr("src", "img/star_empty.png");
    }
}

function detailSendComment() {
    var s = $("#comment_input").val();
    $("#comment_input").val('');
    
    client.Comment(s, function (data) {
        $(".comments").append(ui.CommentField("default", data.data.userName, data.data.content));
        $("#comment_count span").html(data.totalComment);
    },
    function (msg) { });
}

