<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Sign up</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
	<link rel="stylesheet" href="../css/style.css">
</head>
<body>
<%@ page import ="java.sql.*" %>
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
%>
	<div class="container">
		<div class="register-container-logo">
		
		</div>
		<div class="register-container">
			<form method="post" action="./validate_signup.jsp">
				<div class="mb-3">
				  	<label for="id" class="form-label">Id</label>
				  	<input type="text" class="form-control" name="userid" id="signup-userid" placeholder="id">
				</div>
				<div class="mb-3">
				  	<label for="username" class="form-label">Username</label>
				  	<input type="text" class="form-control" name="username" id="signup-username" placeholder="username">
				</div>
				<div class="mb-3">
				  	<label for="password" class="form-label">Password</label>
				  	<input type="password" class="form-control" name="password" id="signup-password" placeholder="password">
				</div>
				<div class="mb-3">
				  	<label for="email" class="form-label">Email address</label>
				  	<input type="email" class="form-control" name="email" id="signup-email" placeholder="name@example.com">
				</div>
				<button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
			</form>
		</div>
	</div>
</body>

</html>