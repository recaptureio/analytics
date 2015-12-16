require('shims');

var state = require('state');
var ieVersion = require('utils').ieVersion();
var customer = require('customer')(state);
var collector = require('collector')(state);
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

  if (ieVersion && ieVersion < 9) {
    console.log('Recapture.io detected that you are using an outdated browser.')
    return;
  }

  var obj = Object.create({
    init: init,
    page: page,
    product: product,
    email: email
  });

  // run through our queue and apply methods as needed
  if (queue.length) {
    queue.forEach(function(q) {
      var method = q.shift();
      var args = q.shift();

      if (obj[method]) {
        obj[method].apply(obj, args);
      }
    });
  }

  return obj;
}

// override global
root[libName] = create();
