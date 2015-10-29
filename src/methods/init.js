var storage = require('storage');
var actions = require('actions');

var setApiKey = actions.setApiKey;
var setBaseUrl = actions.setBaseUrl;

module.exports = function(state, customer) {
  var currentState = state.getState();

  return function(apiKey, baseUrl) {
    state.dispatch(setApiKey(apiKey));
    
    if (baseUrl){
      state.dispatch(setBaseUrl(baseUrl));
    }

    storage.has('ra_customer_id') ?
      customer.load() :
      customer.create();
  }
}
