<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Upload</title>
	<script src="https://kit.fontawesome.com/9841a40e2c.js" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
	<!-- color picker http://bgrins.github.io/spectrum/ -->
	<script src='../js/spectrum.js'></script>
	<link rel='stylesheet' href='../css/spectrum.css' />
	<!-- screenshot https://html2canvas.hertzen.com/ -->
	<script src='../js/html2canvas.js'></script>
	<link rel="stylesheet" href="../css/mainStyle.css">
</head>
<body>

<%@ page import ="java.sql.*" %>
<%
String user_name = "";
String user_id = "";
String post_id = "";

String post_img = "";
String post_title = "";
String post_author = "";
String post_description = "";

	try{
		user_name = request.getParameter("username");
		user_id = request.getParameter("userid");
		post_id = request.getParameter("postid");
		
		// get post informations
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
		
    PreparedStatement ps = conn.prepareStatement("select post_img, post_title, post_author_id, post_description, post_like from post where post_id=?");
    ps.setInt(1, Integer.parseInt(post_id));
		ResultSet rs = ps.executeQuery();
		
		if(rs.next()){
			post_img = rs.getString("post_img");
			post_title = rs.getString("post_title");
			post_author = rs.getString("post_author_id");
			post_description = rs.getString("post_description");
		}
	}
	catch(Exception e){       
		out.println(e);       
	}
%>

<input type="text" id="main-user-name" value="<%=user_name%>" hidden>
<input type="text" id="main-user-id" value="<%=user_id%>" hidden>

<input type="text" id="look-post-img" value="<%=post_img%>" hidden>
<input type="text" id="look-post-title" value="<%=post_title%>" hidden>
<input type="text" id="look-post-author" value="<%=post_author%>" hidden>
<input type="text" id="look-post-description" value="<%=post_description%>" hidden>

	<!-- Header Start -->
	<div class="header">
		<div class="row">
		
			<div class="header-logo">
				<button type="button" onclick="gotoMain()"><img src="../assets/logo_idio.png" alt="logo_idio.png"></button>
			</div>
			
			<div class="header-menu">
				<ul>
					<li><a onclick="gotoMain()">Main</a></li>
					<li><a href="./login.html" id="header-profile">
					<%
						if(user_name == null){
					%>
					Login
					<%		
						}
						else{
					%>
					<i class="fa-solid fa-circle-user"></i>&nbsp;<%=user_name%>
					<%
						}
					%>
					</a></li>
				</ul>
			</div>
			
		</div>
	</div>
	<!-- Header End -->
	
	<!-- Banner Start -->
	<div class="container-banner">
		<div class="banner-title">
			Welcome!
		</div>
		<div class="banner-description">
			Nice works are all here!
		</div>
	</div>
	<!-- Banner End -->
	
	<!-- Upload Start -->
	<form method="post" action="./uploading.jsp" id="upload-form">
		<input type="text" name="username" value="<%=user_name%>" hidden>
		<input type="text" name="id" value="<%=user_id%>" hidden>
		
		<div class="container-post">
			<div class="container-upload-title">
				<span class="upload-text-title">Title</span> <br><br>
				<span class="look-text-author">Author</span> <br><br>
			</div>
			
			<div class="container-upload-draw-title">
				<div class="upload-draw-title">Canvas</div>
				<hr size="2" color="gray">
			</div>
		
			<div class="container-upload-draw">
				<div class="look-canvas" id="canvas"></div>
			</div>
			<br><br>
			<div class="container-upload-description">
				<div class="upload-description-title">Description</div>
				<textarea readonly name="description" id="textarea-description"></textarea>
			</div>
			
			<div class="container-upload-button">
				<button type="button" class="button-upload" onclick="gotoMain()"><i class="fa-solid fa-rotate-left"></i>Back</button>
			</div>
		</div>
	</form>
	<!-- Upload End -->
	
	<script type="text/javascript" src="../js/gotoMainScript.js"></script>
	<script type="text/javascript" src="../js/lookScript.js"></script>
</body>

</html>