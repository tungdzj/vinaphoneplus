var pushNotification;
document.addEventListener("deviceready", function () {
    pushNotification = window.plugins.pushNotification;
    var pushed = window.localStorage.getItem('push');
    if (pushed == null) {
        push.register();
    }
});

var push = {
    register: function () {
        if (device.platform == 'android' || device.platform == 'Android'|| window.navigator.platform == 'Android' || window.navigator.platform == "amazon-fireos") {
            pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID": "56610498973",
                "ecb": "onNotification"
            });
        } else if (window.navigator.platform == 'blackberry10') {
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
        } else if (window.navigator.platform == 'Win32') {
            console.error('push notification not available for Win32 platform');
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
}

//ios
function onNotificationAPN(event) {
    if (event.badge) {
        console.error("set badge");
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}
//iOS
function tokenHandler(result) {
    client.register('IOS', result, function (data) {
        if (data.code == 0) {
            window.localStorage.setItem('push', 'registered');
            console.error("save")
        }
        
    })
}

function errorHandler(error) {
    console.error('error = ' + error);
}

//ANDROID
function successHandler(result) {
    console.log("success with result: " + result);
    
}
function onNotification(e) {
    console.error("on notification: " + e.event);
    switch (e.event) {
        case 'registered':
            console.log("event registered" + e.regid)
            if (e.regid.length > 0) {
                console.log("regid: " + e.regid);
                client.register('AND', e.regid, function (data) {
                    console.log(JSON.stringify(data));
                    if (data.code == 0) {
                        window.localStorage.setItem('push', 'registered');
                        console.error("save success")
                    }
                })
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a diaerror, etc.
            if (e.foreground) {
               
            }
            else {  // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart) {
                    console.log("start");
                }
                else {
                    
                }
            }
            break;

        case 'error':
            alert(e.msg);
            break;

        default:
            alert("unknown event");
            break;
    }
}