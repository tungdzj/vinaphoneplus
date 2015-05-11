var checkVersion = {
    version: '1.0.9',
    check: function () {
        client.CheckVersion(function (data) {
            if (data.version != checkVersion.version) {
                $("#version_dialog").removeClass('hidden');
                $("#background").removeClass('hidden');
            }
        })
    },

    onUpdateClick: function () {
        promotionControl.Rate();
    },

    onCloseClick: function () {
        $("#version_dialog").addClass('hidden');
        $("#background").addClass('hidden');
    }
}

$(document).ready(function () {
});