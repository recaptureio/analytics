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

function getIframeWindow(iframeElement){
  return iframeElement.contentWindow || iframeElement.contentDocument.parentWindow;
}

module.exports = function(state) {

  function setupCloseListener() {

  }

  function initializeIframe(iframe) {
    var win = getIframeWindow(iframe);
    var doc = iframe.contentDocument || iframe.contentWindow.document;

    iframe.addEventListener('load', function() {
      css(iframe, 'display', 'inherit');
      requestAnimFrame(function() {
        css(iframe, 'opacity', 1);
      });

      var close = doc.getElementById('recapture-close-collector');
      console.log(close);
    }, false);

    win.addEventListener('load', function() {
      console.log('wat');
      var close = doc.getElementById('recapture-close-collector');
      console.log(close);
    }, false);
  }

  function injectIframe(src) {
    var iframe = document.createElement('iframe');

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
