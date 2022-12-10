<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
  	<title>idio - Upload</title>
</head>

<body>

<%@ page import ="java.sql.*" %>
<%
	try{
 		String userid = request.getParameter("id");
 		String username = request.getParameter("username");
   	String title = request.getParameter("title");   
   	String image = request.getParameter("image");
   	String description = request.getParameter("description") ;
   	Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
   	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
   
   	String sql = "insert into post(post_author_id,post_title,post_img,post_description)values(?,?,?,?)";
   	PreparedStatement ps = null;
   	ps = conn.prepareStatement(sql);
   	ps.setString(1, userid);
   	ps.setString(2, title);
   	ps.setString(3, image);
   	ps.setString(4, description);
   
   	int i=ps.executeUpdate();

   	response.sendRedirect("./main.jsp?userid=" + userid + "&username=" + username);
	}
	catch(Exception e){       
    	out.println(e);       
	}
%>

</body>

</html>
