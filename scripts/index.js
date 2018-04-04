$(document).ready(function(){
	// Constants.
	const BUTTONS = ["about", "animation", "design", "resume"];	

	// Start of script.
	$.each(BUTTONS, function(i, button) {
		addHover("#" + button, "#" + button, button);
	});
});