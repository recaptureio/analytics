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

  /** From modernizer */
  function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }
  }

  /**
   * Removes collector iframe and close button from DOM
   * @method removeCollector
   */
  function removeCollector() {
    var iframe = document.getElementById('recapture-collector');

    css(iframe, 'opacity', '0');

    iframe.addEventListener(whichTransitionEvent(), function() {
      iframe.remove();
    }, false);
  }

  /**
   * Sets up our message listener from the recapture iframe
   * @method setupMessageListener
   */
  function setupRemoveListener() {
    window.addEventListener('message', function(e) {
      if (e.isTrusted && (e.data === 'recapture::close' || e.data === 'recapture::submit')) {
        removeCollector();
      }
    }, false);
  }

  /**
   * Sets up our iframe load event and our subscribe / close button listeners
   * @method initializeIframe
   * @param  {Oject} iframe The iframe DOM node
   */
  function initializeIframe(iframe) {
    window.addEventListener('message', function(e) {
      if (e.isTrusted && e.data === 'recapture::init') {
        css(iframe, 'display', 'inherit');

        requestAnimFrame(function() {
          css(iframe, 'opacity', 1);

          setupRemoveListener();
        });
      }
    });
  }

  /**
   * Inject the iframe into the DOM
   * @method injectIframe
   * @param  {String} src The src to our collector html
   * @return {Object} Our inject iframe DOM node
   */
  function injectIframe(src) {
    var iframe = document.createElement('iframe');

    iframe.src = src;
    iframe.id = 'recapture-collector';
    iframe.width = '100%';
    iframe.height = '100%';

    css(iframe, {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      border: 'none',
      opacity: '0',
      display: 'none',
      transition: 'opacity 400ms cubic-bezier(.25,.8,.25,1)',
      zIndex: 999
    });

    document.body.appendChild(iframe);

    return iframe;
  }

  /**
   * Subscribe to our global state change and inject collector if we have one
   */
  state.subscribe(function() {
    var currentState = state.getState();

    if (currentState.collector) {
      initializeIframe(injectIframe(currentState.collector));
    }
  });

};
