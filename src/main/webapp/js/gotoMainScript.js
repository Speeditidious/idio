function gotoMain(){
	var user_name = $('#main-user-name').val();
	var user_id = $('#main-user-id').val();
	
	location.href='../pages/main.jsp?userid=' + user_id + '&username=' + user_name;
}