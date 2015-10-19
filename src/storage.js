var store = require('store');

/**
 * Gets an item from storage
 * @method get
 * @param  {String} key The items key
 * @return {String} The item
 */
function get(key) {
  return store.get(key);
}

/**
 * Sets an item to storage
 * @method set
 * @param  {String} key The items key
 * @param  {String} value The items value
 * @return {String} The items value
 */
function set(key, value) {
  return store.set(key, value);
}

/**
 * Check to see if a item exists
 * @method has
 * @param  {String} key The items key
 * @return {Boolean} Whether an item was found or not
 */
function has(key) {
  return store.has(key);
}

/**
 * Remove an item from storage
 * @method remove
 * @param  {String} key The items key
 * @return {Object} Not sure
 */
function remove(key) {
  return store.remove(key);
}

module.exports = Object.create({
  get: get,
  set: set,
  has: has,
  remove: remove
});
