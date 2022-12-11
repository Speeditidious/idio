<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<title>idio - Main</title>
	<script src="https://kit.fontawesome.com/9841a40e2c.js" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
</head>
<body>

<%@ page import ="java.sql.*" %>
<%@ page import ="java.util.*" %>
<%
	String liked_post_list_str = "";
	int post_like_num = 0;
	try{
		String username = request.getParameter("username");
		String userid = request.getParameter("userid");
		String postid = request.getParameter("postid");
		
		// get post informations
		Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/idio_db?" + "user=root2&password=root2");
		
    PreparedStatement ps = conn.prepareStatement("select liked_post_list from users where user_id=?");
    ps.setString(1, userid);
    ResultSet rs = ps.executeQuery();
    
    if(rs.next()){
    	liked_post_list_str = rs.getString("liked_post_list");
    	// liked_post exists
    	if(liked_post_list_str != null){
    		if(liked_post_list_str.charAt(0) == '['){
        		liked_post_list_str = liked_post_list_str.substring(1, liked_post_list_str.length() - 1); 
        }
    	}
    }
    
 		// get post_like
    ps = conn.prepareStatement("select post_like from post where post_id=?");
    ps.setInt(1, Integer.parseInt(postid));
    rs = ps.executeQuery();
    
    if(rs.next()){
    	post_like_num = rs.getInt("post_like");
    }
    
    boolean is_liked = false;
    
    List<String> liked_post_list = new ArrayList<String>();
    
    // liked posts exist
    if(liked_post_list_str != null && !liked_post_list_str.equals("")){
    	liked_post_list = new ArrayList<String>(Arrays.asList(liked_post_list_str.split(", ")));
    	for (String liked_post : liked_post_list){
    		if(liked_post.equals(postid)){
    			is_liked = true;
    		}
    	}
    }
    
    // not liked yet
    if(!is_liked){
    	liked_post_list.add(postid);
    	post_like_num += 1;
    }
    // liked to dislike
    else{
    	liked_post_list.remove(postid);
    	post_like_num -= 1;
    }
    
    String result_liked_post_list_str = liked_post_list.toString();
    
    // update liked_post_list
    ps = conn.prepareStatement("update users set liked_post_list=? where user_id=?");
    ps.setString(1, result_liked_post_list_str);
    ps.setString(2, userid);
    
    int i = ps.executeUpdate();
    
    ps = conn.prepareStatement("update post set post_like=? where post_id=?");
    ps.setInt(1, post_like_num);
    ps.setInt(2, Integer.parseInt(postid));
    
    i = ps.executeUpdate();
    
    response.sendRedirect("./rank.jsp?userid=" + userid + "&username=" + username);
	}
	catch(Exception e){       
		out.println(e);       
	}
%>

</body>

</html>