

function setHeight(selector, height) {
    $(selector).css("height", height + "px");
    $(selector).css("line-height", height + "px");
}
var docHeight = $(window).height();
var docWidth = $(window).width();
var image_scale = 1.5;
var header_scale = 0.1;
var medium_header_scale = 0.107;
var large_header_scale = 0.1;//0.2124;
var thumbnail_scale = 0.29;
var comment_input = parseInt(docWidth * large_header_scale);

var sliders = new Array();
var header_height = parseInt(docWidth * header_scale);
var nav_height = header_height;
var footer_height = $(".footer").height();
var map_canvas = (docHeight - header_height * 2) / 2;
var subMap_canvas = (docHeight - header_height) / 4 * 3;

var comment_text = docWidth - 70;
var thumbnail_size = Math.round(docWidth * thumbnail_scale);
var descriptionSize = Math.round(docWidth - thumbnail_size - 10 - thumbnail_size * 2 / 3);
//setHeight(".footer", footer_height);
//init body size

$("body").css("width", docWidth);
$("body").css("height", docHeight);


//headers
$(".sk-spinner").css('height', docWidth / 5);
$(".sk-spinner").css('width', docWidth / 5);
$(".sk-spinner").css('margin-left', docWidth / 5 * 2);
$(".moredata").css("width", docWidth);
$("#help_content").css("height", docHeight - header_height - 20);
$("#help_content").css("width", docWidth - 20);
$("#map_canvas").css("height", map_canvas);
$("#location_map_canvas").css("height", subMap_canvas);
$(".page_slide").css("max-width", docWidth);
$("#info_panel").css("max-width", docWidth - 20);
setHeight(".page_header", header_height);
setHeight(".fb-share-button", header_height);
$(".m_gradient").css("height", comment_input);
$(".medium_header").css("height", docWidth * medium_header_scale);
$(".large_header").css("height", comment_input);
$(".large_header").css("line-height", comment_input + "px");
$(".detail_extend_content").css("height", docHeight - header_height);
$(".promotion_tab_content").css("top", header_height * 2);
$(".promotion_detail_slider").css("height", docWidth / image_scale);
var member_image_height = parseInt(docWidth / image_scale);
var categories_height = docHeight - member_image_height - footer_height - comment_input / 2 * 5;
$(".addbar").css('height', comment_input);
$(".gradient_bot").css('height', comment_input / 2);
var socialsize = docWidth / 7.7;
$("#social").css("height", socialsize + "px");
$("#detail_content").css("height", docHeight - footer_height - comment_input - member_image_height - socialsize + "px");
///$("#detail_content").css("width", docWidth);
$(".member_image_slider").css("height", member_image_height);
$(".slide").css("height", member_image_height);
$(".comments").css("height", docHeight - docWidth / 4 - 10);


$(".menu_item").css("height", docWidth / 7 + "px");
$(".menu_item").css("line-height", docWidth / 7 + "px");
$("#menu_panel li img").css("height", docWidth / 14 + "px");
$("#menu_panel li img").css("margin-top", docWidth / 28 + "px");

$("#info_dialog").css("width", docWidth / 4 * 3 + "px");
$(".large_slider img").css('width', docWidth);
//$("#comment_input").css("height", comment_input);
$(".promotion_page_slider").css("height", docHeight - header_height * 2);
$(".promotion_page_slider").css("width", docWidth);
$(".slider_wrapper").css("height", docHeight - header_height * 2);
$(".slider_wrapper").css("margin-top", header_height * 2);
$(".slider_wrapper").css("width", docWidth);
$(".detail_extend_slider").css("height", docHeight - header_height);
$(".detail_extend_slider").css("width", docWidth);
var cWidth = getCategoryWidth();
var margin_top = (categories_height - cWidth * 2) / 3;
var margin_left = (docWidth  - (cWidth + 2) * 3) / 4;
//init categories item
$(".category").css("width", cWidth + "px");
$(".category").css("height", cWidth + "px");
$(".category").css("margin-left", margin_left + "px");
$(".category").css("margin-top", margin_top + "px");
//promotions page
$(".p_nav_slider .swiper-wrapper .swiper-slide").css('width', Math.round(docWidth / 5 * 3))
$(".promotion_content").css("height", docHeight - header_height * 2);
$("#content").css("height", docHeight - header_height - header_height);
$("#content").css("top", header_height + header_height);
//near item
$(".nearPanel").css("height", docHeight - map_canvas - header_height - header_height - 14);
$(".locationSize").css("height", docHeight - subMap_canvas - header_height - 14);

//menu
$("#menu_panel").css("height", docHeight);
$(".pItem").css("height", thumbnail_size + 10 + "px");
$(".rate_pic_size").css("width", docWidth / 7);
$("#rate_dialog").enhanceWithin().popup();
$("#info_dialog").enhanceWithin().popup();
$("#qr_dialog").enhanceWithin().popup();
$("#card_dialog").enhanceWithin().popup();

