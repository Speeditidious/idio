<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Main</title>
	<script src="https://kit.fontawesome.com/9841a40e2c.js" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="../css/mainStyle.css">
</head>
<body>

<%@ page import ="java.sql.*" %>
<%@ page import ="java.util.*" %>
<%
String user_name = "";
String user_id = "";

List<Integer> post_id_list = new ArrayList<Integer>();
List<String> post_img_list = new ArrayList<String>();
List<String> post_title_list = new ArrayList<String>();
List<String> post_author_list = new ArrayList<String>();
List<Integer> post_like_list = new ArrayList<Integer>();

String liked_post_list = "";

	try{
		// get username and id
		user_name = request.getParameter("username");
		user_id = request.getParameter("userid");
		
		// get post informations
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
		
		PreparedStatement ps = conn.prepareStatement("select post_id, post_img, post_title, post_author_id, post_like, user_name from post, users where post_author_id = user_id order by post_id desc");
		ResultSet rs = ps.executeQuery();
		
		// get all userid and username for validation
		while(rs.next()){
			post_id_list.add(rs.getInt("post_id"));
			post_img_list.add(rs.getString("post_img"));
			post_title_list.add(rs.getString("post_title"));
			post_author_list.add(rs.getString("user_name"));
			post_like_list.add(rs.getInt("post_like"));
		}
		
		ps = conn.prepareStatement("select liked_post_list from post, users where user_id=?");
		ps.setString(1, user_id);
		rs = ps.executeQuery();
		
		if(rs.next()){
			liked_post_list = rs.getString("liked_post_list");
		}
		
	}
	catch(Exception e){       
		out.println(e);       
	}
%>

<input type="text" id="main-user-name" value="<%=user_name%>" hidden>
<input type="text" id="main-user-id" value="<%=user_id%>" hidden>

<input type="text" id="post-id-list" value="<%=post_id_list%>" hidden>
<input type="text" id="post-img-list" value="<%=post_img_list%>" hidden>
<input type="text" id="post-title-list" value="<%=post_title_list%>" hidden>
<input type="text" id="post-author-list" value="<%=post_author_list%>" hidden>
<input type="text" id="post-like-list" value="<%=post_like_list%>" hidden>
<input type="text" id="liked-post-list" value="<%=liked_post_list%>" hidden>


	<!-- Header Start -->
	<div class="header">
		<div class="row">
		
			<div class="header-logo">
				<button type="button" onclick="gotoMain()"><img src="../assets/logo_idio.png" alt="logo_idio.png"></button>
			</div>
			
			<div class="header-menu">
				<ul>
					<li><a onclick="gotoMain()">Main</a></li>
					<li><a onclick="gotoPost()">Post</a></li>
					<li><a onclick="gotoRank()">Rank</a></li>
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
			Welcome to idio!
		</div>
		<div class="banner-description">
			Click button below to start posting
		</div>
		<div class="banner-button-post">
			<button type="button" onclick="ClickStart()"><i class="fa-solid fa-caret-right"></i>&nbsp;&nbsp;&nbsp;Start&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-caret-left"></i></button>
		</div>
	</div>
	<!-- Banner End -->
	
	<!-- Main Start -->
	<div class="container-main">
		<div class="post-category-title">
			<i class="fa-solid fa-heart"></i>&nbsp;Liked Posts
		</div>
		<hr size="2" color="gray">
		<div class="post-grid" id="post-liked-grid"></div>
		<div id="post-liked-no" hidden>There's not any liked Post. Try clicking like on what you like!</div>
		
		<div class="post-category-title">
			<i class="fa-solid fa-signal"></i>&nbsp;Recent Posts
		</div>
		<hr size="2" color="gray">
		<div class="post-grid" id="post-recent-grid"></div>
		
		<div class="post-category-title">
			<i class="fa-solid fa-tree"></i>&nbsp;All Posts
		</div>
		<hr size="2" color="gray">
		<div class="post-grid" id="post-all-grid"></div>
	</div>
	<!-- Main End -->
	
	<form method="post" action="./update_postlike.jsp" id="postlike-form" hidden>
		<input type="text" name="username" id="postlike-user-name" value="<%=user_name%>" hidden>
		<input type="text" name="userid" id="postlike-user-id" value="<%=user_id%>" hidden>
		<input type="text" name="postid" id="postlike-post-id" hidden>
	</form>
	
	<form method="post" action="./look.jsp" id="look-form" hidden>
		<input type="text" name="username" id="look-user-name" value="<%=user_name%>" hidden>
		<input type="text" name="userid" id="look-user-id" value="<%=user_id%>" hidden>
		<input type="text" name="postid" id="look-post-id" hidden>
	</form>
	
	<script type="text/javascript" src="../js/mainScript.js"></script>
	<script type="text/javascript" src="../js/headerLinkScript.js"></script>
	<script type="text/javascript" src="../js/getPostsScript.js"></script>
</body>

</html>