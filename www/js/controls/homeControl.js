var homeControl = {
	
	SetCategoryTitle: function(index){
		switch (index) {
            case 1:
                $(".category_title").html(languageControl.static['#category-text-1'][languageControl.currentLan]);
                break;
            case 2:
                $(".category_title").html(languageControl.static['#category-text-2'][languageControl.currentLan]);
                break;
            case 3:
                $(".category_title").html(languageControl.static['#category-text-3'][languageControl.currentLan]);
                break;
            case 4:
                $(".category_title").html(languageControl.static['#category-text-4'][languageControl.currentLan]);
                break;
            case 5:
                $(".category_title").html(languageControl.static['#category-text-5'][languageControl.currentLan]);
                break;
            case 6:
                $(".category_title").html(languageControl.static['#category-text-6'][languageControl.currentLan]);
                break;
		}
		for (var i = 1; i < 7; i++) {
		    $(".p-block-" + i).removeClass('footer_active')
		}
		$(".p-block-" + index).addClass('footer_active')
	},
    OnCategoryClick: function (index) {
        utils.CloseMenu();
        homeControl.SetCategoryTitle(index);
        geoAddMarker(store.currentCategoryId, index);
        store.currentCategoryId = index;
        pageManager.ChangePage("promotions_page");
    },

    OnMenuClick: function (index) {
        utils.CloseMenu();
        if (index == 7) {
            pageManager.ChangePage("help_page");
        }
        
        if (index > 6) {
            return;
        }
        
		homeControl.SetCategoryTitle(index);
        geoAddMarker(store.currentCategoryId, index);
        store.currentCategoryId = index;
        pageManager.ChangePage("promotions_page");
    },

    Login: function () {
        pageManager.ChangePage("login_dialog")
    },
    ShowHelp: function () {
        pageManager.ChangePage("help_page");
    },
    
}