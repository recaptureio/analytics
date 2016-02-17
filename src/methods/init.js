var storage = require('storage');
var actions = require('actions');

var setApiKey = actions.setApiKey;

module.exports = function(state, ee, customer) {
  var currentState = state.getState();

  return function(apiKey) {
    ee.emit('ra.events.init');
    state.dispatch(setApiKey(apiKey));
    storage.has('ra_customer_id') ? customer.load() : customer.create();
  }
}
