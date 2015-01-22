//social
function detailLike() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ THÍCH ĐIỀU NÀY");
        user.HideAllPopupTab();
        ui.Show("#login_popup1")
        ui.ChangePage("login_dialog");
        return;
    }
    else {
        client.Like(function (data) { }, function (msg) { });
    }
}

function detailGetCode() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ LẤY CODE");
        user.HideAllPopupTab();
        ui.Show("#login_popup1")
        ui.ChangePage("login_dialog");
        return;
    }
    else {
        ui.ShowLoading();
        client.GetDealCode(function (data) {
            ui.HideLoading();
            $("#deal_code_button").html(data.data.code);
        },
        function (data) {
            ui.HideLoading();
            ui.Alert(data.msg, "Thông báo", function () { });
        })
    }
}

function detailCommentClick() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ BÌNH LUẬN");
        user.HideAllPopupTab();
        ui.Show("#login_popup1");
        ui.ChangePage("login_dialog");
        return;
    }
    ui.ChangePage("comment_page");
    if (loadingComment) {
        ui.ShowLoading();
    }
}

function detailRate() {
    if (!loggedIn) {
        $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ ĐÁNH GIÁ");
        user.HideAllPopupTab();
        ui.Show("#login_popup1")
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
    client.Rate(1, detailRateCallback, function (msg) { });
});
$("#rate_pic_2").click(function () {
    updateStars(2);
    ui.ClosePopup("#rate_dialog");
    client.Rate(2, detailRateCallback, function (msg) { });
});
$("#rate_pic_3").click(function () {
    updateStars(3);
    ui.ClosePopup("#rate_dialog");
    client.Rate(3, detailRateCallback, function (msg) { });
});
$("#rate_pic_4").click(function () {
    updateStars(4);
    ui.ClosePopup("#rate_dialog");
    client.Rate(4, detailRateCallback, function (msg) { });
});
$("#rate_pic_5").click(function () {
    updateStars(5);
    ui.ClosePopup("#rate_dialog");
    client.Rate(5, detailRateCallback, function (msg) { });
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
        $("#comment_count").html(data.totalComment);
    },
    function (msg) { });
}

