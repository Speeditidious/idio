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

List<String> most_liked_author_list = new ArrayList<String>();
List<Integer> sum_most_liked_list = new ArrayList<Integer>();

	try{
		// get username and id
		user_name = request.getParameter("username");
		user_id = request.getParameter("userid");
		
		// get post informations
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
		
		PreparedStatement ps = conn.prepareStatement("select post_id, post_img, post_title, post_author_id, post_like, user_name from post, users where post_author_id = user_id order by post_like desc");
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
		
		// get most liked users
		ps = conn.prepareStatement("select post_author_id, sum(post_like) from idio_db.post group by post_author_id order by sum(post_like) desc limit 5");
		rs = ps.executeQuery();
		
		while(rs.next()){
			most_liked_author_list.add(rs.getString("post_author_id"));
			sum_most_liked_list.add(rs.getInt("sum(post_like)"));
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

<input type="text" id="most-liked-author-list" value="<%=most_liked_author_list%>" hidden>
<input type="text" id="sum-most-liked-list" value="<%=sum_most_liked_list%>" hidden>


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
			This is ranking page!
		</div>
		<div class="banner-description">
			Look around the best works!
		</div>
	</div>
	<!-- Banner End -->
	
	<!-- Main Start -->
	<div class="container-main">
		<div class="post-category-title">
			<i class="fa-solid fa-ranking-star"></i>&nbsp;Top 3 Most Liked Posts
		</div>
		<hr size="2" color="gray">
		<div class="rank-most-liked-post">
			<i class="fa-solid fa-1"></i>
			<i class="fa-solid fa-2"></i>
			<i class="fa-solid fa-3"></i>
		</div>
		<div class="post-grid" id="post-most-liked-grid"></div>
		
		<div class="post-category-title">
			<i class="fa-solid fa-medal"></i></i>&nbsp;Top Most Liked Users
		</div>
		<hr size="2" color="gray">
		<table class="table-top-author" id="table-top-author">
			<thead>
				<tr class="table-top-author-title">
					<th>Rank</th>
					<th>Author id</th>
					<th>Number of likes</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>asdf</td>
					<td>3</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- Main End -->
	
	<form method="post" action="./update_postlike_rank.jsp" id="postlike-form" hidden>
		<input type="text" name="username" id="postlike-user-name" value="<%=user_name%>" hidden>
		<input type="text" name="userid" id="postlike-user-id" value="<%=user_id%>" hidden>
		<input type="text" name="postid" id="postlike-post-id" hidden>
	</form>
	
	<form method="post" action="./look.jsp" id="look-form" hidden>
		<input type="text" name="username" id="look-user-name" value="<%=user_name%>" hidden>
		<input type="text" name="userid" id="look-user-id" value="<%=user_id%>" hidden>
		<input type="text" name="postid" id="look-post-id" hidden>
	</form>
	
	<script type="text/javascript" src="../js/headerLinkScript.js"></script>
	<script type="text/javascript" src="../js/getTopPostsScript.js"></script>
</body>

</html>