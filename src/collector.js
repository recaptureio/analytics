var css = require('dom-css');

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

module.exports = function(state) {

  function getVendorPrefix() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (
      Array.prototype.slice.call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return pre;
  }
  
  function initializeIframe(iframe) {
    var win = iframe.contentWindow;
    var doc = iframe.contentDocument || iframe.contentWindow.document;

    iframe.addEventListener('load', function(event, object) {
      
      var target = event.target;
      target.style.display = null;
      
      requestAnimationFrame(function(){
        
        target.style.opacity = 1;
        
      });
      
    }, false);
  }

  function injectIframe(src) {
    
    var iframe = document.createElement('iframe');
    var transitionPrefix = getVendorPrefix() + 'Transition';
    console.log(transitionPrefix);
    iframe.src = src;
    iframe.id = 'recapture-collector';
    iframe.width = '100%';
    iframe.height = '100%';
    
    css(iframe, {
      'width'     : '100%',
      'height'    : '100%',
      'position'  : 'fixed',
      'top'       : '0',
      'left'      : '0',
      'border'    : 'none',
      'opacity'   : '0',
      'transition': 'opacity .25s cubic-bezier(0.550, 0.085, 0.680, 0.530)'
    })
    
    document.body.appendChild(iframe);

    return iframe;
  }


  state.subscribe(function() {
    var currentState = state.getState();

    if (currentState.collector) {
      initializeIframe(injectIframe(currentState.collector));
    }
  });

};
