var is_available_id = false;
var is_checked_id = false;
var is_checked_username = false;
var is_checked_password = false;
var is_checked_password_confirm = false;
var is_checked_email = false;

$(function() {
	InitializeSignUp();
});

// Sign up button clicked
function ClickSignUp(){
	if(is_checked_id && is_checked_username && is_checked_password && is_checked_password_confirm && is_checked_email){
		$('#su-form').submit();
	}
	else{
		alert("Some inputs do not meet the requirements.");
		console.log("is_available_id: " + is_available_id);
		console.log("is_checked_id: " + is_checked_id);
		console.log("is_checked_username: " + is_checked_username);
		console.log("is_checked_password: " + is_checked_password);
		console.log("is_checked_password_confirm: " + is_checked_password_confirm);
		console.log("is_checked_email: " + is_checked_email);
	}
}

// Set initial state of sign up page
function InitializeSignUp(){
	$(function() {
		// for checking input
    // special character pattern reference: https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters
    var pattern_special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var pattern_number = /[0-9]/;
    var pattern_upper_case = /[A-Z]/;
    var pattern_lower_case = /[a-z]/;
    // email pattern reference: https://doolyit.tistory.com/104
    var pattern_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    
    /* Set css start */
    $('.check-form').hide();
    $('.availability-description').hide();
    /* Set css end */
    
    /* check whether the inputs are valid start */
    // id
    $('#su-input-id').on('propertychange change paste input', function() {
			var id_input = $('#su-input-id').val();
			
			// initialize availability since input changed
			is_available_id = false;
			
			// Initialize check state since input changed
			is_checked_id = false;
			
			// no input?
			if (id_input === ''){
				$('#su-error-id').show();
				$('#su-error-id').text('Please enter your id!');
				return;
			}
			
			// is there special letter?
			if (pattern_special.test(id_input) == true){
				$('#su-error-id').show();
				$('#su-error-id').text('Id cannot contain special letters!');
				return;
			}
			
			// longer than 20 letters?
			if (id_input.length > 20){
				$('#su-error-id').show();
				$('#su-error-id').text('The maximum size of id is 20!');
				return;
			}
			
			// did not check availability?
			if (!is_available_id) {
				$('#su-error-id').show();
				$('#su-error-id').text('Plases check if your id is available!');
				$('#availablity-description-id').css('color', 'red');
				$('#availablity-description-id').text('Click here to check!');
				$('#availablity-description-id').show();
				return;
			}
			
			// pass
			$('#su-error-id').hide();
			$('#su-check-id').show();
			is_checked_id = true;
		});
		
		// username
		$('#su-input-username').on('propertychange change paste input', function() {
			var username_input = $('#su-input-username').val();
			
			// Initialize check state since input changed
			is_checked_username = false;
			
			// no input?
			if (username_input === ''){
				$('#su-error-username').show();
				$('#su-error-username').text('Please enter your username!');
				return;
			}
			
			// longer than 20 letters?
			if (username_input.length > 20){
				$('#su-error-username').show();
				$('#su-error-username').text('the maximum size of username is 20');
				return;
			}
			
			// pass
			$('#su-error-username').hide();
			$('#su-check-username').show();
			is_checked_username = true;
		});
		
		// password
		$('#su-input-password').on('propertychange change paste input', function() {
			var password_input = $('#su-input-password').val();
			
			// Initialize check state since input changed
			is_checked_password = false;
			
			// no input?
			if (password_input === ''){
				$('#su-error-password').show();
				$('#su-error-password').text('Please enter your password!');
				return;
			}
			
			// password format check
			if (password_input.length < 6
					|| pattern_upper_case.test(password_input) != true || pattern_lower_case.test(password_input) != true
					|| pattern_number.test(password_input) != true || pattern_special.test(password_input) != true){
				$('#su-error-password').show();
				$('#su-error-password').text('password should contain at least 6 characters, one capital letter, one lowercase letter, atleast one digit and one special character!');
				return;
			}
			
			// longer than 40 letters?
			if (password_input.length > 40){
				$('#su-error-username').show();
				$('#su-error-username').text('the maximum size of password is 40');
				return;
			}
			
			// pass
			$('#su-error-password').hide();
			$('#su-check-password').show();
			is_checked_password = true;
		});
		
		// password confirm
		$('#su-input-password-confirm').on('propertychange change paste input', function() {
			var password_confirm_input = $('#su-input-password-confirm').val();
			var password_input = $('#su-input-password').val();
			
			// Initialize check state since input changed
			is_checked_password_confirm = false;
			
			// no input?
			if (password_confirm_input === ''){
				$('#su-error-password-confirm').show();
				$('#su-error-password-confirm').text('Please re-enter your password!');
				return;
			}
			
			// same as password?
			if (password_confirm_input !== password_input){
				$('#su-error-password-confirm').show();
				$('#su-error-password-confirm').text('Password does not match!');
				return;
			}
			
			// pass
			$('#su-error-password-confirm').hide();
			$('#su-check-password-confirm').show();
			is_checked_password_confirm = true;
		});
		
		// email
    $('#su-input-email').on('propertychange change paste input', function() {
			var email_input = $('#su-input-email').val();
			
			// Initialize check state since input changed
			is_checked_email = false;
			
			// no input?
			if (email_input === ''){
				$('#su-error-email').show();
				$('#su-error-email').text('Please enter your email!');
				return;
			}
			
			// email format?
			if (pattern_email.test(email_input) != true){
				$('#su-error-email').show();
				$('#su-error-email').text('Your email address is invalid!');
				return;
			}
			
			// pass
			$('#su-error-email').hide();
			$('#su-check-email').show();
			is_checked_email = true;
		});
    /* check whether the inputs are valid end */
    
	});
}

// Check whether id is available
function CheckIdAvailable(){
	var is_available = true;
	var id_input = $('#su-input-id').val();
	var user_id_list = $('#user-id-list').val();
	var user_id_arr = user_id_list.slice(1, -1);
	user_id_arr = user_id_arr.split(', ');
	
	user_id_arr.forEach(function(user_id) {
		if(id_input === user_id){
			is_available = false;
		}
	});
	
	if(is_available){
		$('#availablity-description-id').show();
		$('#availablity-description-id').css('color', 'lime');
		$('#availablity-description-id').text('Your id is available!');
		$('#su-error-id').hide();
		$('#su-check-id').show();
		is_available_id = true;
		is_checked_id = true;
	}
	else{
		$('#availablity-description-id').show();
		$('#availablity-description-id').css('color', 'red');
		$('#availablity-description-id').text('id not available!');
		is_available_id = false;
	}
}