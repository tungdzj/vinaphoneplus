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
    scrolls.random.reInit();
    scrolls.hot.reInit();
    scrolls["new"].reInit();
    scrolls.near.reInit();
    //scrolls.bestbuy.reInit();
    scrolls.search.reInit();
    scrolls.like.reInit();

    scrolls.random.swipeTo(0);
    scrolls.hot.swipeTo(0);
    scrolls.new.swipeTo(0);
    scrolls.near.swipeTo(0);
    //scrolls.bestbuy.swipeTo(0);
    scrolls.like.swipeTo(0);
}
var holdPosition = 0;
var threshHold = 50;
function InitAllScrolls() {
	//like scroll
    scrolls.like = $(".likeScroll").swiper({
        speed: 0,
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > threshHold) {
                if (promotionView.currentLikeSlide + promotionView.slShow / 2 * 3 < store.likeList[store.currentCategoryId].length) {
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
            if (pos > threshHold) {
                if (promotionView.currentLikeSlide > 0) {
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
            var len = store.likeList[store.currentCategoryId].length;
            var me = scrolls.like;
            var pos = me.positions;
            if (holdPosition > threshHold) {   //after
                var odd = len - (promotionView.currentLikeSlide + promotionView.slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".likeScroll .swiper-wrapper").empty();
                promotionView.currentLikeSlide += promotionView.slShow;
                var d;
                if (promotionView.slShow > odd) {
                    d = odd;
                } else {
                    d = promotionView.slShow;
                }
                for (var i = 0; i < d + promotionView.slShow / 2; i++) {
                    if (store.promotions[store.likeList[store.currentCategoryId][promotionView.currentLikeSlide + i]] != null) {
                        console.log("add" + store.likeList[store.currentCategoryId][i]);
                        $(".likeScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(store.likeList[store.currentCategoryId][promotionView.currentLikeSlide + i], -1));
					}
                    
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (promotionView.slShow * promotionView.slideSize - 10));
            }
            if (holdPosition < -threshHold) {  //before
                var odd = len - (promotionView.currentLikeSlide + promotionView.slShow / 2);
                var d = 0;
                $(".likeScroll .swiper-wrapper").empty();
                promotionView.currentLikeSlide -= promotionView.slShow;
                for (d = 0; d <= promotionView.slShow / 2 * 3; d++) {
                    if (store.promotions[store.likeList[store.currentCategoryId][promotionView.currentLikeSlide + d]] != null) {
                        console.log(store.likeList[store.currentCategoryId][i]);
                        $(".likeScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(store.likeList[store.currentCategoryId][promotionView.currentLikeSlide + d], -1));
					}
                    
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (promotionView.slShow * promotionView.slideSize - 8));
            }
            holdPosition = 0;
        }
    });
    //random scroll
    scrolls.random = $(".randomScroll").swiper({
        speed:0,
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > threshHold) {
                if (promotionView.currentSlide[0] + promotionView.slShow / 2 * 3 < store.plist[store.currentCategoryId][0].length) {
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
            if (pos > threshHold) {
                if (promotionView.currentSlide[0] > 0) {
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
            var len = store.plist[store.currentCategoryId][0].length;
            var me = scrolls.random;
            var pos = me.positions;
            if (holdPosition > threshHold) {   //after
                var odd = len - (promotionView.currentSlide[0] + promotionView.slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".randomScroll .swiper-wrapper").empty();
                promotionView.currentSlide[0] += promotionView.slShow;
                var d;
                if (promotionView.slShow > odd) {
                    d = odd;
                } else {
                    d = promotionView.slShow;
                }
                for (var i = 0; i < d + promotionView.slShow / 2; i++) {
                    $(".randomScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(
                        store.plist[store.currentCategoryId][0][promotionView.currentSlide[0] + i][0],
                        store.plist[store.currentCategoryId][0][promotionView.currentSlide[0] + i][1]));
                }
                
                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (promotionView.slShow * promotionView.slideSize - 10));
            }
            if (holdPosition < -threshHold) {  //before
                var odd = len - (promotionView.currentSlide[0] + promotionView.slShow / 2);
                var d = 0;
                $(".randomScroll .swiper-wrapper").empty();
                promotionView.currentSlide[0] -= promotionView.slShow;
                for (d = 0; d <= promotionView.slShow / 2 * 3; d++) {
                    $(".randomScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][0][promotionView.currentSlide[0] + d][0], store.plist[store.currentCategoryId][0][promotionView.currentSlide[0] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (promotionView.slShow * promotionView.slideSize - 8));
            }
            holdPosition = 0;
        }
    });
    scrolls.hot = $(".hotScroll").swiper({
        speed: 0,
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > threshHold) {
                if (promotionView.currentSlide[1] + promotionView.slShow / 2 * 3 < store.plist[store.currentCategoryId][1].length) {
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
            if (pos > threshHold) {
                if (promotionView.currentSlide[1] > 0) {
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
            var len = store.plist[store.currentCategoryId][1].length;
            var me = scrolls.hot;
            var pos = me.positions;
            if (holdPosition > threshHold) {   //after
                var odd = len - (promotionView.currentSlide[1] + promotionView.slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".hotScroll .swiper-wrapper").empty();
                promotionView.currentSlide[1] += promotionView.slShow;
                var d;
                if (promotionView.slShow > odd) {
                    d = odd;
                } else {
                    d = promotionView.slShow;
                }
                for (var i = 0; i < d + promotionView.slShow / 2; i++) {
                    $(".hotScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(
                        store.plist[store.currentCategoryId][1][promotionView.currentSlide[1] + i][0],
                        store.plist[store.currentCategoryId][1][promotionView.currentSlide[1] + i][1]));
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (promotionView.slShow * promotionView.slideSize - 10));
            }
            if (holdPosition < -threshHold) {  //before
                var odd = len - (promotionView.currentSlide[1] + promotionView.slShow / 2);
                var d = 0;
                $(".hotScroll .swiper-wrapper").empty();
                promotionView.currentSlide[1] -= promotionView.slShow;
                for (d = 0; d <= promotionView.slShow / 2 * 3; d++) {
                    $(".hotScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(store.plist[store.currentCategoryId][1][promotionView.currentSlide[1] + d][0], store.plist[store.currentCategoryId][1][promotionView.currentSlide[1] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (promotionView.slShow * promotionView.slideSize - 8));
            }
            holdPosition = 0;
        }
    });
    scrolls.new = $(".newScroll").swiper({
        speed: 0,
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > threshHold) {
                if (promotionView.currentSlide[2] + promotionView.slShow / 2 * 3 < store.plist[store.currentCategoryId][2].length) {
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
            if (pos > threshHold) {
                if (promotionView.currentSlide[2] > 0) {
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
            var len = store.plist[store.currentCategoryId][2].length;
            var me = scrolls.new;
            var pos = me.positions;
            if (holdPosition > threshHold) {   //after
                var odd = len - (promotionView.currentSlide[2] + promotionView.slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".newScroll .swiper-wrapper").empty();
                promotionView.currentSlide[2] += promotionView.slShow;
                var d;
                if (promotionView.slShow > odd) {
                    d = odd;
                } else {
                    d = promotionView.slShow;
                }
                for (var i = 0; i < d + promotionView.slShow / 2; i++) {
                    $(".newScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(
                        store.plist[store.currentCategoryId][2][promotionView.currentSlide[2] + i][0],
                        store.plist[store.currentCategoryId][2][promotionView.currentSlide[2] + i][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (promotionView.slShow * promotionView.slideSize - 10));
            }

            if (holdPosition < -threshHold) {  //before
                var odd = len - (promotionView.currentSlide[2] + promotionView.slShow / 2);
                var d = 0;
                $(".newScroll .swiper-wrapper").empty();
                promotionView.currentSlide[2] -= promotionView.slShow;
                for (d = 0; d <= promotionView.slShow / 2 * 3; d++) {
                    $(".newScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(
                        store.plist[store.currentCategoryId][2][promotionView.currentSlide[2] + d][0],
                        store.plist[store.currentCategoryId][2][promotionView.currentSlide[2] + d][1]));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (promotionView.slShow * promotionView.slideSize - 8));
            }
            holdPosition = 0;
        }
    });
    scrolls.near = $(".nearScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        slideVisibleClass: 'scroll_visible',
        onTouchStart: function() {
            //holdPosition = 0;
        },
        onResistanceBefore: function (s, pos) {
            if (pos > threshHold) {
                $('#moreani3').removeClass('hidden');
            } else {
                $('#moreani3').addClass('hidden');
            }
            holdPosition = pos;
        },
        onTouchEnd: function(){
            var x = 0;
            $('#moreani3').addClass('hidden');
            if (holdPosition > threshHold) {
                if (deviceLocation == null) {
                    map.setCenter(new google.maps.LatLng(defaultLocation[0], defaultLocation[1]));
                    map.setZoom(16);
                } else {
                    map.setCenter(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
                    map.setZoom(16);
                }

                scrolls.near.setWrapperTranslate(0,100,0)
                scrolls.near.params.onlyExternal = true

                promotionControl.UpdatePlist();
                promotionControl.ReloadNear();
                scrolls.near.setWrapperTranslate(0, 0, 0)
                scrolls.near.params.onlyExternal = false;
                holdPosition = 0;
            }
        }
    });
    scrolls.bestbuy = $(".bestbuyScroll").swiper({
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true
    });
    scrolls.search = $(".searchScroll").swiper({
        speed: 0,
        mode: 'vertical',
        slidesPerView: 'auto',
        scrollContainer: true,
        onResistanceAfter: function (s, pos) {
            if (pos > threshHold) {
                if (promotionView.currentSlide[5] + promotionView.slShow / 2 * 3 < promotionView.searchresult.length) {
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
            if (pos > threshHold) {
                if (promotionView.currentSlide[5] > 0) {
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
            var len = promotionView.searchresult.length;
            var me = scrolls.search;
            var pos = me.positions;
            if (holdPosition > threshHold) {   //after
                var odd = len - (promotionView.currentSlide[5] + promotionView.slShow / 2 * 3);
                if (odd <= 0) {
                    return;
                }
                $(".searchScroll .swiper-wrapper").empty();
                promotionView.currentSlide[5] += promotionView.slShow;
                var d;
                if (promotionView.slShow > odd) {
                    d = odd;
                } else {
                    d = promotionView.slShow;
                }
                for (var i = 0; i < d + promotionView.slShow / 2; i++) {
                    $(".searchScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(
                        promotionView.searchresult[promotionView.currentSlide[5] + i], -1));
                }

                me.reInit();
                me.ChangeWrapperTranslate(pos.current + (promotionView.slShow * promotionView.slideSize - 10));
            }
            if (holdPosition < -threshHold) {  //before
                var odd = len - (promotionView.currentSlide[5] + promotionView.slShow / 2);
                var d = 0;
                $(".searchScroll .swiper-wrapper").empty();
                promotionView.currentSlide[5] -= promotionView.slShow;
                for (d = 0; d <= promotionView.slShow / 2 * 3; d++) {
                    $(".searchScroll .swiper-wrapper").append(promotionView.PromotionItemSlide(promotionView.searchresult[promotionView.currentSlide[5] + d], -1));
                }
                me.reInit();
                me.ChangeWrapperTranslate(pos.current - (promotionView.slShow * promotionView.slideSize - 8));
            }
            holdPosition = 0;
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
        slidesPerView: 'auto',
        scrollContainer: true
    });

    
    //scrolls["promotion_nav"] = $(".p_nav_slider").swiper({
    //    mode: 'horizontal',
    //    slidesPerView: 3,
    //    centeredSlides: true,
    //    onlyExternal: true
    //});
    
    
}
$(document).ready(function () {
    InitAllScrolls();
})

