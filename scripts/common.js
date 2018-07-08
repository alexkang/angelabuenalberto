// Universal Constants.
const VIMEO_IDENTIFIER = "https://player.vimeo.com/video/";

// Preloaded hover images.
hoverImages = [];

// Helper functions.
function initHeader() {
	$("#header").load("header.html");
}


function addHover(triggerElement, buttonElement, image) {
	var defaultImageUrl = "images/" + image + "_default.png";
	var hoverImageUrl = "images/" + image + "_hover.png"

	// First, preload the hover image.
	var hoverImage = new Image();
	hoverImage.src = hoverImageUrl;
	hoverImages.push(hoverImage);

	// Then, define the hover behavior.
	$(triggerElement).hover(
		function() {
			$(buttonElement).attr("src", hoverImageUrl);
		},
		function() {
			$(buttonElement).attr("src", defaultImageUrl);
		});
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
