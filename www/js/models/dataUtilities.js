//data utilities



//function utils.MatchName(a, b) {
//    a = " " + a;
//    for (var i = 1; i < a.length; i++) {
//        if (a[i - 1] == ' ') {
//            if (a[i] == b[0]) {
//                var flag = 1;
//                for (var j = 0; j < b.length; j++) {
//                    if (a[i + j] != b[j]) {
//                        flag = 0;
//                        break;
//                    }
//                }
//                if (flag == 1) {
//                    return true;
//                }
//            }
//        }
//    }
//    return false;
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
        store.plist[c][3].length = 0;
        for (var s = 0; s < categories[c].length; s++) {
            for (var p in promotions) {
                if (contains(promotions[p].ListShop, categories[c][s])) {
                    if (store.plist[c][3].length < max) {
                        store.plist[c][3].push([p, categories[c][s]]);
                    }
                }
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

