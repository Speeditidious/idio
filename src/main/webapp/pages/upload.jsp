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
	try{
		user_name = request.getParameter("username");
		user_id = request.getParameter("userid");
	}
	catch(Exception e){       
		out.println(e);       
	}
%>

<input type="text" id="main-user-name" value="<%=user_name%>" hidden>
<input type="text" id="main-user-id" value="<%=user_id%>" hidden>

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
			Upload Page
		</div>
		<div class="banner-description">
			Good Luck!
		</div>
	</div>
	<!-- Banner End -->
	
	<!-- Upload Start -->
	<form method="post" action="./uploading.jsp" id="upload-form">
		<input type="text" name="username" value="<%=user_name%>" hidden>
		<input type="text" name="id" value="<%=user_id%>" hidden>
		
		<div class="container-post">
			<div class="post-category-title">
				Upload
			</div>
			<hr size="2" color="gray">
			
			<div class="container-upload-title">
				<span class="upload-text-title">Title</span> <br>
				<input type="text" class="input-form" name="title" id="upload-input-title" placeholder="Please enter the title of this post">
			</div>
			
			<div class="container-upload-draw-title">
				<div class="upload-draw-title">Canvas</div>
				<div class="upload-draw-description">Drag & Drop brushes to the canvas to draw!</div>
			</div>
			
			<input type="text" name="image" id="upload-canvas-image" hidden>
			
			<div class="container-upload-draw">
				<div class="draw-canvas" id="canvas"></div>
				
				<div class="container-tool">
					<div class="container-tool-selection">
						<button type="button" class="button-tool-active" id="button-select-brush">Brush</button>
					</div>
					<div class="container-tool-brush">
						<div class="container-pallete">
							<input type="text" id="pallete" />
							<div class="pallete-description">Select Color</div>
						</div>
						<div class="container-brush">
							<div class="brush" id="brush-1"></div>
							<div class="brush" id="brush-2"></div>
							<div class="brush" id="brush-3"></div>
							<div class="brush" id="brush-4"></div>
							<div class="brush" id="brush-5"></div>
							<div class="brush" id="brush-6"></div>
						</div>
						<div class="container-brush-selection">
							<button type="button" class="button-brush-inactive" id="button-brush-prev" onclick="PrevBrushSet()"><i class="fa-solid fa-arrow-left-long"></i>&nbsp;&nbsp;&nbsp;Prev</button>
							<button type="button" class="button-brush-inactive" id="button-brush-next" onclick="NextBrushSet()">Next&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-arrow-right-long"></i></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="container-upload-description">
				<div class="upload-description-title">Description</div>
				<textarea name="description" id="textarea-description" placeholder="Please enter the description of this post"></textarea>
			</div>
			
			<div class="container-upload-button">
				<button type="button" class="button-upload" onclick="ClickUpload()">Upload</button>
			</div>
		</div>
	</form>
	<!-- Upload End -->
	
	<script type="text/javascript" src="../js/headerLinkScript.js"></script>
	<script type="text/javascript" src="../js/drawScript.js"></script>
	<script type="text/javascript" src="../js/uploadScript.js"></script>
</body>

</html>