var storage = require('storage');
var actions = require('actions');

var setApiKey = actions.setApiKey;

module.exports = function(state, ee, customer) {
  var currentState = state.getState();

  return function(apiKey) {
    ee.raEmitQueue['ra.events.init'] = null; // add to emit queue
    ee.emit('ra.events.init');
    state.dispatch(setApiKey(apiKey));
    storage.has('ra_customer_id') ? customer.load() : customer.create();
  }
}
