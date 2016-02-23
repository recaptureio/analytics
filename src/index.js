var EventEmitter = require('smelly-event-emitter');
var ee = new EventEmitter();

// an event queue specifically for Recapture
ee.raEmitQueue = {};

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
    on: function(eventName, callback) {
      // in 99% of cases this will fire since a user cannot 100% of the time
      // setup event listeners before the events are emitted
      if (ee.raEmitQueue[eventName]) {
        return callback.call(ee, ee.raEmitQueue[eventName]);
      }

      return ee.on.call(ee, eventName, callback);
    },
  });

  // run through our queue and apply methods as needed
  if (queue.length) {
    queue.forEach(function(q) {
      var method = q.shift();
      var args = q.shift();

      if (obj[method]) {
        if (method === 'on') {
          obj[method].apply(ee, args);
        } else {
          obj[method].apply(obj, args);
        }
      }
    });
  }

  return obj;
}

var instance = create();

// keep signature but dont use queue
root[libName] = function() {
  var q = [].slice.call(arguments);
  var method = q.shift();
  var args = q.shift();

  if (instance[method]) {
    if (method === 'on') {
      instance[method].apply(ee, args);
    } else {
      instance[method].apply(instance, args);
    }
  }

  // expose ra prototype
  return instance;
};

module.exports = root[libName];
