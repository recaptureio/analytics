var sendProduct = require('actions').sendProduct;

module.exports = function(state) {
  var currentState = state.getState();

  return function(productData) {
    productData.customer = currentState.customer_id;
    productData.api_key = currentState.api_key;
    productData.url = window.location.href;
    productData.title = document.title;

    state.dispatch(sendProduct(productData));
  }
}
