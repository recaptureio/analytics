var state = require('state');

var customer = require('customer')(state);
var init = require('methods/init')(state, customer);
var page = require('methods/page')(state);
var product = require('methods/product')(state);
var email = require('methods/email')(state, customer);

var root = window;
var libName = 'ra';
var queue = root[libName].q || [];

/**
 * Factory function to get things rollin
 * @method create
 * @return {Object} Newly constructed ra object
 */
function create() {

  var obj = Object.create({
    init: init,
    page: page,
    product: product,
    email: email
  });

  // run through our queue and apply methods as needed
  if (queue.length) {
    for (var i in queue) {
      var method = queue[i].shift();
      var args = queue[i].shift();

      if (obj[method]) {
        obj[method].apply(obj, args);
      }
    }
  }

  return obj;
}

// override global
root[libName] = create();
