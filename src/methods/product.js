var sendProduct = require('actions').sendProduct;

module.exports = function(state) {
  var currentState = state.getState();

  return function(productData) {
    productData.customer = currentState.customer_id;
    productData.api_key = currentState.api_key;

    state.dispatch(sendProduct(productData));
  }
}
