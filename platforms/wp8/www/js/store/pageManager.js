var pageManager = {
    currentPage: "categories_page",
    lastPage: "categories_page",
    backClick: false,
    popupOpen: "none",
    ChangePage: function (page) {
        console.log(page);
        utils.HideLoading();
        CloseSearchPanel();
        if (page != pageManager.currentPage) {
            pageManager.lastPage = pageManager.currentPage;
        }
        $.mobile.changePage("#" + page,
            {
                transition: 'none',
                changeHash: true
            });
        //console.log("change page to: " + page);
        pageManager.currentPage = page;
        switch (page) {
            case "categories_page":
                homeView.Refresh();
                break;
            case "promotions_page":
                if (pageManager.backClick) {
                    pageManager.backClick = false;
                    promotionView.Refresh();
                } else {
                    promotionView.Update();
                }
                
                break;
            case "promotion_detail_page":
                if (pageManager.backClick) {
                    detailView.Refresh();
                } else {
                    detailView.Update();
                }
                break;
            case "detail_extend_page":
                if (pageManager.backClick) {
                    pageManager.backClick = false;
                    extendView.Refresh();
                } else {
                    extendView.Update();
                }
                
                break;
            case "comment_page":
                this.ShowPromotionDetailPage(false);
                break;
            case "login_dialog":
                userView.Update();
                //pageManager.ChangePage(pageManager.lastPage);
                break;
            case "help_page":
                helpView.Update();
                break;
        }
    },

    OnBackClick: function (back) {
        if (back != null) {
            pageManager.backClick = back;
        }
        pageManager.backClick = true;
        if (pageManager.popupOpen != "none") {
            utils.ClosePopup(pageManager.popupOpen);
            pageManager.popupOpen = "none";
            return;
        }
        switch (pageManager.currentPage) {
            case "promotions_page":
                pageManager.ChangePage("categories_page");
                break;
            case "promotion_detail_page":
                pageManager.ChangePage("promotions_page");
                break;
            case "detail_extend_page":
                pageManager.ChangePage("promotion_detail_page");
                break;
            case "comment_page":
                pageManager.ChangePage("promotion_detail_page");
                break;
            case "login_dialog":
                pageManager.ChangePage(pageManager.lastPage);
                break;
            case "help_page":
                pageManager.ChangePage(pageManager.lastPage);
                break;
            default:
                navigator.notification.confirm(
                    'Thoát ứng dụng?',
                    function (button) {
                        if (button == 1) {
                            navigator.app.exitApp();
                        }
                    },
                    'Thông báo',
                    ['Thoát', 'Trở lại']
                    );
                break;
        }
        pageManager.backClick = false;
    },
}