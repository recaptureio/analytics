var sendProduct = require('actions').sendProduct;

module.exports = function(state, ee) {
  var currentState = state.getState();

  return function(productData) {
    productData.customer = currentState.customer_id;
    productData.api_key = currentState.api_key;
    productData.url = window.location.href;
    productData.title = document.title;

    ee.emit('ra.events.product', productData);
    state.dispatch(sendProduct(productData));
  }
}
