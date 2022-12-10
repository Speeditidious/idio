<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Sign up</title>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="../css/registerStyle.css">
</head>
<body>
<%-- <%@ page import ="java.sql.*" %>
<%@ page import ="java.util.*" %>
<%
List<String> user_id_list = new ArrayList<String>();
List<String> user_name_list = new ArrayList<String>();
	try{
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
     	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
		
		PreparedStatement ps = conn.prepareStatement("select user_id,user_name from users");
		ResultSet rs = ps.executeQuery();
		
		// get all userid and username for validation
		while(rs.next()){
			user_id_list.add(rs.getString("user_id"));
			user_name_list.add(rs.getString("user_name"));
		}
	}
	catch(Exception e){
		out.println(e);
	}
%> --%>

	<div class="container-register">
	
		<div class="container-logo">
	  	<img src="../assets/logo_idio.png" alt="logo_idio.png" class="logo-big"> <br>
	    <div class="logo-description">
	      Overlap your imagination!
	    </div>
	  </div>
		
		<form method="post" action="./validate_signup.jsp" id="su-form">
		  <div class="container-form">
		    <div class="title-form">Sign up</div>
		    <div class="container-input-form" id="container-input-form-userid">
		      <span class="title-input">Id</span> <br>
		      <div class="error" id="su-error-id">Please enter your id!</div>
		      <input type="text" class="input-form" name="id" id="su-input-id" placeholder="id">
		      <img src="../assets/check.png" alt="check.png" class="check-form" id="su-check-id">
		    </div>
		    <div class="container-check-availability">
		    	<button type="button" class="input-check-availability">Check Availability</button>
		    	<span class="availability-description" id="availablity-description-id">your id is available!</span>
		    </div>
		    
		    <div class="container-input-form">
		      <span class="title-input">User name</span> <br>
		      <div class="error" id="su-error-username">Please enter your User name!</div>
		      <input type="text" class="input-form" name="username" id="su-input-username" placeholder="username">
		      <img src="../assets/check.png" alt="check.png" class="check-form" id="su-check-username">
		    </div>
		    
		    <div class="container-input-form">
		      <span class="title-input">Password</span> <br>
		      <div class="error" id="su-error-password">Please enter your password!</div>
		      <input type="password" class="input-form" name="password" id="su-input-password" placeholder="password">
		      <img src="../assets/check.png" alt="check.png" class="check-form" id="su-check-password">
		    </div>
		    
		    <div class="container-input-form">
		      <span class="title-input">Confirm Password</span> <br>
		      <div class="error" id="su-error-password-confirm">Please re-enter your password!</div>
		      <input type="password" class="input-form" name="password-confirm" id="su-input-password-confirm" placeholder="confirm password">
		      <img src="../assets/check.png" alt="check.png" class="check-form" id="su-check-password-confirm">
		    </div>
		    
		    <div class="container-input-form">
		      <span class="title-input">Email address</span> <br>
		      <div class="error" id="su-error-email">Please enter your email address!</div>
		      <input type="email" class="input-form" name="email" id="su-input-email" placeholder="name@example.com">
		      <img src="../assets/check.png" alt="check.png" class="check-form" id="su-check-email">
		    </div>
		    
		    <div class="container-button-submit">
		      <button type="button" class="button-submit" onclick="ClickSignUp()">Submit</button>
		  	</div>
		    
		  </div>
  	</form>
  
	</div>

	<script type="text/javascript" src="../js/signupScript.js"></script>
</body>

</html>