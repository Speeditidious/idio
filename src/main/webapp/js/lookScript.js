$(function(){
	SetLook();
});

// set look page
function SetLook(){
	var post_img = $('#look-post-img').val();
	var post_title = $('#look-post-title').val();
	var post_author = $('#look-post-author').val();
	var post_description = $('#look-post-description').val();
	
	$('.upload-text-title').text('Title: ' + post_title);
	$('.look-text-author').text('Drawn by: ' + post_author);
	$('#canvas').css({"background":"url(data:image/;base64," + post_img + ")"});
	$('#canvas').css('background-size', '110%');
	$('#canvas').css('background-position', 'center');
	$('#textarea-description').text(post_description);
}