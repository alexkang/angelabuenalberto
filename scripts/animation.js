$(document).ready(function(){
	// Constants.
	const PIECES = [
		"flamingo.gif"
	];	

	// Start of script.
	$.each(PIECES, function(i, piece) {
		addExhibitPiece("animation", piece);
	});
	$(".exhibit-item").click(function() {
		window.location.href = $(this).attr("src");
	});
});