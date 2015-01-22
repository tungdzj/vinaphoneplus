var MAX_REQUEST = 10;
var activeRequest = 0;
var requestQueue = new Array();

function managedGetDetail(r) {
    requestQueue.push(r);
    if (activeRequest < MAX_REQUEST) {
        sendRequest();
    }
}

function getJSON(r, func) {
    requestQueue.push({ request: r, f: func });
    if (activeRequest < MAX_REQUEST) {
        sendRequest();
    }
}

function sendRequest() {
    activeRequest++;
    var r = requestQueue.shift();
    if (r == null)
        return;
    httpReq.getJSON(r, function (status, data) {
        activeRequest--;
        onReceivedPromotionsDetail(data);
        sendRequest();
    });
}