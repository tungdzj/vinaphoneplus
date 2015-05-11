var helpControl = {
    request: 0,
    OnBackClick: function () {
        pageManager.OnBackClick();
        window.localStorage.setItem('firstHelp', 'ok');
    },

    OnNextClick: function () {
        help_scroll.swipeNext()
    },

    OnPrevClick: function () {
        help_scroll.swipePrev();
    },

    OnLanguageClick: function (index) {
        helpControl.OnNextClick();
        languageControl.ChangeLanguage(index);
        if (helpControl.request == 0) {
            helpControl.request = 1;
            //client.GetAllInfo(onReceivedAll, onRequestFailed);
        }
    }
}