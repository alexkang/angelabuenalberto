$(document).ready(() => {
  // ---- Constants ----

  var EXHIBIT_ITEM_PADDING_PERCENTAGE = 1.2;
  var VIMEO_EMBED_PREFIX = "<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://player.vimeo.com/video/"
  var VIMEO_EMBED_SUFFIX = "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>"
  var ANIMATION_VIMEO_VIDEO_IDS = ["273060713", "283148908", "227518868", "217353881"];
  var THESIS_VIMEO_VIDEO_IDS = ["273060713"];

  // ---- Functions ----

  function refreshState() {
    switch (window.location.hash) {
      case "#design":
        openDesignPage();
        break;
      case "#animation":
        openAnimationPage();
        break;
      case "#illustration":
        openIllustrationPage();
        break;
      case "#art":
        openArtPage();
        break;
      case "#projects":
        openProjectsPage();
        break;
      case "#about":
        openAboutPage();
        break;
      default:
        // If the hash is empty or unrecognized, go ahead and open the Design page.
        openDesignPage();
    }
  }

  function calculateExhibitItemWidthPercentage(itemsPerRow) {
    return (100 - (EXHIBIT_ITEM_PADDING_PERCENTAGE * itemsPerRow)) / itemsPerRow;
  }

  function loadExhibit(containingElement, folder, size, itemsPerRow = 3) {
    // Add the exhibit.
    var exhibitId = "exhibit-" + folder;
    var exhibitItemClass = "exhibit-item-" + folder;
    containingElement.html("<div class='exhibit' id='" + exhibitId + "'></div>");

    // Add all the exhibit items.
    for (var i = 0; i < size; i++) {
      (i => {
        var imageId = "exhibit-item-" + folder + "-" + i;
        var imagePath = folder + "/" + i + ".png";

        // Add the image.
        $("#" + exhibitId).append(
          "<img class='exhibit-item " + exhibitItemClass + " exhibit-image' " + 
          "id='" + imageId + "' " + 
          "src='" + imagePath + "' />");

        // Allow the image to be opened up in a new tab after clicking it.
        $("#" + imageId).click(() => {
          window.open(imagePath, "_blank");
        });
      })(i);
    }

    // Adjust the width of each item.
    $("." + exhibitItemClass).width(calculateExhibitItemWidthPercentage(itemsPerRow) + "%");
  }

  function loadVimeoExhibit(containingElement, exhibitName, videoIds, itemsPerRow = 3) {
    // Add the exhibit.
    var exhibitId = "exhibit-" + exhibitName;
    var exhibitItemClass = "exhibit-item-" + exhibitName;
    containingElement.html("<div class='exhibit' id='" + exhibitId + "'></div>");

    // Add all the embedded videos.
    $.each(videoIds, (i, videoId) => {
      $("#" + exhibitId).append(
        "<div class='exhibit-item vimeo " + exhibitItemClass + "'>" +
          VIMEO_EMBED_PREFIX + videoId + VIMEO_EMBED_SUFFIX +
        "</div>");
    });

    // Adjust the width of each item.
    $("." + exhibitItemClass).width(calculateExhibitItemWidthPercentage(itemsPerRow) + "%");
  }

  function openDesignPage() {
    window.location.hash = "design";
    loadExhibit($("#content"), "design", /* size= */ 19);
  }

  function openAnimationPage() {
    window.location.hash = "animation";
    loadVimeoExhibit($("#content"), "animation", ANIMATION_VIMEO_VIDEO_IDS);
  }

  function openIllustrationPage() {
    window.location.hash = "illustration";
    loadExhibit($("#content"), "illustration", /* size= */ 11);
  }

  function openArtPage() {
    window.location.hash = "art";
    loadExhibit($("#content"), "art", /* size= */ 7);
  }

  function openProjectsPage() {
    window.location.hash = "projects";
    $("#content").load("projects.html", () => {
      loadExhibit($("#zeehaus-artifacts"), "zeehaus", /* size= */ 4, /* itemsPerFor= */ 4);
      loadExhibit($("#thesis-preproduction-artifacts"), "thesis-preproduction", /* size= */ 3);
      loadExhibit($("#thesis-final-design-artifacts"), "thesis-final-design", /* size= */ 2);
      loadVimeoExhibit($("#thesis-final-film"), "thesis-final-film", THESIS_VIMEO_VIDEO_IDS);
    });
  }

  function openAboutPage() {
    window.location.hash = "about";
    $("#content").load("about.html");
  }

  // ---- Start of script ----

  // Listen for browser navgation changes.
  window.addEventListener('popstate', event => {
    refreshState();
  });

  // Route to the correct page, or initialize the default page if nothing was specified.
  refreshState();

  // Define click handlers.
  $("#design").click(() => {
    openDesignPage();
  });
  $("#animation").click(() => {
    openAnimationPage();
  });
  $("#illustration").click(() => {
    openIllustrationPage();
  });
  $("#art").click(() => {
    openArtPage();
  });
  $("#projects").click(() => {
    openProjectsPage();
  });
  $("#about").click(() => {
    openAboutPage();
  });
  $("#resume").click(() => {
    window.open("https://docs.google.com/document/d/1VhogclEd0APy2J8nsYhuJUyV3vaSyDmMQxuzpjSjuYo/edit?usp=sharing");
  });

  // Easter egg.
  var quack = new Audio("quack.ogg");
  $("#nav-footer").click(() => {
    quack.play();
  });
});