var storage = require('storage');
var createAction = require('redux-actions').createAction;
var request = require('then-request');

function sendRequest(endpoint, data) {

  var baseURL = process.env.NODE_ENV === 'production' ?
    'https://www.recapture.io/beacon/' :
    'http://2aaac80d.ngrok.io/beacon/';
    // 'http://localhost:4000/beacon/';

  request('POST', baseURL + endpoint, {
    json: data,
    headers: { 'Api-Key': data.api_key }
  });

  // qwest.js syntax
  // return request.post(
  //   baseURL + endpoint,
  //   data,
  //   {
  //     dataType: 'json',
  //     responseType: 'json',
  //     headers: { 'Api-Key': data.api_key }
  //   }
  // );
}

/**
 * Sets up the the api key for store
 */
var SET_API_KEY = 'SET_API_KEY';
exports.SET_API_KEY = SET_API_KEY;
exports.setApiKey = createAction(SET_API_KEY);

/**
 * Sets cart id of the customer
 */
var SET_CART_ID = 'SET_CART_ID';
exports.SET_CART_ID = SET_CART_ID;
exports.setCartId = createAction(SET_CART_ID);

/**
 * Sets customer id and puts it into storage
 */
var SET_CUSTOMER_ID = 'SET_CUSTOMER_ID';
exports.SET_CUSTOMER_ID = SET_CUSTOMER_ID;
exports.setCustomerId = createAction(SET_CUSTOMER_ID, function(id) {
  storage.set('ra_customer_id', id);
  return id;
});

/**
 * Sets customer id and puts it into storage
 */
var SET_CUSTOMER_EMAIL = 'SET_CUSTOMER_EMAIL';
exports.SET_CUSTOMER_EMAIL = SET_CUSTOMER_EMAIL;
exports.setCustomerEmail = createAction(SET_CUSTOMER_EMAIL, function(email) {
  storage.set('ra_customer_email', email);
  return email;
});


/**
 * Send customer email to recapture and put it into storage
 */
var SEND_CUSTOMER_EMAIL = 'SEND_CUSTOMER_EMAIL';
exports.SEND_CUSTOMER_EMAIL = SEND_CUSTOMER_EMAIL;
exports.sendCustomerEmail = function(data) {
  return function(dispatch) {
    sendRequest('cart/email', data)
      .then(function(xhr, response) {
        dispatch({
          type: SEND_CUSTOMER_EMAIL,
          payload: response
        });
      })
      .catch(function(xhr, response, err) {
        dispatch({
          type: SEND_CUSTOMER_EMAIL,
          payload: err
        });
      });
  };
}

/**
 * Send product data to recapture
 */
var SEND_PRODUCT = 'SEND_PRODUCT';
exports.SEND_PRODUCT = SEND_PRODUCT;
exports.sendProduct = function(data) {
  return function(dispatch) {
    sendRequest('product', data)
      .then(function(xhr, response) {
        dispatch({
          type: SEND_PRODUCT,
          payload: response
        });
      })
      .catch(function(xhr, response, err) {
        dispatch({
          type: SEND_PRODUCT,
          payload: err
        });
      });
  };
};

/**
 * Send page data to recapture
 */
var SEND_PAGE = 'SEND_PAGE';
exports.SEND_PAGE = SEND_PAGE;
exports.sendPage = function(data) {
  return function(dispatch) {
    sendRequest('page', data)
      .then(function(xhr, response) {
        dispatch({
          type: SEND_PAGE,
          payload: response
        });
      })
      .catch(function(xhr, response, err) {
        dispatch({
          type: SEND_PAGE,
          payload: err
        });
      });
  };
};
