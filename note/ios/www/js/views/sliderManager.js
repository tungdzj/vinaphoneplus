var sliders = new Array();
var slider = {
    InitSlider: function (name, time) {
        //member image slider
        if (time > 0) {
            sliders[name] = $('.' + name).swiper({
                autoplay: time,
                loop: true,
                noSwiping: true,
                autoplayDisableOnInteraction: false
            });
        } else {
            var t = Math.round(Math.random() * 1000 + 3000);
            sliders[name] = $('.' + name).swiper({
                autoplay: t,
                loop: true,
                noSwiping: true,
                autoplayDisableOnInteraction: false
            });
        }
    },

    AddSlide: function (slider, url) {
        if (sliders[slider] != null) {
            sliders[slider].createSlide("<img src='" + url + "' />").append();
        }
    },

    RemoveAllSlide: function (slider) {
        sliders[slider].removeAllSlides();
    },

    ReInit: function (slider) {
        if (sliders[slider] != null) {
            sliders[slider].reInit();
        }
        
    },

    SwipeNext: function (slider) {
        sliders[slider].swipeNext();
    }
}

var scrolls = new Array();
function ReInitPromotionsScroll() {
    for (var i = 0; i < 4; i++) {
        scrolls[i+''].reInit();
    }
}
function InitAllScrolls() {
    scrolls[0] = $(".newScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[1] = $(".nearScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[2] = $(".bestviewScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[3] = $(".bestbuyScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    /*scrolls[4] = $(".detailScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });*/
    scrolls[5] = $(".infoScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[6] = $(".locationScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    console.log("6");
    scrolls[7] = $(".imageScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    console.log("7");
}
$(document).ready(function () {
    InitAllScrolls();
})

