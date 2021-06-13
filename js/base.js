$(function(){

    function trapFocus(tgPopup) {
        var tabbable = tgPopup.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');        
        var firstTabbable = tabbable.first();
        var lastTabbable = tabbable.last();
        firstTabbable.focus();
      
        lastTabbable.on('keydown', function (e) {
            if ((e.which === 9 && !e.shiftKey)) {
                e.preventDefault();
                firstTabbable.focus();
            }
         });

         firstTabbable.on('keydown', function (e) {
            if ((e.which === 9 && e.shiftKey)) {
                e.preventDefault();
                lastTabbable.focus();
            }
        });
      }

    var popID,
        cb,
        tgPopup,
        focusBkEl,
        focusBack,
        highestZIndex;

    openAlert = function(popID, cb) {        
        tgPopup = $('#'+popID);
        tgPopup
            .fadeIn()
            .find('.popup-container').addClass('ani-on').attr('tabindex', '0').focus();

        highestZIndex = setLastZIndex();
        tgPopup.css('z-index', highestZIndex);
        
        trapFocus(tgPopup);
        $('body').addClass('locked');
    }

    closeAlert = function(popID, cb) {
        tgPopup = $('#'+popID);
        tgPopup
            .hide()
            .find('.popup-container').attr('tabindex', '');

        $(document).find('[data-focus-back="'+popID+'"]').focus();
    }

    setLastZIndex = function(){
        var increaseNum = 10, 
            lastPopupZIndex = 900,
            visPopups;

        visPopups = $('.popup').filter(':visible').length - 1;

        if(visPopups > 0 ) {            
            lastPopupZIndex = lastPopupZIndex + (visPopups * increaseNum);            
        }
        return lastPopupZIndex;
    }
    
});