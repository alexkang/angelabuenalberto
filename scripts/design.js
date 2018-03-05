$(document).ready(function(){
	// Constants.
	const PIECES = [
		"1.png",
		"2.png",
		"3.png",
		"4.png",
		"5.jpg",
		"6.png",
		"7.png",
		"7.5.png",
		"8.png",
		"9.png",
		"10.png",
		"11.jpg",
		"12.png",
		"13.png",
		"14.png"
	];	

	// Start of script.
	$.each(PIECES, function(i, piece) {
		addExhibitPiece("design", piece);
	});
	$(".exhibit-item").click(function() {
		window.location.href = $(this).attr("src");
	});
});