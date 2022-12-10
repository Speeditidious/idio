// start post or go to login
function ClickStart(){
	var user_name = $('#main-user-name').val();
	var user_id = $('#main-user-id').val();
	
	if(user_name === "null"){
		location.href = "../pages/login.html";
	}
	else{
		location.href = "../pages/upload.jsp?userid=" + user_id + "&username=" + user_name;
	}
}