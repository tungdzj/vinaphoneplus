document.addEventListener("deviceready", function () {

    var customLocale = {};
    customLocale.title = "Chám điểm %@";
    customLocale.message = "Nếu bạn thích sử dụng %@, vui lòng bớt chút thời gian để chấm điểm!";
    customLocale.cancelButtonLabel = "Không";
    customLocale.laterButtonLabel = "Nhắc tôi sau";
    customLocale.rateButtonLabel = "Chấm ngay";


    AppRate.preferences.storeAppURL.ios = '<my_app_id>';
    AppRate.preferences.storeAppURL.android = 'market://details?id=<package_name>';
    AppRate.preferences.storeAppURL.blackberry = 'appworld://content/[App Id]/';
    AppRate.preferences.storeAppURL.windows8 = 'ms-windows-store:Review?name=<the Package Family Name of the application>';
    AppRate.promptForRating();
});

var rateApp = {
    OpenRate: function () {

    }
}