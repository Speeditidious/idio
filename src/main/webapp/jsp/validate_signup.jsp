<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
  	<title>Web programming</title>
  	<link rel="stylesheet" href="../css/style.css">
</head>

<body>

<%@ page import ="java.sql.*" %>
<%

String user_name="";
	try{
 		String userid = request.getParameter("userid");
     	String username = request.getParameter("username");   
     	String password = request.getParameter("password");
     	String email = request.getParameter("email") ;
     	Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
     	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
     
     	String sql = "insert into users(user_id,user_name,password,email)values(?,?,?,?)";
     	PreparedStatement ps = null;
     	ps = conn.prepareStatement(sql);
     	ps.setString(1, userid);
     	ps.setString(2, username);
     	ps.setString(3, password);
     	ps.setString(4, email);
     
     	int i=ps.executeUpdate();
     
     	user_name = username;
	}
	catch(Exception e){       
    	out.println(e);       
	}      
%>

Welcome,  you logined as: <%=user_name%>

</body>

</html>
