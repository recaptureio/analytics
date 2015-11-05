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
    //hostname: parser.hostname || window.location.hostname, // ie fix
    //path: parser.pathname,
    //hash: parser.hash,
    //query: parser.search,
    //referrer: document.referrer,
    title: document.title
  };
}

module.exports = function(state) {
  var currentState = state.getState();
  var data = getPageData();

  return function() {
    data.customer = currentState.customer_id;
    data.api_key  = currentState.api_key;

    state.dispatch(sendPage(data));
  };
};
