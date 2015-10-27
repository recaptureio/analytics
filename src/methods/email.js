var isEmail = require('check-email-valid');
var eventListener = require('eventlistener');
var actions = require('actions');

var setCartId = actions.setCartId;

module.exports = function(state, customer) {

  var timers = [];
  var inputs = document.getElementsByTagName('input');

  /**
   * Attach keyup listener to all inputs on page
   * @method attachListeners
   */
  function attachListeners() {
    if (inputs && inputs.length) {
      for (var i = 0, len = inputs.length; i < len; i++) {

        // check to see if input already has a value prefilled
        if (inputs[i].value && checkIsEmail(inputs[i].value)) {
          setEmail(inputs[i].value);
        }

        eventListener.add(inputs[i], 'keyup', waitForTyping);
        timers.push(0);
      }
    }
  }

  /**
   * Event callback for keyp event to put email check in queue
   * @method waitForTyping
   * @param  {Object} e Event object
   */
  function waitForTyping(e) {
    var value = e.target.value;

    for (var i = 0, len = inputs.length; i < len;   i++) {
      if (inputs[i] === e.target) {
        clearTimeout(timers[i]);

        timers[i] = setTimeout(function() {
          if (checkIsEmail(value)) {
            setEmail(value);
          }
        }, 2000);
      }
    }
  }

  /**
   * Conditional check to see if we are recieving a valid email address
   * @method checkIsEmail
   * @param  {String} value An email address value
   * @return {Boolean} Whether our value is an email address or not
   */
  function checkIsEmail(value) {
    return value && isEmail(value);
  }

  /**
   * Set customer email address
   * @method setEmail
   * @param  {String} email The email address we want to set
   */
  function setEmail(email) {
    customer.email(email);
  }
  
  return function(cartId) {
    attachListeners();
    state.dispatch(setCartId(cartId));
  }
};
