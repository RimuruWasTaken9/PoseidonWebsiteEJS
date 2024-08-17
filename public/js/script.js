document.addEventListener('DOMContentLoaded', function () {

  if (window.location.hash) {
    // Remove the hash at the end of url
    history.replaceState(null, null, ' ');
  }
  $('.nav-item a').each(function () {
    $(this).removeClass('nav-selected');
  })
  var currentPage = window.location.pathname;
  switch (currentPage) {

    case '/':
    case '/home':

      homePageScripts();
      break;


    case "/menu":

      menuPageScripts();
      break;


    case "/about":

      aboutPageScripts();
      break;

    default:
      break;
  }
});


///////////////////////////////////////////
//                 Home JS               //
///////////////////////////////////////////
function homePageScripts() {
  $('#nav-home a').addClass('nav-selected');

  $(document).ready(function () {
    // Initialize the carousel
    $('.customCarousel').carousel({
      interval: 4000
    });

    // Handle the carousel thumbnails click
    $('[id^=carousel-selector]').click(function () {
      var id_selector = $(this).attr('id');
      var id = id_selector.substr(id_selector.length - 1);
      id = parseInt(id);
      $('#myCarousel').carousel(id);
      $('[id^=carousel-selector-]').removeClass('selected');
      $(this).addClass('selected');
    });

    // When the carousel slides, auto update
    $('#myCarousel').on('slid.bs.carousel', function () {
      var id = $('.carousel-item.active').data('slide-number');
      id = parseInt(id);
      $('[id^=carousel-selector-]').removeClass('selected');
      $('#carousel-selector-' + id).addClass('selected');
    });
  });

}

///////////////////////////////////////////
//                 Menu JS               //
///////////////////////////////////////////
function menuPageScripts() {
  $('#nav-menu a').addClass('nav-selected');

  var windowWidth = $(window).width();
  $(window).on("resize load", function () {
    windowWidth = $(window).width();

  });
  
  if (windowWidth > 768) {
    $(window).on("resize load", function () {
      windowWidth = $(window).width();
    });

    $(window).on("load", sectionObserver);

    $(window).on("scroll", onScrollFunction);

    $("li.item a").each(function () {
      $(this).on("click", onClickFunction($(this)));
      $(this).on('mouseover', onMouseOverFunction($(this)));
    });
  }


  let observer = new IntersectionObserver((entries, observer) => {
    let topMostEntry = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        if (!topMostEntry || entry.boundingClientRect.top < topMostEntry.boundingClientRect.top) {
          topMostEntry = entry;
        }
      }
      if (topMostEntry) {
        let targetElement = topMostEntry.target;
        $("li.item a").each(function () { $(this).removeClass('selected'); });
        $("#nav-" + targetElement.id + " a").addClass('selected');
        var currentSection = "#nav-" + targetElement.id + " a";
      }
    });
  }, { threshold: 0.22 }); //test for best value
  function onClickFunction(clickedButton) {
    $(clickedButton).addClass('selected');

  }

  function onMouseOverFunction(hoveredButton) {
    $(hoveredButton).addClass('selected');
    $(hoveredButton).on('mouseout', onMouseOutFunction($(hoveredButton)));
  }
  function onMouseOutFunction(hoveredButton) {
    $(hoveredButton).removeClass('selected');
    backupSelect($(hoveredButton));

  }
  function onScrollFunction() {
    sectionObserver();
  }
  function sectionObserver() {
    let targets = $('section');
    targets.each(function (i, target) {
      observer.observe(target);
    });
  }


  //if there is no navbar selected, it will select the last one selected
  function backupSelect(lastSelected) {
    let navbarItems = Array.from($("li.item a"));
    if (!(navbarItems.some(x => x.classList.contains('selected')))) {
      $(lastSelected).addClass('selected');
    }
  }

}
///////////////////////////////////////////
//                 About JS              //
///////////////////////////////////////////
function aboutPageScripts() {

  $('#nav-about a').addClass('nav-selected');
}