var actions = require('actions');
var redux = require('redux');
var thunk = require('redux-thunk');
var createLogger = require('redux-logger');

var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false
});

/**
 * Action constants
 * @type {String}
 */
var SET_API_KEY = actions.SET_API_KEY;
var SET_CART_ID = actions.SET_CART_ID;
var SET_CUSTOMER_ID = actions.SET_CUSTOMER_ID;
var SET_CUSTOMER_EMAIL = actions.SET_CUSTOMER_EMAIL;

/**
 * Our default application state
 * @type {Object}
 */
var defaultState = {
  api_key: null,
  cart_id: null,
  customer_id: null,
  customer_email: null
};

/**
 * Reducer function for our state actions
 * @method reducer
 * @param  {Object} state The current state
 * @param  {Object} action The incoming action
 * @return {Object} The mutated state
 */
function reducer(state, action) {
  switch (action.type) {
    case SET_API_KEY:
      state.api_key = action.payload;
      return state;

    case SET_CART_ID:
      state.cart_id = action.payload;
      return state;

    case SET_CUSTOMER_ID:
      state.customer_id = action.payload;
      return state;

    case SET_CUSTOMER_EMAIL:
      state.customer_email = action.payload;
      return state;

    default:
      return state;
  }
}

/**
 * Creates store with middleware
 */
var storeWithMiddleware = applyMiddleware(
  thunk,
  logger
)(createStore);

module.exports = storeWithMiddleware(reducer, defaultState);
