var is_checked_id = false;
var is_checked_password = false;

$(function() {
	InitializeLogin();	
});

// Click Login button
function ClickLogin(){
	if(is_checked_id && is_checked_password){
		$('#lo-form').submit();
	}
	else{
		alert("Please check your id and password again!");
	}
}

// Set initial state of login page
function InitializeLogin(){
	$(function() {
		/* Set css start */
    $('#lo-error-id').show();
    $('#lo-error-password').show();
    /* Set css end */
    
    /* check inputs */
    // id
    $('#lo-input-id').on('propertychange change paste input', function() {
			var id_input = $('#lo-input-id').val();
			
			// Initialize check state since input changed
			is_checked_id = false;
			
			// no input?
			if (id_input === ''){
				$('#lo-error-id').show();
				$('#lo-error-id').text('Please enter your id!');
				return;
			}
			
			// pass
			$('#lo-error-id').hide();
			is_checked_id = true;
		});
		
		// password
    $('#lo-input-password').on('propertychange change paste input', function() {
			var password_input = $('#lo-input-password').val();
			
			// Initialize check state since input changed
			is_checked_password = false;
			
			// no input?
			if (password_input === ''){
				$('#lo-error-password').show();
				$('#lo-error-password').text('Please enter your password!');
				return;
			}
			
			// pass
			$('#lo-error-password').hide();
			is_checked_password = true;
		});
		/* check inputs */
	});
}