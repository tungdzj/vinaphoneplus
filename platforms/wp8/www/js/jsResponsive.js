

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

$("#userinfo_dialog").enhanceWithin().popup();

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
var hideSearchSize = docHeight / 3 * 2;
var search_panel_size = $("#search_panel").height() + docHeight / 20 * 3;
$("#search_panel").css("top", -hideSearchSize);

var isOpenSearchPanel = false;

function OpenSearchPanel(tab) {
    if (isOpenSearchPanel) {
        return;
    }
    if (tab) {
        if (!loggedIn) {
            $("#popup_warning_text").html("BẠN CẦN ĐĂNG NHẬP<br /> ĐỂ KÍCH HOẠT GÓI CƯỚC.");
            user.HideAllPopupTab();
            ui.Show("#login_popup1")
            ui.ChangePage("login_dialog");
            return;
        } else {
            $("#search_tab").addClass('hidden');
            $("#active_tab").removeClass('hidden');
            search_panel_size = $("#active_tab").height() + docHeight / 20 * 3;
            if (endUser != null) {
                $("#txt_active_phone").val(endUser.phone);
            }
        }        
    } else {
        $("#search_tab").removeClass('hidden');
        $("#active_tab").addClass('hidden');
        search_panel_size = $("#search_tab").height() + docHeight / 20 * 3;
    }

    $("#background").removeClass('hidden');
    
    $("#search_panel").css("height", search_panel_size - docHeight / 10);
    $("#search_panel").css("top", -hideSearchSize);
    isOpenSearchPanel = true;
    $("#search_panel").animate(
        {
            top:0
        },
        400,
        "linear",
        function () {//complete
        })
}

