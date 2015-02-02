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
        uuid = device.uuid;
        app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(function (position) {
            deviceLocation = [position.coords.latitude, position.coords.longitude];
            onGetDeviceLocation();
        },
        function (error) {
            ui.Alert("Không thể xác định vị trí của bạn. Có thể do bạn đã tắt chức năng định vị.", "Lỗi định vị", function () { });
        });
        setTimeout(updateDeviceLocation, 5000);
        onDocumentReady();
        if (window.localStorage.getItem('phoneNumber') != null &&
            window.localStorage.getItem('phoneNumber') != "none") {
            userPhoneNumber = window.localStorage.getItem('phoneNumber');
            user.CheckLogin(function (data) {
                if (data.data == "3") {
                    user.UserLoginSuccess(data.token);
                }else{
                    loggedIn = false;
                    userPhoneNumber = "none";
                    ui.UpdateLoginStatus(loggedIn);
                    window.localStorage.clear();
                }
            });
        } else {
            $("#moreani4").addClass('hidden');
        }

        if (device.platform == "iOS") {
            StatusBar.hide();
        } else {
            var notify = window.localStorage.getItem("notification");
            if (notify == null) {
                pushNotification = window.plugins.pushNotification;
                register();
            }
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
        ui.HideLoading();
        d = new Date();
        $("#avatar_img").attr("src", endUser.avatar + "?" + d.getTime());
        $("#avatar_img1").attr("src", endUser.avatar + "?" + d.getTime());
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
    ui.ShowLoading();
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer()
    ft.upload(fileURI, encodeURI("http://viplus.vinaphone.com.vn/?json=neon/uploadAvatar&avatar=" + endUser.phone + ".jpg&token=" + token), win, fail, options);
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
    } else {
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
                var r = "http://viplus.vinaphone.com.vn/?json=neon/RegisterDevice&AppID=com.PushVu&DeviceType=AND&RegID=" + e.regid;
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
            alert(e.payload.message);
            notifyId = 100;
            onNotification();
            /*
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                // on Android soundname is outside the payload.
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/" + soundfile);
                my_media.play();
            }
            else {  // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart) {
                    //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                }
                else {
                    //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            }

            //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            //Only works for GCM
            //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            //Only works on Amazon Fire OS
            //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');   */
            break;

        case 'error':
            //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

