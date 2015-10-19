var storage = require('storage');
var actions = require('actions');

var setApiKey = actions.setApiKey;

module.exports = function(state, customer) {
  var currentState = state.getState();

  return function(apiKey) {
    state.dispatch(setApiKey(apiKey));

    storage.has('ra_customer_id') ?
      customer.load() :
      customer.create();
  }
}
