var EventEmitter = require('smelly-event-emitter');
var ee = new EventEmitter();

var state = require('state');
var customer = require('customer')(state);
var collector = require('collector')(state, ee);
var init = require('methods/init')(state, ee, customer);
var page = require('methods/page')(state, ee);
var product = require('methods/product')(state, ee);
var email = require('methods/email')(state, ee, customer);

var root = window;
var libName = 'ra';
var queue = root[libName] ? root[libName].q : [];

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
    email: email,
    state: state,
    on: ee.on
  });

  // run through our queue and apply methods as needed
  if (queue.length) {
    queue.forEach(function(q) {
      var method = q.shift();
      var args = q.shift();

      if (obj[method]) {
        if (method === 'on') {
          ee.on.apply(ee, args);
        } else {
          obj[method].apply(obj, args);
        }
      }
    });
  }

  return obj;
}

// override global
root[libName] = create();
module.exports = root[libName];
