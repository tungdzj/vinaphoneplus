var deviceLocation = null;
var defaultLocation = [21.027821, 105.852290];
var pushNotification;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        pictureSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
        destinationType = navigator.camera.DestinationType;
        var _uuid = window.localStorage.getItem("uuid");
        if (_uuid == null || _uuid == '') {
            _uuid = device.uuid;
            window.localStorage.setItem('uuid', device.uuid);
            userControl.uuid = device.uuid;
        } else {
            userControl.uuid = _uuid;
        }
        userControl.uuid = device.uuid;
        if (device.platform == "iOS") {
            StatusBar.hide();
        }
        var notify = window.localStorage.getItem("notification");
        if (notify == null) {
            pushNotification = window.plugins.pushNotification;
            register();
        }
        app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(function (position) {
            deviceLocation = [position.coords.latitude, position.coords.longitude];
            onGetDeviceLocation();
        },
        function (error) {
            ui.Alert("Không thể xác định vị trí của bạn. Có thể do bạn đã tắt chức năng định vị.", "Thông báo", function () { });
        });
        setTimeout(updateDeviceLocation, 5000);
        //onDocumentReady();
        if (window.localStorage.getItem('phoneNumber') != null &&
            window.localStorage.getItem('phoneNumber') != "none") {
            userControl.userPhoneNumber = window.localStorage.getItem('phoneNumber');
            userControl.CheckLogin(function (data) {
                if (data.data == "3") {
                    userControl.UserLoginSuccess(data.token);
                } else {
                    userControl.loggedIn = false;
                    userControl.userPhoneNumber = "none";
                    userView.UpdateLoginStatus();
                    window.localStorage.clear();
                }
            });
        } else {
            $("#moreani4").addClass('hidden');
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

function updateDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            deviceLocation = [position.coords.latitude, position.coords.longitude];
            onUpdateDeviceLocation();
            setTimeout(updateDeviceLocation, 10000);
            return;
        },
        function (error) {
            setTimeout(updateDeviceLocation, 10000);
            return;
            //ui.Alert("Không thể xác định vị trí của bạn. Có thể do bạn đã tắt chức năng định vị.", "Lỗi định vị", function () { });
        });
}
function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        utils.HideLoading();
        d = new Date();
        $("#avatar_img").attr("src", userControl.endUser.avatar + "?" + d.getTime());
        $("#avatar_img1").attr("src", userControl.endUser.avatar + "?" + d.getTime());
    }

    var fail = function (error) {
        if (retries == 0) {
            retries++
            setTimeout(function () {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
        }
    }
    utils.ShowLoading();
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer()
    ft.upload(fileURI, encodeURI("http://viplus.vinaphone.com.vn/?json=neon/uploadAvatar&avatar=" + userControl.endUser.phone + ".jpg&token=" + userControl.token), win, fail, options);
}

function capturePhoto(type) {
    if (type) {
        pictureSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    } else {
        pictureSource = navigator.camera.PictureSourceType.CAMERA;
    }
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 45,
        allowEdit: true,
        targetWidth: docWidth,
        targetHeight: docWidth,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        sourceType: pictureSource
    });
}

function onFail(message) {
}

function register() {
    if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos") {
        pushNotification.register(
        successHandler,
        errorHandler,
        {
            "senderID": "550958173296",
            "ecb": "onNotification"
        });
    } else if (device.platform == 'blackberry10') {
        pushNotification.register(
        successHandler,
        errorHandler,
        {
            invokeTargetId: "replace_with_invoke_target_id",
            appId: "replace_with_app_id",
            ppgUrl: "replace_with_ppg_url", //remove for BES pushes
            ecb: "pushNotificationHandler",
            simChangeCallback: replace_with_simChange_callback,
            pushTransportReadyCallback: replace_with_pushTransportReady_callback,
            launchApplicationOnPush: true
        });
    } else if (device.platform == "iOS"){
        pushNotification.register(
        tokenHandler,
        errorHandler,
        {
            "badge": "true",
            "sound": "true",
            "alert": "true",
            "ecb": "onNotificationAPN"
        });
    }
}
function onNotificationAPN(event) {
    if (event.alert) {
        mypush.init(event.alert, event.title, event.options);
        mypush.applyPush();
        //navigator.notification.alert(event.alert);
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}
//iOS
function tokenHandler(result) {
    var r = "http://viplus.vinaphone.com.vn/?json=neon/RegisterDevice&AppID=com.PushVu&DeviceType=IOS&RegID=" + result + "&uuid=" + userControl.uuid;
    console.log(r);
    $.ajax({
        url: r,
        crossDomain: true,
        //dataType: 'jsonp', async: false,
        success: function (data, textStatus, jqXHR) {
            if (data.status == "ok") {
                window.localStorage.setItem("notification", "ok");
            } else {
                //alert("failed:" + data.msg);
            }
        },
        error: function (responseData, textStatus, errorThrown) {
            client.CheckInternet();
        }
    });
}

function successHandler(result) {
    //alert("success");
}

function errorHandler(error) {
    //alert('error = ' + error);
}
function onNotification(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                var r = "http://viplus.vinaphone.com.vn/?json=neon/RegisterDevice&AppID=com.PushVu&DeviceType=AND&RegID=" + e.regid + "&uuid=" + userControl.uuid;
                $.ajax({
                    url: r,
                    crossDomain: true,
                    //dataType: 'jsonp', async: false,
                    success: function (data, textStatus, jqXHR) {
                        if (data.status == "ok") {
                            window.localStorage.setItem("notification", "ok");
                        } else {
                            //alert("failed:" + data.msg);
                        }
                    },
                    error: function (responseData, textStatus, errorThrown) {
                        client.CheckInternet();
                    }
                });
            }
            break;

        case 'message':
            mypush.init(e.payload.message, e.payload.title, e.payload.options);
            mypush.applyPush();
            break;

        case 'error':
            //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

var mypush = {
    message: '',
    title: '',
    path: '',
    applyPush: function () {
        if (store.promotions.length == 0 || mypush.message == '') {
            return;
        }
        utils.Confirm1(mypush.message, mypush.title, function () {
            var t = mypush.path.split('-');
            var category = t[0];
            var id = t[1];
            homeControl.OnCategoryClick(category);
            promotionControl.OnPromotionClick(id, -1, -1);
        },
        function () { },
        'Xem',
        'Bỏ qua'
        );


    },

    init: function (_message, _title, _path) {
        mypush.message = _message;
        mypush.title = _title;
        mypush.path = _path;
    }
}