$("#userinfo_dialog").enhanceWithin().popup();
$(".card").css('width', docWidth / 5 * 4);
$(".card").css('height', docWidth / 15 * 8 );
//menu panel
$("#menu_panel").panel(
    {
        animate: true,
        dismissible: true,
        display: "overlay",
        swipeClose: true
    });

function getCategoryWidth() {
    var minMargin = 10;
    var a = (docWidth - minMargin * 3) / 3;
    var b = (categories_height - minMargin * 3) / 2;
    if (a > b) {
        return Math.round(b - 2);
    }
    return Math.round(a - 2);
}
setHeight(".btn", docWidth / 8);
$(".btn").css("width", docWidth / 3);

$(".disableText").textinput('disable');
//comment page
$("#comment_input").css("height", docWidth / 4 + "px");

$("#qrcode").css("width", docWidth / 3 * 2 + "px");
$("#qrcode").css("height", docWidth / 3 * 2 + "px");
var help_scroll = $("#help_content").swiper({
    mode: 'vertical',
    scrollContainer: true
});
var isOpenSearchPanel = false;
var slideAdded = 0;
function OpenSearchPanel(tab) {
    if (isOpenSearchPanel) {
        return;
    }
    if (tab == 1) {
        if (!loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ KÍCH HOẠT GÓI CƯỚC.");
            user.HideAllPopupTab();
            ui.Show("#login_popup1")
            ui.ChangePage("login_dialog");
            return;
        } else {
            $("#search_tab").addClass('hidden');
            $("#active_tab").removeClass('hidden');
            $("#order_tab").addClass('hidden');
            //search_panel_size = $("#active_tab").height() + docHeight / 20 * 3;
            if (endUser != null) {
                $("#txt_active_phone").val(endUser.phone);
            }
        }        
    } else if (tab == 2) {
        if (!loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ KÍCH HOẠT GÓI CƯỚC.");
            user.HideAllPopupTab();
            ui.Show("#login_popup1")
            ui.ChangePage("login_dialog");
            return;
        } else {
            $("#search_tab").addClass('hidden');
            $("#active_tab").addClass('hidden');
            $("#order_tab").removeClass('hidden');
            //search_panel_size = $("#active_tab").height() + docHeight / 20 * 3;
            $("#inf_txthoten1").html(endUser.userName);
            console.log(endUser.name);
            $("#inf_txtemail1").html(endUser.email);
            $("#inf_txtaddress1").html(endUser.address);
        }
    } else {
        slideAdded = 0;
        $("#search_tab").removeClass('hidden');
        $("#active_tab").addClass('hidden');
        $("#order_tab").addClass('hidden');
        search_panel_size = $("#search_tab").height() + docHeight / 20 * 3;
        if (promotion_slider.activeIndex == 5 &&
        scrolls[11].slides.length < 2) {
            for (slideAdded = 0; slideAdded < 6; slideAdded++) {
                if (slideAdded >= scrolls[2].slides.length) {
                    break;
                }
                scrolls[11].prependSlide(scrolls[2].slides[slideAdded].html());
            }
        }
    }

    $("#background").removeClass('hidden');
    
    $("#search_panel").removeClass('hidden');
    isOpenSearchPanel = true;
    $("#search_panel").css('opacity', 0);
    $("#search_panel").animate(
        {
            opacity:1
        },
        400,
        "linear",
        function () {//complete
            $("#search_panel").css('opacity', 1);
        })
}

