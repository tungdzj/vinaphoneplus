//0: Viet Nam 1: English

var languageControl ={
    currentLan: 0,

    lanString: ["vn", "en"],
	
	placeHolder: {
		".search-input-text":["Từ tìm kiếm","Search word"],
		"#comment_text_area":["Viết bình luận...","Write comment..."],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
		"":["",""],
	},
	static : {
		//category page
	"#category-text-1":["Ẩm thực", "Cuisine"],
	"#category-text-2":["Mua sắm", "Shopping"],
	"#category-text-3":["Giải trí", "Entertainment"],
	"#category-text-4":["Du lịch", "Travelling"],
	"#category-text-5":["Sức khỏe", "Healthy"],
	"#category-text-6":["Giáo dục", "Education"],
	"#loggedin_footer .ui-block-a .btn-text": ["Đăng xuất", "Log out"],
	"#loggedin_footer .ui-block-b .btn-text": ["Hội viên", "Member"],
	"#loggedin_footer .ui-block-c .btn-text": ["Hướng dẫn", "Help"],
	"#not_login_footer .ui-block-a .btn-text": ["Đăng nhập", "Login"],
	"#not_login_footer .ui-block-b .btn-text": ["Hướng dẫn", "Help"],
	
	//promotion page
	".category_title":["",""],
	".promotion-tab-text-1":["Yêu thích","Like"],
	".promotion-tab-text-2":["Ưu đãi","Random"],
	".promotion-tab-text-3":["Hot nhất","Hot"],
	".promotion-tab-text-4":["Mới nhất","New"],
	".promotion-tab-text-5":["Gần nhất","Near"],
	".promotion-tab-text-6":["Mua nhiều nhất","Best buy"],
	".promotion-tab-text-7":["Tìm kiếm","Search"],
	
	".menu-text-1":["Màn hình chính","Home"],
	".menu-text-2":["Ẩm thực","Cuisine"],
	".menu-text-3":["Mua sắm", "Shopping"],
	".menu-text-4":["Giải trí", "Entertainment"],
	".menu-text-5":["Du lịch", "Travelling"],
	".menu-text-6":["Sức khỏe", "Healthy"],
	".menu-text-7":["Giáo dục", "Education"],
	".menu-text-8":["Hướng dẫn","Help"],
	".menu-text-9":["Thông tin","About"],
	
	//search
	".search-title-text":["Tìm kiếm","Search"],
	"":["",""],
	
	
	//promotion detail
	".social-text-1":["Thích","Like"],
	".social-text-2":["Bình luận","Comment"],
	".social-text-3":["Đánh giá","Rate"],
	".social-text-4":["Chia sẻ","Share"],
	".detail-footer .ui-block-a .btn-text": ["Quay lại", "Back"],
	".detail-footer .ui-block-b .btn-text": ["Thông tin", "Infomation"],
	".detail-footer .ui-block-c .btn-text": ["Vị trí", "Location"],
	".detail-footer .ui-block-d .btn-text": ["Hình ảnh", "Image"],
	
	".extend-footer .ui-block-a .btn-text": ["Quay lại", "Back"],
	".extend-footer .ui-block-b .btn-text": ["Thông tin", "Infomation"],
	".extend-footer .ui-block-c .btn-text": ["Vị trí", "Location"],
	".extend-footer .ui-block-d .btn-text": ["Hình ảnh", "Image"],
	"#comment_btn_send": ["Gửi", "Send"],

        //login
	".popup1_controls .ui-btn-close": ["Đóng", "Close"],
	".popup1_controls #login_btn_login": ["Cập nhật", "Update"],
	".please-update": ["Vui lòng cập nhật thông tin để nhận<br />những ưu đãi mới nhất từ VinaPhone Plus", "Please update your information to get<br> newest promotions from VinaPhone Plus"],
	"#user-info-header": ["Thông tin người dùng", "User Information"],
	".name-label": ["Họ và tên", "Name"],
	".phone-label": ["Số điện thoại", "Phone number"],
	".email-label": ["Email", "Email"],
	".address-label": ["Địa chỉ", "Address"],
	"#login_popup5 .btn-close": ["Đóng", "Close"],
	"#login_popup5 #login_btn_login": ["Cập nhật", "Update"],
	"#login_popup3 #login_btn_back": ["Quay lại", "Back"],
	"#login_popup3 #login_btn_login": ["Đăng nhập", "Login"],
	"#login_popup2 .btn-close": ["Đóng", "Close"],
	"#login_popup2 #login_btn_next": ["Tiếp", "Continue"],
	"#login_popup1 .btn-close": ["Đóng", "Close"],
	"#login_popup1 .btn-login": ["Đăng nhập", "Login"],
	"#deal_code_button1": ["Lấy mã ưu đãi tại đây", "Get dealcode"],
	"":["",""],
	"":["",""],
	"":["",""],
	"":["",""],
	},
	
	dynamic: [
/*00*/	["Đăng xuất","Log out?"], //0
/*01*/	["Chưa đăng nhập","Not login"], //1
/*02*/["<p class='text-center'>Chưa có bình luận nào</p>", "No comment."], //2
/*03*/	["Nhập họ tên","Enter your name"], //3
/*04*/	["Nhập email","Enter your email"], //4
/*05*/	["Nhập địa chỉ","Enter your address"], //5
/*06*/	["Lấy mã ưu đãi","Get dealcode"],
/*07*/	["",""],
/*08*/	["",""],
/*00*/	["",""]
/*00*/	["",""],
/*00*/	["",""],
/*00*/	["",""],
/*00*/	["",""],
/*00*/	["",""],
	],
	ChangeLanguage: function (index) {

	    languageControl.currentLan = index;
		//placeholder
		for (var p in languageControl.placeHolder){
		    $(p).attr("placeHolder", languageControl.placeHolder[p][index])
		}
		//static
		for (var e in languageControl.static){
		    $(e).html(languageControl.static[e][index]);
		}
	},
	
	GetText: function(index){
		return languageControl.dynamic[index][languageControl.currentLan];
	}
}

//languageControl.ChangeLanguage(1);
