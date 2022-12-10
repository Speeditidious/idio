<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
  	<title>Web programming</title>
</head>

<body>

<%@ page import ="java.sql.*" %>
<%
	try{
		String userid = request.getParameter("id");
		String password = request.getParameter("password");
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
	
		PreparedStatement pst = conn.prepareStatement("select user_id, password, user_name from users where user_id=? and password=?");
		pst.setString(1, userid);
		pst.setString(2, password);
		ResultSet rs = pst.executeQuery();
		
		// does not match
		if(!rs.next()){
%>
<script>
	alert("id or password is wrong.");
	history.back();
</script>
<%			
		}
		// match. go to main
		else{
			String username = rs.getString("user_name");
			response.sendRedirect("./main.jsp?userid=" + userid + "&username=" + username);
		}
	}
	catch(Exception e){       
		out.println(e);       
	}
%>

</body>

</html>
