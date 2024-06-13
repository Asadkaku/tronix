
(function ($) {
  "use strict";
  /*=================================
    JS Index Here
  ==================================*/
  /*
 01. On Load Function
 02. Gsap configuration
 03. Mobile Menu Active
 04. Sidebar Menu Active
 05. Sticky fix
 06. My Swiper student slider
 07. Banner Image bg Circle , Middle Img Circle
 08. Swiper Banner
 09. My Swiper Student Feedback
 10. mySwiper Courses
 11. Count Down
 12. Counter
 13. MySwiper Logo
 14. Bottom To Top
 15. Video play Magnific Popup
 16. Search Option Box
 17. Progress Bar
 18. Event Slider
 19. My Swiper 2 Client
 20. Aos Animation
*/
  /*=================================
       JS Index End
   ==================================*/
  /*Gsap configuration*/
  gsap.config({
    nullTargetWarn: false,
  });
     /*---------- 03. Mobile Menu Active ----------*/
     $.fn.mobilemenu = function (options) {
      var opt = $.extend(
          {
              menuToggleBtn: ".menu-toggle",
              bodyToggleClass: "body-visible",
              subMenuClass: "submenu-class",
              subMenuParent: "submenu-item-has-children",
              subMenuParentToggle: "active-class",
              meanExpandClass: "mean-expand-class",
              appendElement: '<span class="mean-expand-class"></span>',
              subMenuToggleClass: "menu-open",
              toggleSpeed: 400,
          },
          options
      );

      return this.each(function () {
          var menu = $(this); // Select menu

          // Menu Show & Hide
          function menuToggle() {
              menu.toggleClass(opt.bodyToggleClass);

              // collapse submenu on menu hide or show
              var subMenu = "." + opt.subMenuClass;
              $(subMenu).each(function () {
                  if ($(this).hasClass(opt.subMenuToggleClass)) {
                      $(this).removeClass(opt.subMenuToggleClass);
                      $(this).css("display", "none");
                      $(this).parent().removeClass(opt.subMenuParentToggle);
                  }
              });
          }

          // Class Set Up for every submenu
          menu.find("li").each(function () {
              var submenu = $(this).find("ul");
              submenu.addClass(opt.subMenuClass);
              submenu.css("display", "none");
              submenu.parent().addClass(opt.subMenuParent);
              submenu.prev("a").append(opt.appendElement);
              submenu.next("a").append(opt.appendElement);
          });

          // Toggle Submenu
          function toggleDropDown($element) {
              if ($($element).next("ul").length > 0) {
                  $($element).parent().toggleClass(opt.subMenuParentToggle);
                  $($element).next("ul").slideToggle(opt.toggleSpeed);
                  $($element).next("ul").toggleClass(opt.subMenuToggleClass);
              } else if ($($element).prev("ul").length > 0) {
                  $($element).parent().toggleClass(opt.subMenuParentToggle);
                  $($element).prev("ul").slideToggle(opt.toggleSpeed);
                  $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
              }
          }

          // Submenu toggle Button
          var expandToggler = "." + opt.meanExpandClass;
          $(expandToggler).each(function () {
              $(this).on("click", function (e) {
                  e.preventDefault();
                  toggleDropDown($(this).parent());
              });
          });

          // Menu Show & Hide On Toggle Btn click
          $(opt.menuToggleBtn).each(function () {
              $(this).on("click", function () {
                  menuToggle();
              });
          });

          // Hide Menu On out side click
          menu.on("click", function (e) {
              e.stopPropagation();
              menuToggle();
          });

          // Stop Hide full menu on menu click
          menu.find("div").on("click", function (e) {
              e.stopPropagation();
          });
      });
  };

  $(".mobile-menu-wrapper").mobilemenu();

  /*---------- 03. Sidebar Menu Active ----------*/
  $.fn.sidebarmenu = function (options) {
      var opt = $.extend(
          {
              menuToggleBtn: ".sidemenu-toggle",
              bodyToggleClass: "body-visible",
              subMenuClass: "submenu-class",
              subMenuParent: "submenu-item-has-children",
              subMenuParentToggle: "active-class",
              meanExpandClass: "mean-expand-class",
              appendElement: '<span class="mean-expand-class"></span>',
              subMenuToggleClass: "menu-open",
              toggleSpeed: 400,
          },
          options
      );

      return this.each(function () {
          var menu = $(this); // Select menu

          // Menu Show & Hide
          function menuToggle() {
              menu.toggleClass(opt.bodyToggleClass);

              // collapse submenu on menu hide or show
              var subMenu = "." + opt.subMenuClass;
              $(subMenu).each(function () {
                  if ($(this).hasClass(opt.subMenuToggleClass)) {
                      $(this).removeClass(opt.subMenuToggleClass);
                      $(this).css("display", "none");
                      $(this).parent().removeClass(opt.subMenuParentToggle);
                  }
              });
          }

          // Class Set Up for every submenu
          menu.find("li").each(function () {
              var submenu = $(this).find("ul");
              submenu.addClass(opt.subMenuClass);
              submenu.css("display", "none");
              submenu.parent().addClass(opt.subMenuParent);
              submenu.prev("a").append(opt.appendElement);
              submenu.next("a").append(opt.appendElement);
          });

          // Toggle Submenu
          function toggleDropDown($element) {
              if ($($element).next("ul").length > 0) {
                  $($element).parent().toggleClass(opt.subMenuParentToggle);
                  $($element).next("ul").slideToggle(opt.toggleSpeed);
                  $($element).next("ul").toggleClass(opt.subMenuToggleClass);
              } else if ($($element).prev("ul").length > 0) {
                  $($element).parent().toggleClass(opt.subMenuParentToggle);
                  $($element).prev("ul").slideToggle(opt.toggleSpeed);
                  $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
              }
          }

          // Submenu toggle Button
          var expandToggler = "." + opt.meanExpandClass;
          $(expandToggler).each(function () {
              $(this).on("click", function (e) {
                  e.preventDefault();
                  toggleDropDown($(this).parent());
              });
          });

          // Menu Show & Hide On Toggle Btn click
          $(opt.menuToggleBtn).each(function () {
              $(this).on("click", function () {
                  menuToggle();
              });
          });

          // Hide Menu On out side click
          menu.on("click", function (e) {
              e.stopPropagation();
              menuToggle();
          });

          // Stop Hide full menu on menu click
          menu.find("div").on("click", function (e) {
              e.stopPropagation();
          });
      });
  };

  $(".sidebar-menu-wrapper").sidebarmenu();

  /*---------- 04. Sticky fix ----------*/
  $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 500) {
          $('.sticky-wrapper').addClass('sticky');
      } else {
          $('.sticky-wrapper').removeClass('sticky')
      }
  })

  /*---------- 04. Sticky fix ----------*/
  $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 920) {
          $('.sticky-wrapper2').addClass('sticky');
      } else {
          $('.sticky-wrapper2').removeClass('sticky')
      }
  })


  if ($(".canva-open").length) {
    $(".canva-open").on("click", function(e) {
        e.preventDefault();
        $(".canva-wrapper").toggleClass("active");
        $("body").toggleClass("locked");
    });
}

  // Header Search
  // if ($(".search-open").length) {
  //   $(".search-open").on("click", function (e) {
  //     e.preventDefault();
  //     $(".header-search-popup").toggleClass("active");
  //     $("body").toggleClass("locked");
  //   });
  // }
  // Video Post PopUp
  // if ($('.video-popup').length) {
  //     $('.video-popup').magnificPopup({
  //         disableOn: 700,
  //         type: 'iframe',
  //         mainClass: 'mfp-fade',
  //         removalDelay: 160,
  //         preloader: false,
  //         fixedContentPos: false
  //     });
  // }
  // // Post gallery 
  // if ($('.post-gallerys').length) {
  //     $('.post-gallerys').slick({
  //         dots: false,
  //         infinite: true,
  //         speed: 700,
  //         cssEase: 'linear',
  //         autoplay: true,
  //         autoplaySpeed: 2000,
  //     });
  // }
  // Limit Post Navication Title 
  // if ($('.post-nav-container p').length) {
  //     $('.post-nav-container p').text($('.post-nav-container p').text().substring(0, 40));
  // }

  // $(window).on("load", function() {
  //     if ($(".preloader-area").length) {
  //         $(".preloader-area").fadeOut();
  //     }
  // });

  // if ($('.woo-spimg').length) {
  //     $('.woo-spimg').magnificPopup({
  //         delegate: 'a',
  //         type: 'image',
  //         mainClass: 'mfp-zoom-out', // this class is for CSS animation below
  //         gallery: { enabled: true },
  //         zoom: {
  //             enabled: true,
  //             duration: 300,
  //             easing: 'ease-in-out',
  //             opener: function(openerElement) {
  //                 return openerElement.is('img') ? openerElement : openerElement.find('img');
  //             }
  //         }
  //     });
  // }
  // if ($('.woo-product-big-img').length) {
  //     $('.woo-product-big-img').slick({
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //         fade: true,
  //         asNavFor: '.woo-product-small-img'
  //     });
  // }
  // if ($('.woo-product-small-img').length) {
  //     $('.woo-product-small-img').slick({
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         asNavFor: '.woo-product-big-img',
  //         dots: true,
  //         arrows: false,
  //         focusOnSelect: true,
  //         centerMode: true,
  //         centerPadding: '60px',
  //     });
  // }
  // if ($('#tronix-shop-view-mode li').length) {
  //     $('#tronix-shop-view-mode li').on('click', function() {
  //         $('body').removeClass('tronix-product-grid-view').removeClass('tronix-product-list-view');

  //         if ($(this).hasClass('tronix-shop-list')) {
  //             $('body').addClass('tronix-product-list-view');
  //             Cookies.set('tronix-shop-view', 'list');
  //         } else {
  //             $('body').addClass('tronix-product-grid-view');
  //             Cookies.remove('tronix-shop-view');
  //         }
  //         return false;
  //     });
  // }
  // if ($('#related-portfolio').length) {
  //     $("#related-portfolio").slick({
  //         slidesToShow: 4,
  //         slidesToScroll: 5,
  //         dots: false,
  //         arrows: true,
  //         prevArrow: $(".tp-related-portfolio-prev"),
  //         nextArrow: $(".tp-related-portfolio-next"),
  //         infinite: true,
  //         autoplay: true,
  //         autoplaySpeed: 4000,
  //         speed: 4000,
  //         responsive: [{
  //                 breakpoint: 1441,
  //                 settings: {
  //                     slidesToShow: 4,
  //                     slidesToScroll: 2,
  //                 }
  //             },

  //             {
  //                 breakpoint: 1200,
  //                 settings: {
  //                     slidesToShow: 3,
  //                     slidesToScroll: 2,
  //                 }
  //             },

  //             {
  //                 breakpoint: 1024,
  //                 settings: {
  //                     slidesToShow: 2,
  //                     slidesToScroll: 2,
  //                 }
  //             },

  //             {
  //                 breakpoint: 575,
  //                 settings: {
  //                     slidesToShow: 1,
  //                     slidesToScroll: 1
  //                 }
  //             }
  //         ]
  //     });
  // }

  /*============================================
     Banner Image bg Circle , Middle Img Circle
    ============================================*/
  $(document).ready(function () {
    function rotateBannerCircle() {
      gsap.to("#banner-img-bg-circle, .middle-img-circle", {
        rotation: 360,
        ease: "none",
        duration: 20,
        repeat: -1,
        onComplete: rotateBannerCircle // Restart the animation
      });
    }
    rotateBannerCircle(); // Start the animation initially
  });


  /*============================
     Count Down
    ============================*/
  $('.getting-started').countdown('2024/07/01', function (event) {
    $(this).html(event.strftime('<div class="single-countdown"><h2 class="count-title">%D</h2><span class="count-para">Days</span></div><div class="single-countdown"><h2 class="count-title">%H</h2><span class="count-para">hour</span></div><div class="single-countdown"><h2 class="count-title">%M</h2><span class="count-para">min</span></div><div class="single-countdown"><h2 class="count-title">%S</h2><span class="count-para">second</span></div>'));
  });

  /*============================
     Counter
    ============================*/
  $(document).ready(function () {
    $(".counter").counterUp({
      delay: 10,
      time: 1500,
      offset: 100
    });
  })


  /*============================
      Bottom To Top
    =============================*/
  const toTop = document.querySelector(".to-top");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      toTop.classList.add("active");
    }
    else {
      toTop.classList.remove("active");
    }
  })


  /*============================
      Video play Magnific Popup
     ============================*/
  $(document).ready(function () {
    $('.youtube').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
  });


  /*============================
      Search Option Box
    ============================*/
  $(document).ready(function () {
    function toggleSearchBox() {
      let inputBox = $('.search-option-box');
      let searchIcon = $('.search');
      let closeIcon = $('.close-icon');

      // -------- Open Input -------- //
      searchIcon.on('click', function () {
        inputBox.addClass('open');
      });

      // -------- Close Input -------- //
      closeIcon.on('click', function () {
        inputBox.removeClass('open');
      });
    }
    toggleSearchBox(); // Call the function to set up the event handlers
  });

  /*============================
        Progress Bar
    ============================*/
  $(document).ready(function () {
    const $progressElements = $(".my-progress-bar .progress-vale");

    function animateElement() {
      $progressElements.each(function () {
        anime({
          targets: this,
          width: [
            `${parseInt(this.dataset.progressMinWidth)}%`,
            `${parseInt(this.dataset.progressMaxWidth)}%`,
          ],
          easing: "linear",
          duration: parseInt(this.dataset.progressDuration) || 1000,
          delay: parseInt(this.dataset.progressDelay) || 500,
        });
      });
    }

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function handleScroll() {
      $progressElements.each(function () {
        if (isElementInViewport(this)) {
          animateElement();
          $(window).off("scroll", handleScroll);
        }
      });
    }

    $(window).on("scroll", handleScroll);
  });


  /*============================
        My Swiper 2 Client
    ============================*/
  $(document).ready(function () {
    var swiper = new Swiper(".mySwiper-client", {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2-client", {
      spaceBetween: 10,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  });

  /*============================
      Aos Animation
    ============================*/
  $(document).ready(function () {
    AOS.init();
  });

})(jQuery);
