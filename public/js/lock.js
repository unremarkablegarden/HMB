$(function() {
  // Cookies.remove('hartmannevents');

  window.addEventListener('push', function(e){
    checkLock();
  });

  function checkLock() {
    var locked = $('.locked');
    var unlockedCookie = Cookies.get('hartmannevents'+pw);
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
            Cookies.set('hartmannevents'+pw, 'unlocked', { expires: 14 });
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


  var homeHelp = addToHomescreen({
     startDelay: 0,
     displayPace: 0,
     maxDisplayCount: 0,
     modal: true,
     lifespan: 0,
     autostart: false
  });

});
