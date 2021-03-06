
$(function() {

  function bindDesktopLinks() {
    var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    ismobile2 =
    navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    if( ! ismobile && ! ismobile2 ) {
      $('a').each(function(){
        var ignore = $(this).data('ignore');
        if(ignore !== 'push') {
          $(this).one('click', function() {
                    var href = $(this).attr('href');
                    var transition = $(this).data('transition');
                    PUSH({url: href, transition: transition});
                  });
        }
      });
    }
  }
  bindDesktopLinks();

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
    bindHelp();
    programmView();
    redlineTimer();
    pdfView();
    bindDesktopLinks();
    togglePDF();
    fuckModals();
    bindBackbutton();
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

  function bindBackbutton() {
    var thisURL = window.location.href;
    thisURL = thisURL.replace(/\/$/, '');
    var goback = thisURL.replace(/[^\/]+$/,'');
    console.log('backbutton dynamic link = \n' + goback);
    $('.backButton').attr('href', goback);
  }
  bindBackbutton();

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
          tv.hide();
          iv.show();
        }
        else if(t.hasClass('timeview')) {
          iv.hide();
          tv.show();
        }
        $('.pdf-viewer').hide();
      }
      // update menu
      $('nav .tab-item').removeClass('active');
      p.addClass('active');
    });
  }
  programmView();

  function pdfView() {
    $('a.pdfview').click(function(e){
      e.preventDefault();
    });
    $('a.pdfview').unbind('touchend').on('touchend', function(e){
      //  http://docs.google.com/gview?url=http://events.hartmannbund.de/files/Programm.pdf&embedded=true
      // var pdf = $(this).attr('href');
      // var viewer = $('.pdf-viewer');
      // viewer.find('embed').attr('src', pdf);
      // viewer.show();
      var viewer = $('.pdf-viewer');
      var nav = $('nav.bar-tab');
      nav.find('.tab-item').removeClass('active');
      if( viewer.is(':hidden') ) {
        viewer.show();
        $('.view').hide();
        nav.find('.pdf').addClass('active');
      }
    });
  }
  pdfView();


  function redline() {
    // format('DMYYYY')
    var today = new Date();
    var D = today.getDate();
    var M = today.getMonth()+1;
    var Y = today.getFullYear();
    var hh = today.getHours();
    var todayString = String(D) + String(M) + String(Y);
    // var todayString = "4112016";
    // select today
    // $('h5[data-date="'+todayString+'"]').each(function(){
    $('.time-view .table-view-divider h5').each(function() {
      var titleDate = $(this).data('date');
      // console.log(titleDate+ ' / '+ todayString);

      if(titleDate && titleDate == todayString) {
        var niceDate = String(M)+"-"+String(D)+"-"+String(Y);
        var midnight = new Date(niceDate);
        var midnight = new Date(Y, (M-1), D);
        // alert(midnight);
        var minFromMidnightNow = (today-midnight)/1000/60; // min
        var minFromMidnightTo930 = 570; // min
        var passed = minFromMidnightNow - minFromMidnightTo930; // min since 930
        // 30px = 15 min
        var res = 20/15;
        var move = passed * res;
        // var headerH = $(this).closest('.table-view-divider').outerHeight();
        var headerH = 48;
        // move = move + headerH;
        move = headerH + move;
        // max 540 min
        if(passed > 0 && passed < 540) {
          $(this).parent().find('.redline').css({ 'top': move }).show();
        }
      }
    });
  }
  function redlineTimer() {
    redline();
    clearInterval(updateRedline);
    var updateRedline = setInterval(function() {
      redline();
    }, 60 * 1000);
  }
  redlineTimer();



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
      console.log('aScroll click triggered');
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          // $('.content').animate({
          var currentScroll = $(this).closest('.content').scrollTop();
          if(!currentScroll) {
            var noThis = true;
            currentScroll = $('.content').scrollTop();
          }
          var distance = (target.offset().top - 60) + currentScroll;
          // console.log(currentScroll + ', ' + distance);
          if(noThis) {
            $('.content').animate({
              scrollTop: distance
            }, 500);
          }
          else {
            $(this).closest('.content').animate({
              scrollTop: distance
            }, 500);
          }
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
    var welcome = $('.welcome');
    var photosTab = $('.tab-item.photos-tab');
    var videosTab = $('.tab-item.videos-tab');
    var filesTab = $('.tab-item.files-tab');

    photosTab.unbind().on('touchstart', function(e) {
      if( ! photosTab.hasClass('active') ) {
        $('.tab-item.active').removeClass('active');
        photosTab.addClass('active')
        $('.open').animate({ 'right': '100vw' }, 350, function(){
          $(this).css('right', '-100vw');
        }).removeClass('open');
        $('.photos').show().animate({ 'right': 0 }, 350).addClass('open');
      }
      $('.welcome_info:visible').hide()
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
      $('.welcome_info:visible').hide()
      e.preventDefault();
    });

    filesTab.unbind().on('touchstart', function(e) {
      if( ! filesTab.hasClass('active') ) {
        $('.tab-item.active').removeClass('active');
        filesTab.addClass('active')
        $('.open').animate({ 'right': '100vw' }, 350, function(){
          $(this).css('right', '-100vw');
        }).removeClass('open');
        $('.files').show().animate({ 'right': 0 }, 350).addClass('open');
      }
      $('.welcome_info:visible').hide()
      e.preventDefault();
    });
    // $('.files a').bind('touchstart', function(e) {
    //   $(this).trigger('click');
    //   e.preventDefault();
    // });
  }
  mediaSwitch();

  function fuckModals() {
    $('.galleries .photos a').on('touchend', function(){
      $('header:first').hide();
      $('.photovideotabs').hide();
    });
    $('.modal a.icon-close').on('touchend', function(){
      $('header:first').show();
      $('.photovideotabs').show();
    });
  }
  fuckModals();



});

function togglePDF() {
  $('.unterlage .tab-item.pdf').unbind().one('touchend', function(){
    var t = $(this);
    var pdf = t.data('pdf');
    var content = $('.content.unterlage');
    var text = $('.content.unterlage div.table-view.card');
    console.log(pdf);
    var iframe = $("<iframe frameborder=0 style='height: "+content.height()+"px; width: 100%;'/>")
      .attr('src', pdf);
    text.hide();
    content.append(iframe);
    t.removeClass('active');
  });
}
togglePDF();


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
