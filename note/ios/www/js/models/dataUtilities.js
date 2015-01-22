//data utilities

function utilGetDayFromString(str) {
    var d = new Date(str.replace(" ", "T"));
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
}

function addPromotionCode(id, code) {
    promotionsCode[id + ""] = code;
}
