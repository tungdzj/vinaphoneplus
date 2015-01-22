var deviceLocation = null;
var defaultLocation = [21.027821, 105.852290];
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        uuid = device.uuid;
        app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(function (position) {
            deviceLocation = [position.coords.latitude, position.coords.longitude];
            onGetDeviceLocation();
        },
        function (error) {
            ui.Alert("Không thể xác định vị trí của bạn. Có thể do bạn đã tắt chức năng định vị.", "Lỗi định vị", function () { });
        });
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
        }
        if (device.platform == "iOS") {
            //hide ios status bar
            StatusBar.hide();
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};
