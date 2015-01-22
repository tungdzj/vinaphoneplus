

function setHeight(selector, height) {
    $(selector).css("height", height + "px");
    $(selector).css("line-height", height + "px");
}
var docHeight = $(window).height();
var docWidth = $(window).width();
var image_scale = 1.5;
var header_scale = 0.0808;
var medium_header_scale = 0.107;
var large_header_scale = 0.1;//0.2124;
var thumbnail_scale = 0.304;
var comment_input = docWidth * large_header_scale;

var sliders = new Array();
var header_height = parseInt(docWidth * header_scale);
var nav_height = header_height;
var map_canvas = (docHeight - header_height * 2) / 2;
var subMap_canvas = (docHeight - header_height) / 4 * 3;

var comment_text = docWidth - 70;
var thumbnail_size = docWidth * thumbnail_scale;
var descriptionSize = docWidth - thumbnail_size - 10 - thumbnail_size * 2 / 3;
setHeight(".footer", header_height);
//init body size

$("body").css("width", docWidth);
$("body").css("height", docHeight);
//headers
$("#map_canvas").css("height", map_canvas);
$("#location_map_canvas").css("height", subMap_canvas);
$(".page_slide").css("max-width", docWidth);
$("#info_panel").css("max-width", docWidth - 20);
setHeight(".page_header", header_height);
setHeight(".fb-share-button", header_height);
$(".m_gradient").css("height", comment_input);
$(".medium_header").css("height", docWidth * medium_header_scale);
$(".large_header").css("height", docWidth * large_header_scale);
$(".large_header").css("line-height", docWidth * large_header_scale + "px");
$(".detail_extend_content").css("height", docHeight - header_height);
$(".promotion_tab_content").css("top", header_height * 2);
$(".promotion_detail_slider").css("height", docWidth / image_scale);
var member_image_height = docWidth / image_scale;
var categories_height = docHeight - member_image_height - header_height - docWidth * large_header_scale;
var socialsize = docWidth / 7.7;
$("#social").css("height", socialsize + "px");
$("#detail_content").css("height", docHeight - header_scale * docWidth - large_header_scale * docWidth - member_image_height - socialsize + "px");
$("#detail_content").css("width", docWidth);
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
var margin_left = (docWidth  - cWidth * 3) / 4;
//init categories item
$(".category").css("width", cWidth + "px");
$(".category").css("height", cWidth + "px");
$(".category").css("margin-left", margin_left + "px");
$(".category").css("margin-top", margin_top + "px");
//promotions page

$(".promotion_content").css("height", docHeight - header_height * 2);
$("#content").css("height", docHeight - header_height - header_height);
$("#content").css("top", header_height + header_height);
//near item
$(".nearPanel").css("height", docHeight - map_canvas - header_height - header_height - 14);
$(".locationSize").css("height", docHeight - subMap_canvas - header_height - 14);

//menu
$("#menu_panel").css("height", docHeight);

//login popup
/**$("#login_dialog").css("min-width", docWidth / 4 * 3);
$("#login_dialog").css("min-height", docWidth / 4 * 3 * 1.5);
if (docWidth < 500) {
    $("#login_dialog").css("max-width", docWidth * 9 / 10);
} else {
    $("#login_dialog").css("max-width", docWidth * 3 / 4);
}

/*$("#login_dialog").enhanceWithin().popup( 
    {
        positionTo: 'window',
        dismissible: false
    });*/
$(".rate_pic_size").css("width", docWidth / 7);
$("#rate_dialog").enhanceWithin().popup();
$("#info_dialog").enhanceWithin().popup();
$("#userinfo_dialog").enhanceWithin().popup();

//menu panel
$("#menu_panel").panel({ animate: true, dismissible: true, display: "overlay" });

function getCategoryWidth() {
    var minMargin = 10;
    var a = (docWidth - minMargin * 3) / 3;
    var b = (categories_height - minMargin * 3) / 2;
    if (a > b) {
        return b;
    }
    return a;
}

setHeight(".btn", docWidth / 8);
$(".btn").css("width", docWidth / 3);

$(".disableText").textinput('disable');
//comment page
$("#comment_input").css("height", docWidth / 4 + "px");
//alert($("#comment_input").height())
//Scroll Containers
