// Helper functions.
function addHover(buttonName) {
	$("#" + buttonName).hover(
		function() {
			$(this).attr("src", "images/" + buttonName + "_hover.png");
		},
		function() {
			$(this).attr("src", "images/" + buttonName + "_default.png");
		});
}