function CloseSearchPanel() {
    if (!isOpenSearchPanel) {
        return;
    }
    $("#background").addClass('hidden');
    isOpenSearchPanel = false;
    $("#search_panel").animate(
        {
            top: -hideSearchSize
        },
        400,
        "linear",
        function () {//complete
        })
}
var area = { "0": { "id": "1", "areaName": "To\u00e0n qu\u1ed1c", "description": null }, "1": { "id": "2", "areaName": "An Giang", "description": null }, "2": { "id": "3", "areaName": "B\u00e0 R\u1ecba-V\u0169ng T\u00e0u", "description": null }, "3": { "id": "4", "areaName": "B\u1ea1c Li\u00eau", "description": null }, "4": { "id": "5", "areaName": "B\u1eafc K\u1ea1n", "description": null }, "5": { "id": "6", "areaName": "B\u1eafc Giang", "description": null }, "6": { "id": "7", "areaName": "B\u1eafc Ninh", "description": null }, "7": { "id": "8", "areaName": "B\u1ebfn Tre", "description": null }, "8": { "id": "9", "areaName": "B\u00ecnh D\u01b0\u01a1ng", "description": null }, "9": { "id": "10", "areaName": "B\u00ecnh \u0110\u1ecbnh", "description": null }, "10": { "id": "11", "areaName": "B\u00ecnh Ph\u01b0\u1edbc", "description": null }, "11": { "id": "12", "areaName": "B\u00ecnh Thu\u1eadn", "description": null }, "12": { "id": "13", "areaName": "C\u00e0 Mau", "description": null }, "13": { "id": "14", "areaName": "Cao B\u1eb1ng", "description": null }, "14": { "id": "15", "areaName": "C\u1ea7n Th\u01a1 (TP)", "description": null }, "15": { "id": "16", "areaName": "\u0110\u00e0 N\u1eb5ng (TP)", "description": null }, "16": { "id": "17", "areaName": "\u0110\u1eafk L\u1eafk", "description": null }, "17": { "id": "18", "areaName": "\u0110\u1eafk N\u00f4ng", "description": null }, "18": { "id": "19", "areaName": "\u0110i\u1ec7n Bi\u00ean", "description": null }, "19": { "id": "20", "areaName": "\u0110\u1ed3ng Nai", "description": null }, "20": { "id": "21", "areaName": "\u0110\u1ed3ng Th\u00e1p", "description": null }, "21": { "id": "22", "areaName": "Gia Lai", "description": null }, "22": { "id": "23", "areaName": "H\u00e0 Giang", "description": null }, "23": { "id": "24", "areaName": "H\u00e0 Nam", "description": null }, "24": { "id": "25", "areaName": "H\u00e0 N\u1ed9i (TP)", "description": null }, "25": { "id": "26", "areaName": "H\u00e0 T\u00e2y", "description": null }, "26": { "id": "27", "areaName": "H\u00e0 T\u0129nh", "description": null }, "27": { "id": "28", "areaName": "H\u1ea3i D\u01b0\u01a1ng", "description": null }, "28": { "id": "29", "areaName": "H\u1ea3i Ph\u00f2ng (TP)", "description": null }, "29": { "id": "30", "areaName": "H\u00f2a B\u00ecnh", "description": null }, "30": { "id": "31", "areaName": "H\u1ed3 Ch\u00ed Minh (TP)", "description": null }, "31": { "id": "32", "areaName": "H\u1eadu Giang", "description": null }, "32": { "id": "33", "areaName": "H\u01b0ng Y\u00ean", "description": null }, "33": { "id": "34", "areaName": "Kh\u00e1nh H\u00f2a", "description": null }, "34": { "id": "35", "areaName": "Ki\u00ean Giang", "description": null }, "35": { "id": "36", "areaName": "Kon Tum", "description": null }, "36": { "id": "37", "areaName": "Lai Ch\u00e2u", "description": null }, "37": { "id": "38", "areaName": "L\u00e0o Cai", "description": null }, "38": { "id": "39", "areaName": "L\u1ea1ng S\u01a1n", "description": null }, "39": { "id": "40", "areaName": "L\u00e2m \u0110\u1ed3ng", "description": null }, "40": { "id": "41", "areaName": "Long An", "description": null }, "41": { "id": "42", "areaName": "Nam \u0110\u1ecbnh", "description": null }, "42": { "id": "43", "areaName": "Ngh\u1ec7 An", "description": null }, "43": { "id": "44", "areaName": "Ninh B\u00ecnh", "description": null }, "44": { "id": "45", "areaName": "Ninh Thu\u1eadn", "description": null }, "45": { "id": "46", "areaName": "Ph\u00fa Th\u1ecd", "description": null }, "46": { "id": "47", "areaName": "Ph\u00fa Y\u00ean", "description": null }, "47": { "id": "48", "areaName": "Qu\u1ea3ng B\u00ecnh", "description": null }, "48": { "id": "49", "areaName": "Qu\u1ea3ng Nam", "description": null }, "49": { "id": "50", "areaName": "Qu\u1ea3ng Ng\u00e3i", "description": null }, "50": { "id": "51", "areaName": "Qu\u1ea3ng Ninh", "description": null }, "51": { "id": "52", "areaName": "Qu\u1ea3ng Tr\u1ecb", "description": null }, "52": { "id": "53", "areaName": "S\u00f3c Tr\u0103ng", "description": null }, "53": { "id": "54", "areaName": "S\u01a1n La", "description": null }, "54": { "id": "55", "areaName": "T\u00e2y Ninh", "description": null }, "55": { "id": "56", "areaName": "Th\u00e1i B\u00ecnh", "description": null }, "56": { "id": "57", "areaName": "Th\u00e1i Nguy\u00ean", "description": null }, "57": { "id": "58", "areaName": "Thanh H\u00f3a", "description": null }, "58": { "id": "59", "areaName": "Th\u1eeba Thi\u00ean - Hu\u1ebf", "description": null }, "59": { "id": "60", "areaName": "Ti\u1ec1n Giang", "description": null }, "60": { "id": "61", "areaName": "Tr\u00e0 Vinh", "description": null }, "61": { "id": "62", "areaName": "Tuy\u00ean Quang", "description": null }, "62": { "id": "63", "areaName": "V\u0129nh Long", "description": null }, "63": { "id": "64", "areaName": "V\u0129nh Ph\u00fac", "description": null }, "64": { "id": "65", "areaName": "Y\u00ean B\u00e1i", "description": null } };
var search_scroll;
function initAreaList() {
    /*for (var i in area) {
        $(".search_range .swiper-wrapper").append('<div class="swiper-slide" onclick="sPage.onRangeItemClick(' + i + ')">' + area[i].areaName + '</div>')
    }*/
    for (var i in area) {
        area[i]['tag'] = change_alias(area[i].areaName);
    }
    $(".search_range").css('height', docHeight / 3 * 2 + 'px');
    $(".search_range").css('width', docWidth / 5 * 4 + 'px');
    search_scroll = $(".search_range").swiper({
        mode: 'vertical',
        scrollContainer: true,
        slidesPerView: 'auto',
    });
    /*
    //init suggest list
    var suggest = ['lẩu', 'nướng', 'cá', 'chim', 'buffet', 'fashion', 'canifa'];
    for (var i = 0; i < suggest.length; i++) {
        $("#suggest").append('<li onclick="sPage.onSuggestItemClick(this.innerText)">' + suggest[i] + '</li>');
    }
    $("#suggest").enhanceWithin().listview();*/
}

