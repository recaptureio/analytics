var storage = require('storage');
var request = require('b-jsonp');

function sendRequest(endpoint, data, callback) {
  var baseURL = process.env.NODE_ENV === 'production' ?
    'https://www.recapture.io/beacon/' :
    'http://10.1.10.115:4000/beacon/';

  request(baseURL + endpoint, data, callback);
}

function errorMsg(err) {
  var msg = 'It looks like Recapture.io ran into an issue. Error message:';
  return msg + '"' + err.message + '"';
}

/**
 * Sets up the the api key for store
 */
var SET_API_KEY = 'SET_API_KEY';
exports.SET_API_KEY = SET_API_KEY;
exports.setApiKey = function setApiKey(key) {
  return {
    type: SET_API_KEY,
    payload: key
  };
};

/**
 * Sets cart id of the customer
 */
var SET_CART_ID = 'SET_CART_ID';
exports.SET_CART_ID = SET_CART_ID;
exports.setCartId = function setCartId(id) {
  return {
    type: SET_CART_ID,
    payload: id
  };
};

/**
 * Sets customer id and puts it into storage
 */
var SET_CUSTOMER_ID = 'SET_CUSTOMER_ID';
exports.SET_CUSTOMER_ID = SET_CUSTOMER_ID;
exports.setCustomerId = function setCustomerId(id) {
  storage.set('ra_customer_id', id);

  return {
    type: SET_CUSTOMER_ID,
    payload: id
  };
};

/**
 * Sets customer id and puts it into storage
 */
var SET_CUSTOMER_EMAIL = 'SET_CUSTOMER_EMAIL';
exports.SET_CUSTOMER_EMAIL = SET_CUSTOMER_EMAIL;
exports.setCustomerEmail = function setCustomerEmail(email) {
  storage.set('ra_customer_email', email);

  return {
    type: SET_CUSTOMER_EMAIL,
    payload: email
  };
};


/**
 * Send customer email to recapture and put it into storage
 */
var SEND_CUSTOMER_EMAIL = 'SEND_CUSTOMER_EMAIL';
exports.SEND_CUSTOMER_EMAIL = SEND_CUSTOMER_EMAIL;
exports.sendCustomerEmail = function(data) {
  return function(dispatch) {
    sendRequest('email', data, function(err, response) {
      if (err) {
        console.log(errorMsg(err));
        dispatch({ type: SEND_CUSTOMER_EMAIL, payload: {}});
      } else {
        dispatch({
          type: SEND_CUSTOMER_EMAIL,
          payload: response
        });
      }
    })
  };
}

/**
 * Send product data to recapture
 */
var SEND_PRODUCT = 'SEND_PRODUCT';
exports.SEND_PRODUCT = SEND_PRODUCT;
exports.sendProduct = function(data) {
  return function(dispatch) {
    sendRequest('product', data, function(err, response) {
      if (err) {
        console.log(errorMsg(err));
        dispatch({ type: SEND_PRODUCT, payload: {}});
      } else {
        dispatch({
          type: SEND_PRODUCT,
          payload: response
        });
      }
    })
  };
};

/**
 * Send page data to recapture
 */
var SEND_PAGE = 'SEND_PAGE';
exports.SEND_PAGE = SEND_PAGE;
exports.sendPage = function(data) {
  return function(dispatch) {
    sendRequest('page', data, function(err, response) {
      if (err) {
        console.log(errorMsg(err));
        dispatch({ type: SEND_PAGE, payload: {}});
      } else {
        dispatch({
          type: SEND_PAGE,
          payload: response
        });
      }
    })
  };
};


/**
 * Send collector close data to recapture
 */
var SEND_COLLECTOR_CLOSE = 'SEND_COLLECTOR_CLOSE';
exports.SEND_COLLECTOR_CLOSE = SEND_COLLECTOR_CLOSE;
exports.sendCollectorClose = function(url) {
  if (!url) return;
  return function(dispatch) {
    request(url, function(err, response) {
      if (err) {
        console.log(errorMsg(err));
        dispatch({ type: SEND_COLLECTOR_CLOSE, payload: {}});
      } else {
        dispatch({
          type: SEND_COLLECTOR_CLOSE,
          payload: response
        });
      }
    })
  };
};


/**
 * To make sure subsequent api calls do not show collector again
 */
var RESET_COLLECTOR = 'RESET_COLLECTOR';
exports.RESET_COLLECTOR = RESET_COLLECTOR;
exports.resetCollector = function() {
  return {
    type: RESET_COLLECTOR,
    payload: {}
  }
};
