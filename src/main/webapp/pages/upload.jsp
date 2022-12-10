<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Upload</title>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
	<!-- color picker http://bgrins.github.io/spectrum/ -->
	<script src='../js/spectrum.js'></script>
	<link rel='stylesheet' href='../css/spectrum.css' />
	<link rel="stylesheet" href="../css/mainStyle.css">
</head>
<body>
	<!-- Header Start -->
	<div class="header">
		<div class="row">
		
			<div class="header-logo">
				<button type="button"><img src="../assets/logo_idio.png" alt="logo_idio.png"></button>
			</div>
			
			<div class="header-menu">
				<ul>
					<li><a href="#">Introduction</a></li>
					<li><a href="#">Main</a></li>
					<li><a href="#">Rank</a></li>
					<li><a href="./login.html" id="header-profile">Login</a></li>
				</ul>
			</div>
			
		</div>
	</div>
	<!-- Header End -->
	
	<!-- Upload Start -->
	<form method="post" action="./upload_post.jsp" id="upload-form">
		<div class="container-post">
			<div class="post-category-title">
				Upload
			</div>
			<hr size="2" color="gray">
			
			<div class="container-upload-title">
				<span class="upload-text-title">Title</span> <br>
				<input type="text" class="input-form" name="title" id="upload-input-title" placeholder="Please enter the title of this post">
			</div>
			
			<div class="container-upload-draw">
				<div class="draw-canvas"></div>
				
				<div class="container-tool">
					<div class="container-tool-selection">
						<button type="button" class="button-tool-active" id="button-select-brush">Brush</button>
						<button type="button" class="button-tool-inactive" id="button-select-layer">Layer</button>
					</div>
					<div class="container-tool-brush">
						<div class="container-pallete">
							<input type="text" id="pallete" />
							<div class="pallete-description">Select Color</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="container-upload-description">
			
			</div>
			
		</div>
	</form>
	<!-- Upload End -->
	
	<script type="text/javascript" src="../js/drawScript.js"></script>
</body>

</html>