function CloseSearchPanel() {
    if (!isOpenSearchPanel) {
        return;
    }
    isOpenSearchPanel = false;
    $("#search_panel").css('opacity', 1);
    $("#search_panel").animate(
        {
            opacity:0
        },
        400,
        "linear",
        function () {//complete
            $("#background").addClass('hidden');
            $("#search_panel").addClass('hidden');
        })
}

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/đ/g, "d");
    //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    //str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    //str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    return str;
}
var area = [{"id":"1","areaName":"To\u00e0n qu\u1ed1c","description":null},{"id":"2","areaName":"An Giang","description":null},{"id":"3","areaName":"B\u00e0 R\u1ecba-V\u0169ng T\u00e0u","description":null},{"id":"4","areaName":"B\u1ea1c Li\u00eau","description":null},{"id":"5","areaName":"B\u1eafc K\u1ea1n","description":null},{"id":"6","areaName":"B\u1eafc Giang","description":null},{"id":"7","areaName":"B\u1eafc Ninh","description":null},{"id":"8","areaName":"B\u1ebfn Tre","description":null},{"id":"9","areaName":"B\u00ecnh D\u01b0\u01a1ng","description":null},{"id":"10","areaName":"B\u00ecnh \u0110\u1ecbnh","description":null},{"id":"11","areaName":"B\u00ecnh Ph\u01b0\u1edbc","description":null},{"id":"12","areaName":"B\u00ecnh Thu\u1eadn","description":null},{"id":"13","areaName":"C\u00e0 Mau","description":null},{"id":"14","areaName":"Cao B\u1eb1ng","description":null},{"id":"15","areaName":"C\u1ea7n Th\u01a1","description":null},{"id":"16","areaName":"\u0110\u00e0 N\u1eb5ng","description":null},{"id":"17","areaName":"\u0110\u1eafk L\u1eafk","description":null},{"id":"18","areaName":"\u0110\u1eafk N\u00f4ng","description":null},{"id":"19","areaName":"\u0110i\u1ec7n Bi\u00ean","description":null},{"id":"20","areaName":"\u0110\u1ed3ng Nai","description":null},{"id":"21","areaName":"\u0110\u1ed3ng Th\u00e1p","description":null},{"id":"22","areaName":"Gia Lai","description":null},{"id":"23","areaName":"H\u00e0 Giang","description":null},{"id":"24","areaName":"H\u00e0 Nam","description":null},{"id":"25","areaName":"H\u00e0 N\u1ed9i","description":null},{"id":"27","areaName":"H\u00e0 T\u0129nh","description":null},{"id":"28","areaName":"H\u1ea3i D\u01b0\u01a1ng","description":null},{"id":"29","areaName":"H\u1ea3i Ph\u00f2ng","description":null},{"id":"30","areaName":"H\u00f2a B\u00ecnh","description":null},{"id":"31","areaName":"H\u1ed3 Ch\u00ed Minh","description":null},{"id":"32","areaName":"H\u1eadu Giang","description":null},{"id":"33","areaName":"H\u01b0ng Y\u00ean","description":null},{"id":"34","areaName":"Kh\u00e1nh H\u00f2a","description":null},{"id":"35","areaName":"Ki\u00ean Giang","description":null},{"id":"36","areaName":"Kon Tum","description":null},{"id":"37","areaName":"Lai Ch\u00e2u","description":null},{"id":"38","areaName":"L\u00e0o Cai","description":null},{"id":"39","areaName":"L\u1ea1ng S\u01a1n","description":null},{"id":"40","areaName":"L\u00e2m \u0110\u1ed3ng","description":null},{"id":"41","areaName":"Long An","description":null},{"id":"42","areaName":"Nam \u0110\u1ecbnh","description":null},{"id":"43","areaName":"Ngh\u1ec7 An","description":null},{"id":"44","areaName":"Ninh B\u00ecnh","description":null},{"id":"45","areaName":"Ninh Thu\u1eadn","description":null},{"id":"46","areaName":"Ph\u00fa Th\u1ecd","description":null},{"id":"47","areaName":"Ph\u00fa Y\u00ean","description":null},{"id":"48","areaName":"Qu\u1ea3ng B\u00ecnh","description":null},{"id":"49","areaName":"Qu\u1ea3ng Nam","description":null},{"id":"50","areaName":"Qu\u1ea3ng Ng\u00e3i","description":null},{"id":"51","areaName":"Qu\u1ea3ng Ninh","description":null},{"id":"52","areaName":"Qu\u1ea3ng Tr\u1ecb","description":null},{"id":"53","areaName":"S\u00f3c Tr\u0103ng","description":null},{"id":"54","areaName":"S\u01a1n La","description":null},{"id":"55","areaName":"T\u00e2y Ninh","description":null},{"id":"56","areaName":"Th\u00e1i B\u00ecnh","description":null},{"id":"57","areaName":"Th\u00e1i Nguy\u00ean","description":null},{"id":"58","areaName":"Thanh H\u00f3a","description":null},{"id":"59","areaName":"Th\u1eeba Thi\u00ean - Hu\u1ebf","description":null},{"id":"60","areaName":"Ti\u1ec1n Giang","description":null},{"id":"61","areaName":"Tr\u00e0 Vinh","description":null},{"id":"62","areaName":"Tuy\u00ean Quang","description":null},{"id":"63","areaName":"V\u0129nh Long","description":null},{"id":"64","areaName":"V\u0129nh Ph\u00fac","description":null},{"id":"65","areaName":"Y\u00ean B\u00e1i","description":null}];
var search_scroll;
function initAreaList() {
    for (var i in area) {
        area[i]['tag'] = change_alias(area[i].areaName);
    }
    $(".suggest_range").css('height', docHeight / 3 * 2 + 'px');
    $(".suggest_range").css('width', docWidth / 5 * 4 + 'px');
}


initAreaList();

$(function () {
    FastClick.attach(document.body);
});