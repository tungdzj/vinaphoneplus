﻿var currentDesMarker = null;
var currentMarker = null;
var map = null;
var subMap = null;
var hereMarker = null;
var directionsDisplay;

var directionsService;
function initMap() {
    directionsService = new google.maps.DirectionsService();
    var mapOptions = {
        zoom: 16,
        center: { lat: 19.095489, lng: 102.883808 },
        mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        }, // here´s the array of controls
        //disableDefaultUI: true, // a way to quickly hide all controls
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE 
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
    subMap = new google.maps.Map(document.getElementById('location_map_canvas'),
        mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();
    //create event
    onMapReady();
}
if (typeof(google) != "undefined") {
    google.maps.event.addDomListener(window, 'load', initMap);
}


function clearRoute() {
    directionsDisplay.setMap(null);
}

function calcRoute() {
    if (hereMarker == null || currentDesMarker == null) {
        return;
    }
    var start = hereMarker.position;
    var end = currentDesMarker.position;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsDisplay.setMap(null);
    if (pageManager.currentPage == "promotions_page") {
        directionsDisplay.setMap(map);
    } else {
        directionsDisplay.setMap(subMap);
    }
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    
}

function geoSetDeviceMarker() {
    if (map == null) {
        return;
    }
    if (deviceLocation == null) {
        map.setCenter(new google.maps.LatLng(defaultLocation[0], defaultLocation[1]));
    }
    else {
        map.setCenter(new google.maps.LatLng(deviceLocation[0], deviceLocation[1]));
        geoAddHereMarker();
    }
}
function MapMarker(_latlong) {
    var pos = _latlong.split("/");
    var latlng = new google.maps.LatLng(parseFloat(pos[0]), parseFloat(pos[1]));
    this.Marker = new google.maps.Marker({
        position: latlng
    });
    this.Title = "";
}
var map_marker = new Array();
var category_markers = new Array();
for (var i = 1; i <= 6; i++) {
    category_markers[i + ""] = new Array();
}

function geoProcessShopLocation() {
    if (store.shops.length == 0 || map == null)
    {
        return;
    }
    for (var s in store.shops) {
        map_marker[s] = new MapMarker(store.shops[s].LatLong);
    }
}

var infowindow;

function geoAddEventClick(p, s) {
    infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });
    if (store.partners[store.shops[s].PartnerId] == null) {
        return;
    }
    var contentString = '<div id="content" class="bodyContent font_size_12">' +
                      '<div id="siteNotice"><b>' + store.partners[store.shops[s].PartnerId].PartnerName +
                      '</b></div>' +
                      '<div class="bodyContent" class="font_size_12"><div style="color:blue;" onclick="promotionControl.OnPromotionClick(' + p + ', -1, -1)">' + store.promotions[p].Title + '</div><b>Phone:</b> ' + store.partners[store.shops[s].PartnerId].Phone + '<br><b>Website:</b> <a href="#" onclick=\'utils.OpenLink("' + store.partners[store.shops[s].PartnerId].Website + '")\'>Tại đây</a>&nbsp;&nbsp;&nbsp;&nbsp;' + '<b>Chỉ đường:</b><a href="#" onclick="calcRoute()">Tại đây</a>' +
                      '</div>' +
                      '</div>';
    map_marker[s].Marker.html = contentString;
    google.maps.event.addListener(map_marker[s].Marker, 'click',
        function () {
            infowindow.close();
            infowindow.setContent(this.html);
            currentDesMarker = this;
            if (pageManager.currentPage == "promotions_page") {
                infowindow.open(map, this);
            } else {
                infowindow.open(subMap, this);
            }
        });
}

function geoAddShopTitle() {
    if (store.shops.length == 0 || store.partners.length == 0 || map == null || store.promotions.length == 0) {
        return;
    }
    for (var pr in store.promotions) {
        if (store.promotions[pr].ListShop.length == 0) {
            for (var s in store.shops) {
                if (store.shops[s].PartnerId == store.promotions[pr].PartnerId) {
                    geoAddEventClick(pr, s);
                }
            }
        } else {
            for (var i = 0; i < store.promotions[pr].ListShop.length; i++) {
                s = store.promotions[pr].ListShop[i];
                geoAddEventClick(pr, s);
            }
        }
    }
}

function geoAddMarker(_old, _new) {
    if (map_marker.length == 0) {
        return;
    }
    if (map == null) {
        return;
    }
    //if (_marker_old != -1) {    //clear all old marker
    //    for (var i = 0; i < store.categories[_marker_old].length; i++) {
    //        map_marker[store.categories[_marker_old][i]].Marker.setMap(null);
    //    }
    //}
    for (var s in store.shops) {
        if (map_marker[s].Marker != null) {
            map_marker[s].Marker.setMap(null);
        }
    }
    for (var i = 0; i < store.categories[_new].length; i++) {
        map_marker[store.categories[_new][i]].Marker.setMap(map);
    }
}

function geoAddHereMarker() {
    if (deviceLocation == null) {
        deviceLocation = defaultLocation;
        //return;
    }
    var image = 'img/here.png';
    var latlng = new google.maps.LatLng(deviceLocation[0], deviceLocation[1]);
    hereMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "you are here",
        icon: image
    });
    hereMarker.setMap(subMap);
}

function updateHereMarker() {
    //remove marker
    if (hereMarker != null) {
        hereMarker.setMap(null);
    }
    if (deviceLocation == null) {
        deviceLocation = defaultLocation;
    }
    var image = 'img/here.png';
    var latlng = new google.maps.LatLng(deviceLocation[0], deviceLocation[1]);
    hereMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "you are here",
        icon: image
    });
    hereMarker.setMap(map);
}

function geoClearMarker(categoryId) {
    for (var i = 0; i < category_markers[categoryId].length; i++) {
        category_markers[categoryId][i].setMap(null);
    }
}

function geoAddMapMarker(_latlong, _title) {
    if ((typeof google) == "undefined") {
        return false;
    }
    var pos = _latlong.split("/");
    var image='img/gift.png';
    var latlng = new google.maps.LatLng(parseFloat(pos[0]), parseFloat(pos[1]));
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "This is vinaphone partner store.shops"
    });
}

function geoDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist; //kilometer
}

//map utilities
function geoCalculateDistance() {
    //if not have shop list
    if (store.shops.length <= 0) {
        return;
    }
    var r = "";
    var d = defaultLocation;
    if (deviceLocation != null) {
        d = deviceLocation;
    }
    store.nearShops.length = 0;
    for (var id in store.shops) {
        var t = store.shops[id].LatLong;
        var l = t.split("/");
        var dis = geoDistance(
                    parseFloat(l[0]),
                    parseFloat(l[1]),
                    parseFloat(d[0]),
                    parseFloat(d[1]));
        store.nearShops.push(
            [
                id,
                dis,
                store.shops[id].PartnerId
            ]);
        store.shopDis[id] = dis;
    }
    
    //sort nearpromotions array
    store.nearShops.sort(function (a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    });
}

