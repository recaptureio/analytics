var sendPage = require('actions').sendPage;

/**
 * Get page data for the current page
 * @method getPageData
 * @return {Object} Parsed url data
 */
function getPageData() {
  var parser = document.createElement('a');
  parser.href = window.location.href;

  return {
    url: parser.href,
    title: document.title
  };
}

module.exports = function(state, ee) {
  var currentState = state.getState();
  var data = getPageData();

  return function() {
    data.customer = currentState.customer_id;
    data.api_key = currentState.api_key;

    ee.raEmitQueue['ra.events.page'] = data; // add to emit queue
    ee.emit('ra.events.page', data);
    state.dispatch(sendPage(data));
  };
};
