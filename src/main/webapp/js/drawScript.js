/* color picker http://bgrins.github.io/spectrum/ */
$(function() {
	CreatePallete();
});

// Create Color Pallete
function CreatePallete(){
	$('#pallete').spectrum({
		preferredFormat: 'hex',		// color format
		color: '#000000',						// initial color
		showPalette: true,				// show color
		showInitial: true,				// show current color
		showInput: true,					// input color by text available
		showAlpha: true,					// alpha available
		maxSelectionSize: 3,			// max num of recently used color
		// event when open pallete
		show: function(color){
			
		},
		// event when color changed
		change: function(color){
			color.toHexString()
		},
		// event when close pallete
		hide: function(color){
			
		},
	});
	
	// set pallete event
	$('#pallete').spectrum('show');		// open pallete
	$('#pallete').spectrum('hide');		// close pallete
	$('#pallete').spectrum('toggle');	// open state -> close, close state -> open
}