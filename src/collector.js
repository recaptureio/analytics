var resetCollector = require('actions').resetCollector;
var css = require('dom-css');
var utils = require('utils');

var ie = utils.ie();

module.exports = function(state) {

  /**
   * Removes collector iframe and close button from DOM
   * @method removeCollector
   */
  function removeCollector() {
    var iframe = document.getElementById('recapture-collector');

    if (ie) {
      iframe.src = '';
      iframe.parentNode.removeChild(iframe);
    } else {
      var transitionEvent = utils.transitionEvent();

      css(iframe, 'opacity', '0');

      iframe.addEventListener(transitionEvent, function() {
        iframe.parentNode.removeChild(iframe);
      }, false);
    }
  }

  /**
   * Sets up our iframe load event and our subscribe / close button listeners
   * @method initializeIframe
   * @param  {Oject} iframe The iframe DOM node
   */
  function initializeIframe(iframe) {
    window.addEventListener('message', function(e) {
      switch (e.data) {
        case 'recapture::init':
          css(iframe, 'display', 'block');

          if (!ie) {
            requestAnimFrame(function() {
              css(iframe, 'opacity', 1);
            });
          }
          break

        case 'recapture::close':
        case 'recapture::submit':
          removeCollector();
          break;

        default:
          return;
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

    var styles = {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      border: 'none',
      display: 'none',
      zIndex: 999
    };

    if (!ie) {
      styles.opacity = '0';
      styles.transition = 'opacity 400ms cubic-bezier(.25,.8,.25,1)';
    }

    css(iframe, styles);

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
      state.dispatch(resetCollector());
    }
  });

};
