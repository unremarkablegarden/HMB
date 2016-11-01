$(function() {
  // var fb = new FingerBlast ('a');

  // $(document).on('click', 'a[href]', function(event) {
  //   event.preventDefault();
  // });

  addToHomescreen({
     startDelay: 1,
     displayPace: 60,
     maxDisplayCount: 2,
     message: 'HB Event-App installieren',
     modal: true,
     lifespan: 60,
     animationIn: 'fade',
     animationOut: 'fade'
  });

  // re-bind jquery shit when push has loaded new pages
  window.addEventListener('push', function(e){
    console.log('push');
    menuTapFX();
    oldiPhoneHaxx();
    aScroll();
    backToTop();
    hidePopOver();
    mediaSwitch();
  });

  function hidePopOver() {
    $('#popover a').on('click touchend', function(){
      if( $('#popover').hasClass('visible') ) {
        $('#popover').hide();
        $('.backdrop').remove();
      }
    });
  }
  hidePopOver();

  function oldiPhoneHaxx() {
    var userAgent = window.navigator.userAgent;
    if( userAgent.match(/iPhone/i) && userAgent.match(/version\/7/i) ) {
      var oldiPhone = true;
      $('.menu.home').css('position', 'relative');
      $('.index.akteure').hide();
    }
  }
  oldiPhoneHaxx();

  function aScroll() {
    $('a[href*="#"]:not([href="#"])').unbind('click').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          // $('.content').animate({
          $(this).closest('.content').animate({
            scrollTop: target.offset().top - 60
          }, 500);
          return false;
        }
      }
    });
  }
  aScroll();

  function backToTop() {
    if( $('.tab-item').hasClass('backToTop') ) {
      var btt = $('.backToTop').closest('nav');
      btt.animate({'bottom': '-60px'}, 250);
      btt.unbind('touchstart').bind('touchstart', function(){
        $('.content').animate({
          scrollTop: 0
        }, 350);
      });
      $('.content').unbind('scroll').on('scroll', function(){
        var scrolled = $(this).scrollTop();
        var thresh = 200;
        var hideDistance = 60;
        if(scrolled < thresh ) {
          var bottom = -hideDistance + ((scrolled / thresh) * hideDistance);
          btt.css('bottom', bottom);
        }
        else if(scrolled > thresh) {
          btt.css('bottom', 0);
        }
      });
    }
    else {
      $('nav.bar.bar-tab').animate({'bottom': 0 }, 250);
    }
  }
  backToTop();

  function menuTapFX() {
    $('.menu-item').unbind();
    $(document).on('click touchstart', '.menu-item', function(e){
      var t = $(this);
      t.addClass('touched');
      window.setTimeout(function(){
        t.removeClass('touched');
      }, 60);
    });
  }
  menuTapFX();

  function mediaSwitch() {
    var welcome = $('.welcome')
    var photosTab = $('.tab-item.photos-tab');
    var videosTab = $('.tab-item.videos-tab');
    photosTab.unbind().on('touchstart', function(e) {
      if( ! photosTab.hasClass('active') ) {
        $('.tab-item.active').removeClass('active');
        photosTab.addClass('active')
        $('.open').animate({ 'right': '100vw' }, 350, function(){
          $(this).css('right', '-100vw');
        }).removeClass('open');
        $('.photos').show().animate({ 'right': 0 }, 350).addClass('open');
      }
      e.preventDefault();
    });
    videosTab.unbind().on('touchstart', function(e) {
      if( ! videosTab.hasClass('active') ) {
        $('.tab-item.active').removeClass('active');
        videosTab.addClass('active')
        $('.open').animate({ 'right': '100vw' }, 350, function(){
          $(this).css('right', '-100vw');
        }).removeClass('open');
        $('.videos').show().animate({ 'right': 0 }, 350).addClass('open');
      }
      e.preventDefault();
    });
  }
  mediaSwitch();

});

// function loader(action) {
//   var speed = 300;
//   if(action == 'show') $('.loader').stop().fadeIn(speed);
//   if(action == 'hide') $('.loader').stop().fadeOut(speed);
// }

// -----------------------------------------------------
// Barba.Pjax.cacheEnabled = true;
// Barba.Prefetch.init();
//
// Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
// Barba.Pjax.preventCheck = function(evt, element) {
//   if (!Barba.Pjax.originalPreventCheck(evt, element)) { return false; }
//   if (/.pdf/.test(element.href.toLowerCase())) { return false; }
//   if (/keystone/.test(element.href.toLowerCase())) { return false; }
//   return true;
// };
//
// Barba.Dispatcher.on('linkClicked', function() {
//   loader('show');
// });
//                   // transitionCompleted
// Barba.Dispatcher.on('newPageReady', function() {
//   loader('hide');
// });
//
// Barba.Pjax.start();




// var photosButton = $('.photos-button');
// var videosButton = $('.videos-button');
// photosButton.unbind().on('touchstart', function(e) {
//   photosTab.addClass('active')
//   welcome.animate({ 'left': '-100vw' }, 350).removeClass('open');
//   $('.photos').show().animate({ 'right': 0 }, 350).addClass('open');
//   e.preventDefault();
// });
// videosButton.unbind().on('touchstart', function(e) {
//   videosTab.addClass('active')
//   welcome.animate({ 'right': '100vw' }, 350).removeClass('open');
//   $('.videos').show().animate({ 'right': 0 }, 350).addClass('open');
//   e.preventDefault();
// });
