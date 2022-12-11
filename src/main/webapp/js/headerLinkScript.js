function gotoMain(){
	var user_name = $('#main-user-name').val();
	var user_id = $('#main-user-id').val();
	
	location.href='../pages/main.jsp?userid=' + user_id + '&username=' + user_name;
}

function gotoRank(){
	var user_name = $('#main-user-name').val();
	var user_id = $('#main-user-id').val();
	
	location.href='../pages/rank.jsp?userid=' + user_id + '&username=' + user_name;
}

function gotoPost(){
	var user_name = $('#main-user-name').val();
	var user_id = $('#main-user-id').val();
	
	if(user_name === "null"){
		location.href = "../pages/login.html";
	}
	else{
		location.href = "../pages/upload.jsp?userid=" + user_id + "&username=" + user_name;
	}
}