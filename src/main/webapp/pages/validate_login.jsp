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
     	response.sendRedirect("./main.jsp");
	}
	catch(Exception e){       
    	out.println(e);       
	}
%>

</body>

</html>
