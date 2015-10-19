module.exports = function(state) {

  function injectIframe(src) {
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = 500;
    iframe.height = 500;

    document.body.appendChild(iframe);
  }

  state.subscribe(function() {
    var currentState = state.getState();

    if (currentState.collector) {
      injectIframe(currentState.collector);
    }
  });

};
