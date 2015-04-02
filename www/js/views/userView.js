var userView = {
    Update: function () {
        userView.HideAllPopupTab();
        utils.Show("#login_popup2");
    },

    Refresh:function(){

    },

    UpdateLoginStatus: function () {
        if (userControl.loggedIn) {
            utils.Hide("#login_panel");
            utils.Show("#login_success_notify");
            $("#not_login_footer").addClass("hidden");
            $("#loggedin_footer").removeClass("hidden");
            return;
        }
        token = "none";
        $("#not_login_footer").removeClass("hidden");
        $("#loggedin_footer").addClass("hidden");
    },

    ShowCard: function () {
        if (userControl.loggedIn) {
            utils.OpenPopup("#card_dialog");
        }
    },
    HideAllPopupTab: function () {
        for (var i = 1; i <= 5; i++) {
            utils.Hide("#login_popup" + i);
        }
    },
    Info: function () {
        userView.HideAllPopupTab();
        utils.OpenPopup("#login_dialog");
        utils.Show("#login_popup5");
    }
}