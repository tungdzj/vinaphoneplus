//data utilities
var slShow = 8;
var slTotal = slShow * 2;
var slideSize = thumbnail_size + 17;
var currentSlide = [];
for (var i = 0; i < 5; i++) {
    currentSlide[i] = 0;
}
function utilGetDayFromString(str) {
    var d = new Date(str.replace(" ", "T"));
    
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + (d.getFullYear() + "")/*.substr(2,2)*/;
}

function addPromotionCode(id, code) {
    promotionsCode[id + ""] = code;
}

function matchName(a, b) {
    a = " " + a;
    for (var i = 1; i < a.length; i++) {
        if (a[i - 1] == ' ') {
            if (a[i] == b[0]) {
                var flag = 1;
                for (var j = 0; j < b.length; j++) {
                    if (a[i + j] != b[j]) {
                        flag = 0;
                        break;
                    }
                }
                if (flag == 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

//function change_alias(alias) {
//    var str = alias;
//    str = str.toLowerCase();
//    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//    str = str.replace(/đ/g, "d");
//    str = str.replace(/đ/g, "d");
//    //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "-");
//    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
//    //str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
//    //str = str.replace(/^\-+|\-+$/g, "");
//    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
//    return str;
//}


function updateplist() {
    //regen nearshop
    geoCalculateDistance();
    //regen categories
    for (var i = 1; i < 7; i++) {
        categories[i].length = 0;
    }
    for (var s = 0; s < nearShops.length; s++) {
        if (shops[nearShops[s][0]].CategoryId) {
            categories[shops[nearShops[s][0]].CategoryId].push(nearShops[s][0]);
        }
    }
    //nearest
    var max = 15;
    for (var c = 1; c < 7; c++) {
        plist[c][3].length = 0;
        for (var s = 0; s < categories[c].length; s++) {
            for (var p in promotions) {
                if (contains(promotions[p].ListShop, categories[c][s])) {
                    if (plist[c][3].length < max) {
                        plist[c][3].push([p, categories[c][s]]);
                    }
                }
            }
        }
    }

}

function createplist() {

    if (promotions.length == 0 ||
        shops.length == 0 ||
        partners.length == 0 ||
        bestBuy.length == 0)
    {
        return;
    }

    plist = new Array();
    for (var i = 1; i < 7; i++) {
        plist[i] = new Array();
        for (var j = 0; j < 5; j++) {
            plist[i][j] = new Array();
        }
    }
    //random promotions 0
    var ta = new Array();
    for (var i = 0; i < newPromotions.length; i++) {
        ta.push([newPromotions[i], Math.random()]);
    }
    ta.sort(function (a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    });
    for (var i = 0; i < ta.length; i++) {
        if (valid(ta[i][0])) {
            plist[shops[promotions[ta[i][0]].ListShop[0]].CategoryId][0].push([ta[i][0], -1]);
        }
    }

    //create list newest
    for (var p = 0; p < newPromotions.length; p++) {
        var s = promotions[newPromotions[p]].ListShop[0];
        var c = shops[s].CategoryId;
        //hottest
        if (promotions[newPromotions[p]].Hot == 1) {
            if (valid(newPromotions[p])) {
                plist[c][1].push([newPromotions[p], -1]);
            }
        }
        //newest
        
        if (valid(newPromotions[p])) {
            if (newPromotions[p] == 216) {
                console.log("valid:" + promotions[newPromotions[p]].Title)
            }
            plist[c][2].push([newPromotions[p], -1, change_alias(partners[promotions[newPromotions[p]].PartnerId].PartnerName + " " + partners[promotions[newPromotions[p]].PartnerId].Detail), promotions[newPromotions[p]].PartnerId]);
        }
        
    }
    //nearest
    var max = 15;
    for (var c = 1; c < 7; c++) {
        for (var s = 0; s < categories[c].length; s++) {
            for (var p in promotions) {
                if (contains(promotions[p].ListShop, categories[c][s])) {
                    if (plist[c][3].length < max) {
                        if (valid(p)) {
                            plist[c][3].push([p, categories[c][s]]);
                        }
                    }
                }
            }
        }
    }
    //bestbuy
    for (var d = 0; d < bestBuy.length; d++) {
        var p = bestBuy[d];
        var s = promotions[p].ListShop[0];
        var c = shops[s].CategoryId;
        //newest
        if (plist[c][4].length < max) {
            if (valid(p)) {
                plist[c][4].push([p, -1]);
            }
            
        }
    }
}

function valid(p) {
    if (endUser == null) {
        if (promotions[p].GroupUser.length == 0) {
            return true;
        }
    } else {
        if (promotions[p].GroupUser.length == 0) {
            return true;
        }
        for (var i = 0; i < promotions[p].GroupUser.length; i++) {
            if (endUser.groupId == promotions[p].GroupUser[i]) {
                return true;
            }
        }
    }
    return false;
}
function truncate(str, max) {
    var r = "";
    for (var i = 0; i < max; i++) {
        if (i < str.length) {
            r += str[i];
        } else {
            r += ' ';
        }
    }
    if (max < str.length) {
        r += '..';
    }
    return r;
}

function refresh(node) {
    var times = 3000; // gap in Milli Seconds;

    (function startRefresh() {
        var address;
        if (node.src.indexOf('?') > -1)
            address = node.src.split('?')[0];
        else
            address = node.src;
        node.src = address + "?time=" + new Date().getTime();

        setTimeout(startRefresh, times);
    })();
}

function genSlash(code) {
    var t = '';
    for (var i = 0; i < code.length; i++) {
        if (i == 4 ||
            i == 9) {
            t += '&nbsp;&nbsp;';
        }
        t += code[i];
    }
    return t;
}

function removeSlash(code) {
    console.log(code)
    var t = code.replace('&nbsp;&nbsp;', '');
    t = t.replace('&nbsp;&nbsp;', '');
    return t;
}