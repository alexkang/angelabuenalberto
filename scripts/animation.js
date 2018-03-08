$(document).ready(function(){
	// Constants.
	const PIECES = [
		'<iframe src="https://player.vimeo.com/video/217353881?byline=0&portrait=0" width="711" '
			+ 'height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen '
			+ 'allowfullscreen></iframe>',
		"flamingo.gif"
	];	

	// Start of script.
	addHover("back");
	addExhibitPieces("animation", PIECES);
});