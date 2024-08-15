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

  //   var navbarSelector = $("li.item a");
  // //if a navbar button is clicked, highlight it



  $(window).on("resize", function () {
    let targets = document.querySelectorAll('section');
    targets.forEach(target => {
      observer.observe(target);
    });
  });

  //if the user scrolls, highlight the corresponding navbar button, the one that is closest to the top
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
        document.removeEventListener("click", addEventListener("scroll", true));
        document.removeEventListener("mousedown", addEventListener("scroll", true));
        $("li.item a").each(function () { $(this).removeClass('selected'); });
        $("#nav-" + targetElement.id + " a").addClass('selected');
        var currentSection = "#nav-" + targetElement.id + " a";
      }
    });
  }, { threshold: 0.22 }); //test for best value


  $('li.item a').each(function () {
    $(this).on("click", function () {
      console.log("this was a click");
      $(this).addClass('selected');
      $(this).on('mouseout', function () {
        console.log("this was the mouse leaving after click");
        $(this).addClass('selected');
      });
    });

    $(this).on('mouseover', function () {
      console.log("this was a hover");
      $(this).addClass('selected');
      $(this).on('mouseout', function () {
        console.log("this was the mouse leaving after hover");
       $(this).removeClass('selected');
       backupSelect($(this));
      });
    });


    //if someone refreshed the page while in a section, this will highlight the correct button
    let targets = document.querySelectorAll('section');
    targets.forEach(target => {
      observer.observe(target);
    });

    
  });

  // $(window).on('load', function () {
  
  // })
  $(window).on("scroll", function () {
    let targets = document.querySelectorAll('section');
    targets.forEach(target => {
      observer.observe(target);
    });
    
  });

//if there is no navbar selected, it will select the last one selected
function backupSelect(lastSelected) {
  var navbarItems = Array.from($("li.item a"));
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