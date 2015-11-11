var actions = require('actions');
var redux = require('redux');
var thunk = require('redux-thunk');
var createLogger = require('redux-logger');

var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false,
  predicate: function(getState, action) {
    return process.env.NODE_ENV !== 'production';
  }
});

/**
 * Action constants
 * @type {String}
 */
var SET_API_KEY = actions.SET_API_KEY;
var SET_CART_ID = actions.SET_CART_ID;
var SET_CUSTOMER_ID = actions.SET_CUSTOMER_ID;
var SET_CUSTOMER_EMAIL = actions.SET_CUSTOMER_EMAIL;
var SEND_PAGE = actions.SEND_PAGE;
var SEND_PRODUCT = actions.SEND_PRODUCT;
var RESET_COLLECTOR = actions.RESET_COLLECTOR;

/**
 * Our default application state
 * @type {Object}
 */
var defaultState = {
  api_key: null,
  customer_id: null,
  customer_email: null,
  collector: null
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

    case SET_CUSTOMER_ID:
      state.customer_id = action.payload;
      return state;

    case SET_CUSTOMER_EMAIL:
      state.customer_email = action.payload;
      return state;

    case SEND_PAGE:
      if (action.payload.hasOwnProperty('data')) {
        if (action.payload.data.hasOwnProperty('collector')) {
          state.collector = action.payload.data.collector;
        }
      }

      return state;

    case SEND_PRODUCT:
      if (action.payload.hasOwnProperty('data')) {
        if (action.payload.data.hasOwnProperty('collector')) {
          state.collector = action.payload.data.collector;
        }
      }

      return state;

    case RESET_COLLECTOR:
      state.collector = null;
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
