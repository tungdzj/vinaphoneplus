var helpView = {
    Update: function () {
        helpView.Refresh();
        help_scroll.swipeTo(0);
    },
    Refresh: function () {
        $("#help_text").removeClass("hidden");
        help_scroll.reInit();

    }
}