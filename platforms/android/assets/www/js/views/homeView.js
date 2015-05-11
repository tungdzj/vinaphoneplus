var homeView = {
    Update: function () {
        slider.RemoveAllSlide('member_image_slider');
        for (var i in store.homeImages) {
            slider.AddSlide('member_image_slider', host + store.homeImages[i]);
        }
        slider.ReInit('member_image_slider');
        $("#headline").empty();
        for (var h in store.headLine) {
            $("#headline").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + store.headLine[h]);
        }
        //$('#headline').marquee({
        //    duration: 9000
        //});
    },
    Refresh: function () {
        connectionError = 0;
        slider.ReInit('member_image_slider');
        for (var i = 1; i <= 6; i++) {
            slider.ReInit('category_slider' + i);
        }
    },

    OnCategoryClick: function (index) {

    }
}