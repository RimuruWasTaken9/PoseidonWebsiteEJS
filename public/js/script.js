document.addEventListener('DOMContentLoaded', function () {

  if (window.location.hash) {
    // Remove the hash at the end of url
    history.replaceState(null, null, ' ');
  }
  const navItems = document.querySelectorAll('.nav-item a');
  navItems.forEach(function (sel) {
    sel.classList.remove('nav-selected');
  })

  switch (window.location.pathname) {

    ///////////////////////////////////////////
    //                 Home JS               //
    ///////////////////////////////////////////
    case '/':
    case '/home':
      document.querySelector('#nav-home a').classList.add('nav-selected');

      // Initialize the carousel
      var carouselElements = document.querySelectorAll('.customCarousel');
      carouselElements.forEach(function (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 4000
        });
      });

      // Handle the carousel thumbnails click
      var thumbnailSelectors = document.querySelectorAll('[id^=carousel-selector]');
      thumbnailSelectors.forEach(function (selector) {
        selector.addEventListener('click', function () {
          var id_selector = this.getAttribute('id');
          var id = id_selector.substr(id_selector.length - 1);
          id = parseInt(id);
          var carousel = bootstrap.Carousel.getInstance(document.getElementById('myCarousel'));
          carousel.to(id);
          thumbnailSelectors.forEach(function (sel) {
            sel.classList.remove('selected');
          });
          this.classList.add('selected');
        });
      });

      // When the carousel slides, auto update
      var myCarousel = document.getElementById('myCarousel');
      myCarousel.addEventListener('slid.bs.carousel', function () {
        var activeItem = myCarousel.querySelector('.carousel-item.active');
        var id = activeItem.getAttribute('data-slide-number');
        id = parseInt(id);
        thumbnailSelectors.forEach(function (selector) {
          selector.classList.remove('selected');
        });
        document.getElementById('carousel-selector-' + id).classList.add('selected');
      });
      break;

    ///////////////////////////////////////////
    //                 Menu JS               //
    ///////////////////////////////////////////
    case "/menu":
      document.querySelector('#nav-menu a').classList.add('nav-selected');


    //if a navbar button is clicked, highlight it
      var navbarSelector = updateSectionLocation();
      //const navbarSelector = document.querySelectorAll('li.item a');
      function updateSectionLocation() {
        let x = document.querySelectorAll('li.item a');
        return x
      }
      function removeSelected() {
        navbarSelector.forEach(button => button.classList.remove('selected'));
      }



      window.addEventListener('resize', function () {
        navbarSelector = updateSectionLocation();
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
            removeSelected();
            document.querySelector("#nav-" + targetElement.id + " a").classList.add('selected');
          }
        });
      }, { threshold: 0.22 }); //test for best value

     
      navbarSelector.forEach(function (selector) {
        selector.addEventListener('click', function () {
      console.log("counts as actual clicked");
          this.classList.add('selected');
        });
      });

    
      window.addEventListener("scroll", function () {
        let targets = document.querySelectorAll('section');
        targets.forEach(target => {
          observer.observe(target);
        });
      
      });
     
    
      break;

    ///////////////////////////////////////////
    //                 About JS              //
    ///////////////////////////////////////////
    case "/about":
      document.querySelector('#nav-about a').classList.add('nav-selected');
      
      break;

    default:
      break;
  }
});

