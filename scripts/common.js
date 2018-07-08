// Universal Constants.
const VIMEO_IDENTIFIER = "https://player.vimeo.com/video/";

// Helper functions.
function init() {
	// Load the header.
	$(".header").load("header.html");

	// Load the credits.
	$(".credits").load("credits.html");
}

function addExhibitPieces(exhibit, pieces) {
	// Add exhibit pieces to the exhibit as HTML elements.
	var exhibitElement = "#" + exhibit;
	$.each(pieces, function(i, piece) {
		// Decide whether to display this as an image or embedded video.
		if (piece.includes(VIMEO_IDENTIFIER)) {
			$(exhibitElement).append('<div class="exhibit-item vimeo">' + piece + '</div>');
		} else {
			$(exhibitElement).append(
				'<img class="exhibit-item image" src="' + exhibit + '/' + piece + '" />');
		}
	});

	// Add on-click functionality to all image pieces.
	$(".image").click(function() {
		window.location.href = $(this).attr("src");
	});
}
