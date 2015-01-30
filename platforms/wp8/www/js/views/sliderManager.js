var sliders = [];
var slider = {
    InitSlider: function (name, time) {
        //member image slider
        if (time > 0) {
            var t = $('.' + name).swiper({
                autoplay: time,
                loop: true,
                noSwiping: true,
                autoplayDisableOnInteraction: false
            });
            sliders[name] = t;
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

var scrolls = [];
function ReInitPromotionsScroll() {
    for (var i = 0; i < 4; i++) {
        scrolls[i+''].reInit();
    }
}
var holdPosition= 0;
function InitAllScrolls() {
    //new scroll
    scrolls[0] = $(".randomScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[0] + slShow / 2 * 3 < plist[currentCategoryId][0].length) {
                    holdPosition = pos;
                    $("#moreani2").removeClass('hidden');
                } else {;
                    $("#moreani2").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onResistanceBefore: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[0] > 0) {
                    $("#moreani1").removeClass('hidden');
                    holdPosition = -pos;
                } else {
                    $("#moreani1").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onTouchEnd: function () {
            $("#moredata2").addClass('hidden');
            $("#moredata1").addClass('hidden');
            $("#moreani1").addClass('hidden');
            $("#moreani2").addClass('hidden');
            var len = plist[currentCategoryId][0].length;
            var me = scrolls[0];
            var pos = me.positions;
            if (holdPosition > 100) {   //after
                var odd = len - (currentSlide[0] + slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".randomScroll .swiper-wrapper").empty();
                currentSlide[0] += slShow;
                var d;
                if (slShow > odd) {
                    d = odd;
                } else {
                    d = slShow;
                }
                for (var i = 0; i < d + slShow / 2; i++) {
                    $(".randomScroll .swiper-wrapper").append(ui.PromotionItemSlide(
                        plist[currentCategoryId][0][currentSlide[0] + i][0],
                        plist[currentCategoryId][0][currentSlide[0] + i][1]));
                }
                
                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (slShow * slideSize));
            }
            if (holdPosition < -100) {  //before
                var odd = len - (currentSlide[0] + slShow / 2);
                var d = 0;
                $(".randomScroll .swiper-wrapper").empty();
                currentSlide[0] -= slShow;
                for (d = 0; d <= slShow / 2 * 3; d++) {
                    $(".randomScroll .swiper-wrapper").append(ui.PromotionItemSlide(plist[currentCategoryId][0][currentSlide[0] + d][0], plist[currentCategoryId][0][currentSlide[0] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (slShow * slideSize));
            }
            holdPosition = 0;
        }
    });
    scrolls[1] = $(".hotScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[1] + slShow / 2 * 3 < plist[currentCategoryId][1].length) {
                    holdPosition = pos;
                    $("#moreani2").removeClass('hidden');
                } else {
                    $("#moreani2").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onResistanceBefore: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[1] > 0) {
                    $("#moreani1").removeClass('hidden');
                    holdPosition = -pos;
                } else {
                    $("#moreani1").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onTouchEnd: function () {
            $("#moreani1").addClass('hidden');
            $("#moreani2").addClass('hidden');
            var len = plist[currentCategoryId][1].length;
            var me = scrolls[1];
            var pos = me.positions;
            if (holdPosition > 100) {   //after
                var odd = len - (currentSlide[1] + slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".hotScroll .swiper-wrapper").empty();
                currentSlide[1] += slShow;
                var d;
                if (slShow > odd) {
                    d = odd;
                } else {
                    d = slShow;
                }
                for (var i = 0; i < d + slShow / 2; i++) {
                    $(".hotScroll .swiper-wrapper").append(ui.PromotionItemSlide(
                        plist[currentCategoryId][1][currentSlide[1] + i][0],
                        plist[currentCategoryId][1][currentSlide[1] + i][1]));
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (slShow * slideSize));
            }
            if (holdPosition < -100) {  //before
                var odd = len - (currentSlide[1] + slShow / 2);
                var d = 0;
                $(".hotScroll .swiper-wrapper").empty();
                currentSlide[1] -= slShow;
                for (d = 0; d <= slShow / 2 * 3; d++) {
                    $(".hotScroll .swiper-wrapper").append(ui.PromotionItemSlide(plist[currentCategoryId][1][currentSlide[1] + d][0], plist[currentCategoryId][1][currentSlide[1] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (slShow * slideSize));
            }
            holdPosition = 0;
        }
    });
    scrolls[2] = $(".newScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[2] + slShow / 2 * 3 < plist[currentCategoryId][2].length) {
                    holdPosition = pos;
                    $("#moreani2").removeClass('hidden');
                } else {
                    $("#moreani2").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onResistanceBefore: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[2] > 0) {
                    $("#moreani1").removeClass('hidden');
                    holdPosition = -pos;
                } else {
                    $("#moreani1").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onTouchEnd: function () {
            $("#moreani1").addClass('hidden');
            $("#moreani2").addClass('hidden');
            var len = plist[currentCategoryId][2].length;
            var me = scrolls[2];
            var pos = me.positions;
            if (holdPosition > 100) {   //after
                var odd = len - (currentSlide[2] + slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".newScroll .swiper-wrapper").empty();
                currentSlide[2] += slShow;
                var d;
                if (slShow > odd) {
                    d = odd;
                } else {
                    d = slShow;
                }
                for (var i = 0; i < d + slShow / 2; i++) {
                    $(".newScroll .swiper-wrapper").append(ui.PromotionItemSlide(
                        plist[currentCategoryId][2][currentSlide[2] + i][0],
                        plist[currentCategoryId][2][currentSlide[2] + i][1]));
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (slShow * slideSize));
            }
            if (holdPosition < -100) {  //before
                var odd = len - (currentSlide[0] + slShow / 2);
                var d = 0;
                $(".newScroll .swiper-wrapper").empty();
                currentSlide[2] -= slShow;
                for (d = 0; d <= slShow / 2 * 3; d++) {
                    $(".newScroll .swiper-wrapper").append(ui.PromotionItemSlide(plist[currentCategoryId][2][currentSlide[0] + d][0], plist[currentCategoryId][2][currentSlide[2] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (slShow * slideSize));
            }
            holdPosition = 0;
        }
    });
    scrolls[3] = $(".nearScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        slideVisibleClass: 'scroll_visible',
        onTouchStart: function() {
            //holdPosition = 0;
        },
        onResistanceBefore: function (s, pos) {
            if (pos > 100) {
                $('#moreani3').removeClass('hidden');
            } else {
                $('#moreani3').addClass('hidden');
            }
            holdPosition = pos;
        },
        onTouchEnd: function(){
            var x = 0;
            $('#moreani3').addClass('hidden');
            if (holdPosition > 100) {
                scrolls[3].setWrapperTranslate(0,100,0)
                scrolls[3].params.onlyExternal = true

                updateplist();
                ui.ReloadNear();
                scrolls[3].setWrapperTranslate(0, 0, 0)
                scrolls[3].params.onlyExternal = false;
                holdPosition = 0;
            }
        }
    });
    scrolls[5] = $(".infoScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[6] = $(".locationScroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[7] = $(".imageScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true
    });
    scrolls[8] = $(".detail_scroll").swiper({
        mode: 'vertical',
        scrollContainer: true
    });
    scrolls[9] = $(".p_nav_slider").swiper({
        mode: 'horizontal',
        slidesPerView: 3,
        centeredSlides: true,
        onlyExternal: true
    });
    scrolls[10] = $(".bestbuyScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true
    });
    scrolls[11] = $(".searchScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[5] + slShow / 2 * 3 < searchresult.length) {
                    holdPosition = pos;
                    $("#moreani2").removeClass('hidden');
                } else {
                    $("#moreani2").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onResistanceBefore: function (s, pos) {
            if (pos > 100) {
                if (currentSlide[5] > 0) {
                    $("#moreani1").removeClass('hidden');
                    holdPosition = -pos;
                } else {
                    $("#moreani1").addClass('hidden');
                }
            } else {
                holdPosition = -pos;
                $("#moreani1").addClass('hidden');
                $("#moreani2").addClass('hidden');
            }
        },
        onTouchEnd: function () {
            $("#moreani1").addClass('hidden');
            $("#moreani2").addClass('hidden');
            var len = searchresult.length;
            var me = scrolls[11];
            var pos = me.positions;
            if (holdPosition > 100) {   //after
                var odd = len - (currentSlide[5] + slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".searchScroll .swiper-wrapper").empty();
                currentSlide[5] += slShow;
                var d;
                if (slShow > odd) {
                    d = odd;
                } else {
                    d = slShow;
                }
                for (var i = 0; i < d + slShow / 2; i++) {
                    $(".searchScroll .swiper-wrapper").append(ui.PromotionItemSlide(
                        searchresult[currentSlide[5] + i],-1));
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (slShow * slideSize));
            }
            if (holdPosition < -100) {  //before
                var odd = len - (currentSlide[5] + slShow / 2);
                var d = 0;
                $(".searchScroll .swiper-wrapper").empty();
                currentSlide[5] -= slShow;
                for (d = 0; d <= slShow / 2 * 3; d++) {
                    $(".searchScroll .swiper-wrapper").append(ui.PromotionItemSlide(searchresult[currentSlide[0] + d], -1));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (slShow * slideSize));
            }
            holdPosition = 0;
        }
    });

}
$(document).ready(function () {
    InitAllScrolls();
})

