(() => {
  // ---- Constants ----

  var DESKTOP_FONT_SIZE_VMIN = "2.4vmin";
  var MOBILE_FONT_SIZE_VMIN = "4.0vmin";
  var NAV_ANIMATION_DURATION_MS = 240;
  var VIMEO_EMBED_PREFIX = "<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://player.vimeo.com/video/"
  var VIMEO_EMBED_SUFFIX = "?playsinline=0' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>"
  var ANIMATION_VIMEO_VIDEO_IDS = ["273060713", "283148908", "227518868", "217353881"];
  var THESIS_VIMEO_VIDEO_IDS = ["273060713"];

  // ---- Functions ----

  function isMobile() {
    return $(window).width() < $(window).height();
  }

  function showNavMenu() {
    $(".nav").show(NAV_ANIMATION_DURATION_MS);
    $(".content-overlay").fadeIn(NAV_ANIMATION_DURATION_MS);
  }

  function hideNavMenu() {
    $(".content-overlay").fadeOut(NAV_ANIMATION_DURATION_MS);
    $(".nav").hide(NAV_ANIMATION_DURATION_MS);
  }

  function toggleNavMenu() {
    if ($(".nav").is(":hidden")) {
      showNavMenu();
    } else {
      hideNavMenu();
    }
  }

  function updateNavigationMode() {
    if (isMobile()) {
      var mobileHeaderPadding = $(".nav-mobile-header").outerHeight();

      $("html").css("font-size", MOBILE_FONT_SIZE_VMIN);
      $(".content-nav-mobile-header-padder").height(mobileHeaderPadding);
      $(".content-nav-padder").width(0);
      $(".nav-desktop-optionals").hide();
      $(".nav").hide();
      $(".nav-mobile-header-padder").height(mobileHeaderPadding);
      $(".nav-mobile-header").show();
    } else {
      $("html").css("font-size", DESKTOP_FONT_SIZE_VMIN);
      $(".content-nav-mobile-header-padder").height(0);
      $(".content-nav-padder").width($(".nav").outerWidth());
      $(".nav-desktop-optionals").show();
      $(".nav").show();
      $(".nav-mobile-header-padder").height(0);
      $(".nav-mobile-header").hide();
    }
    $(".content-overlay").hide();
  }

  function refreshContent() {
    if (isMobile()) {
      hideNavMenu();
    }

    // Stop loading any pending images.
    $("#content").find("img").attr("src", "");

    // Clear the content div.
    $("#content").empty();

    // Determine what to put inside the div.
    switch (window.location.hash) {
      case "#graphic-design":
        openGraphicDesignPage();
        break;
      case "#animation":
        openAnimationPage();
        break;
      case "#illustration":
        openIllustrationPage();
        break;
      case "#projects":
        openProjectsPage();
        break;
      case "#about":
        openAboutPage();
        break;
      default:
        // If the hash is empty or unrecognized, go ahead and open the Graphic Design page.
        window.location.hash = "graphic-design";
        openGraphicDesignPage();
    }
  }

  function resizeExhibitItems(containerId, itemClass, itemsPerRow) {
    $("." + itemClass).outerWidth($("#" + containerId).width() / itemsPerRow);
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
    resizeExhibitItems(exhibitId, exhibitItemClass, itemsPerRow);
    $(window).resize(() => {
      resizeExhibitItems(exhibitId, exhibitItemClass, itemsPerRow);
    });
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
    resizeExhibitItems(exhibitId, exhibitItemClass, itemsPerRow);
    $(window).resize(() => {
      resizeExhibitItems(exhibitId, exhibitItemClass, itemsPerRow);
    });
  }

  function openGraphicDesignPage() {
    $("#content").load("graphic-design.html", () => {
      loadExhibit($("#zeehaus-process-1-artifacts"), "zeehaus-process-1", /* size= */ 1);
      loadExhibit($("#zeehaus-process-2-artifacts"), "zeehaus-process-2", /* size= */ 1);
      loadExhibit($("#zeehaus-process-3-artifacts"), "zeehaus-process-3", /* size= */ 1);
      loadExhibit($("#zeehaus-final-artifacts"), "zeehaus-final", /* size= */ 3);
      loadExhibit($("#pigs-when-seams-fly-artifacts"), "pigs-when-seams-fly", /* size= */ 4, /* itemsPerRow= */ 4);
      loadExhibit($("#yoon-vintage-artifacts"), "yoon-vintage", /* size= */ 4, /* itemsPerRow= */ 4);
      loadExhibit($("#miscellaneous-artifacts"), "miscellaneous", /* size= */ 1);
    });
  }

  function openAnimationPage() {
    $("#content").load("animation.html", () => {
      loadVimeoExhibit($("#animation-content"), "animation", ANIMATION_VIMEO_VIDEO_IDS, /* itemsPerRow= */ 2);
    });
  }

  function openIllustrationPage() {
    $("#content").load("illustration.html", () => {
      loadExhibit($("#illustration-content"), "illustration", /* size= */ 7);
    });
  }

  function openProjectsPage() {
    $("#content").load("projects.html", () => {
      loadExhibit($("#zeehaus-artifacts"), "zeehaus", /* size= */ 2);
      loadExhibit($("#thesis-preproduction-artifacts"), "thesis-preproduction", /* size= */ 3);
      loadExhibit($("#thesis-final-design-artifacts"), "thesis-final-design", /* size= */ 2);
      loadVimeoExhibit($("#thesis-final-film"), "thesis-final-film", THESIS_VIMEO_VIDEO_IDS);
    });
  }

  function openAboutPage() {
    $("#content").load("about.html");
  }

  // ---- Start of script ----

  // Listen for window resizes.
  $(window).resize(() => {
    updateNavigationMode();
  });
  updateNavigationMode();

  // Listen for browser navgation changes.
  window.addEventListener('popstate', event => {
    refreshContent();
  });

  // Route to the correct page, or initialize the default page if nothing was specified.
  refreshContent();

  // Define click handlers.
  $(".nav-mobile-menu-button").click(() => {
    toggleNavMenu();
  });

  $(".content-overlay").click(() => {
    hideNavMenu();
  });

  $("#graphic-design").click(() => {
    window.location.hash = "graphic-design";
    refreshContent();
  });
  $("#animation").click(() => {
    window.location.hash = "animation";
    refreshContent();
  });
  $("#illustration").click(() => {
    window.location.hash = "illustration";
    refreshContent();
  });
  $("#projects").click(() => {
    window.location.hash = "projects";
    refreshContent();
  });
  $("#about").click(() => {
    window.location.hash = "about";
    refreshContent();
  });
  $("#resume").click(() => {
    window.open("Angela Alberto - Resume.pdf");
  });

  // Easter egg.
  var quack = new Audio("quack.ogg");
  $("#nav-footer").click(() => {
    quack.play();
  });
})();