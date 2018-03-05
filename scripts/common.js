// Universal Constants.
const VIMEO_IDENTIFIER = "https://player.vimeo.com/video/";

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

function addExhibitPieces(exhibit, pieces) {
	// Add exhibit pieces to the exhibit as HTML elements.
	var exhibitElement = "#" + exhibit;
	$.each(pieces, function(i, piece) {
		// Decide whether to display this as an image or embedded video.
		if (piece.includes(VIMEO_IDENTIFIER)) {
			$(exhibitElement).append('<div class="exhibit-item">' + piece + '</div>');
		} else {
			$(exhibitElement).append(
				'<img class="exhibit-item" src="' + exhibit + '/' + piece + '" />');
		}
	});

	// Add on-click functionality to all pieces.
	$(".exhibit-item").click(function() {
		window.location.href = $(this).attr("src");
	});
}
