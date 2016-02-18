var isEmail = require('check-email-valid');
var actions = require('actions');

var setCartId = actions.setCartId;

module.exports = function(state, ee, customer) {
  var timer = null;
  var inputs = document.getElementsByTagName('input');
  var inputsLength = inputs.length;

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
   * Event callback for keyp event to put email check in queue
   * @method waitForTyping
   * @param  {Object} e Event object
   */
  function waitForTyping(e) {
    var target = e.target;
    var value = target.value;

    if (target.tagName !== 'INPUT') {
      return;
    }

    clearTimeout(timer);

    timer = setTimeout(function() {
      if (checkIsEmail(value)) {
        setEmail(value);
      }
    }, 2000);
  }

  /**
   * Set customer email address
   * @method setEmail
   * @param  {String} email The email address we want to set
   */
  function setEmail(email) {
    ee.emit('ra.events.email', email);
    customer.email(email);
  }

  /**
   * Attach keyup listener to all inputs on page
   * @method attachListeners
   */
  function attachListeners() {
    document.addEventListener('keyup', waitForTyping, false);

    if (inputsLength) {
      for (var i = 0; i < inputsLength; i++) {

        // check to see if input already has a value prefilled
        if (inputs[i].value && checkIsEmail(inputs[i].value)) {
          setEmail(inputs[i].value);
        }
      }
    }
  }

  return function emailMethod(email) {
    if (email) {
      setEmail(email);
    }

    attachListeners();
  };
};
