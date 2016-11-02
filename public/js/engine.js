
$(function() {
  // Cookies.remove('hartmannevents');

  // var fb = new FingerBlast ('a');

  // $(document).on('click', 'a[href]', function(event) {
  //   event.preventDefault();
  // });

  // re-bind jquery shit when push has loaded new pages
  window.addEventListener('push', function(e){
    menuTapFX();
    oldiPhoneHaxx();
    aScroll();
    backToTop();
    hidePopOver();
    mediaSwitch();
    checkLock();
    bindHelp();
    programmView();
  });

  var homeHelp = addToHomescreen({
     startDelay: 0,
     displayPace: 0,
     maxDisplayCount: 0,
     modal: true,
     lifespan: 0,
     autostart: false
  });

  function bindHelp() {
    var help = $('a.help');
    help.unbind('click').click(function(e){ e.preventDefault(); }).on('click', function() { homeHelp.show(); });
    if(window.navigator.standalone) help.remove();
  }
  bindHelp();

  function programmView() {
    $('.programmViewMenu a').click(function(e){
      e.preventDefault();
    });
    $('.programmViewMenu a').on('touchend', function(e) {
      var t = $(this);
      var p = t.closest('.tab-item');
      if( ! p.hasClass('active')) {
        var iv = $('.item-view');
        var tv = $('.time-view');
        // change view
        if(t.hasClass('itemview')) {
          tv.fadeOut(300, function(){
            iv.fadeIn(300);
          });
        }
        else if(t.hasClass('timeview')) {
          iv.fadeOut(300, function(){
            tv.fadeIn(300);
          });
        }
      }
      // update menu
      $('.programmViewMenu.tab-item').removeClass('active');
      p.addClass('active');
    });
  }
  programmView();

  function checkLock() {
    var pw = 'hbhv';
    var locked = $('.locked');
    var unlockedCookie = Cookies.get('hartmannevents');
    if( unlockedCookie == 'unlocked') {
      locked.hide();
    }
    else {
      unlockedCookie = 'locked';
      locked.show();

      $('.locked input').unbind().bind('change paste input', function(){
        var t = $(this);
        var vallength = t.val().length;
        if (vallength == 4) {
          if(t.val() == pw) {
            // hide onscreen keyboard
            t.blur()
            // write cookie
            Cookies.set('hartmannevents', 'unlocked', { expires: 14 });
            // hide lock screen
            $('.unlocker').addClass('unlockit');
            window.setTimeout(function() {
              $('.locked').fadeOut(500);
            }, 500);
            // show home screen help
            homeHelp.show();
          }
          else {
            t.shake(2, 10, 500).val('');
          }
        }
      });
    }
  }
  checkLock();


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
      var btt = $('nav.bar.bar-tab.btt')
      btt.unbind('touchend').bind('touchend', function(){
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
    $('.menu-item').removeClass('touched').unbind();
    $(document).on('touchstart', '.menu-item', function(e){
      var t = $(this);
      t.addClass('touched');
      // window.setTimeout(function(){
      //   t.removeClass('touched');
      // }, 60);
    });
  }
  // menuTapFX();

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


jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
    this.each(function() {
        $(this).css("position","relative");
        for (var x=1; x<=intShakes; x++) {
        $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
    .animate({left:intDistance}, ((intDuration/intShakes)/2))
    .animate({left:0}, (((intDuration/intShakes)/4)));
    }
  });
  return this;
};

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
