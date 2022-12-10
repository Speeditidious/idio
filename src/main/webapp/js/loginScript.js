var is_checked_id = false;
var is_checked_password = false;

$(function() {
	InitializeLogin();	
});

// Click Login button
function ClickLogin(){
	if(is_checked_id && is_checked_password){
		$('lo-form').submit();
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
    $('#su-input-id').on('propertychange change paste input', function() {
			var id_input = $('#su-input-id').val();
			
			// Initialize check state since input changed
			is_checked_id = false;
			
			// no input?
			if (id_input === ''){
				$('#su-error-id').show();
				$('#su-error-id').text('Please enter your id!');
				return;
			}
			
			// pass
			$('#su-error-id').hide();
			is_checked_id = true;
		});
		
		// password
    $('#su-input-password').on('propertychange change paste input', function() {
			var password_input = $('#su-input-password').val();
			
			// Initialize check state since input changed
			is_checked_password = false;
			
			// no input?
			if (password_input === ''){
				$('#su-error-password').show();
				$('#su-error-password').text('Please enter your id!');
				return;
			}
			
			// pass
			$('#su-error-password').hide();
			is_checked_password = true;
		});
		/* check inputs */
	});
}