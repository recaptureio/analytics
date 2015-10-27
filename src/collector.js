module.exports = function(state) {

  function initializeIframe(iframe) {
    var win = iframe.contentWindow;
    var doc = iframe.contentDocument || iframe.contentWindow.document;

    iframe.addEventListener('load', function(event, object) {
      
      event.target.style.display = null;
      event.target.style.opacity = null;
      
    }, false);
  }

  function injectIframe(src) {
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.id = 'recapture-collector';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.border = 'none';
    iframe.style.display = 'none';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 5s';

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
