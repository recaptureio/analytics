var sendPage = require('actions').sendPage;

/**
 * Get url data for the current page
 * @method getUrlData
 * @return {Object} Parsed url data
 */
function getUrlData() {
  var parser = document.createElement('a');
  parser.href = window.location.href;

  return {
    url: parser.href,
    hostname: parser.hostname || window.location.hostname, // ie fix
    path: parser.pathname,
    hash: parser.hash,
    query: parser.search,
    referrer: document.referrer,
    title: document.title
  };
}

module.exports = function(state) {
  var currentState = state.getState();
  var data = getUrlData();

  return function() {
    data.customer = currentState.customer_id;
    data.api_key = currentState.api_key;

    state.dispatch(sendPage(data));
  };
};
