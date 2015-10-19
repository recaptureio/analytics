var uuid = require('node-uuid');
var storage = require('storage');
var actions = require('actions');

var setCustomerId = actions.setCustomerId;
var sendCustomerEmail = actions.sendCustomerEmail;
var setCustomerEmail = actions.setCustomerEmail;

module.exports = function(state) {

  /**
   * Creates a new user in storage
   * @method create
   * @return {Function} Action creator
   */
  function create() {
    state.dispatch(setCustomerId(uuid.v4()));
  }

  /**
   * Adds an email address to our customer in storage
   * @method email
   * @param  {String} email The email we want to add to storage
   * @return {Function} Action creators
   */
  function email(email) {
    var currentState = state.getState();
    var data = {
      email: email,
      customer: currentState.customer_id,
      api_key: currentState.api_key,
      cart_id: currentState.cart_id
    };

    state.dispatch(setCustomerEmail(email));
    state.dispatch(sendCustomerEmail(data));
  }

  /**
   * Loads user data from storage
   * @method load
   * @return {Function} Action creators
   */
  function load() {
    state.dispatch(setCustomerId(storage.get('ra_customer_id')));

    if (storage.has('ra_customer_email')) {
      // do we also need to send the email address as well?
      state.dispatch(setCustomerEmail(storage.get('ra_customer_email')));
    }
  }

  return Object.create({
    create: create,
    email: email,
    load: load
  });
};
