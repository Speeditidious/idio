// validate upload
function ClickUpload(){
	// title none?
	if($('#upload-input-title').val() === ''){
		alert("Please enter the title of your post!");
		return;
	}
	
	// pass. upload
	html2canvas($("#canvas")[0]).then(function(canvas){
	  var myImage = canvas.toDataURL('image/jpg');
	  var strImage = myImage.replace(/^data:image\/[a-z]+;base64,/, "");
	  $('#upload-canvas-image').attr('value', strImage);
	  $('#upload-form').submit();
  });
}