var store = require('store');
var cookies = require('cookies-js');

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
  cookies.set(key, value, { expires: Infinity });
  return store.set(key, value);
}

/**
 * Check to see if a item exists, checks both localstorage and cookies
 * @method has
 * @param  {String} key The items key
 * @return {Boolean} Whether an item was found or not
 */
function has(key) {
  // if present in localstorage but not cookie, set in cookie
  if (store.has(key) && !cookies.get(key)) {
    cookies.set(key, store.get(key));
  }

  // if present in cookie but not localstorage, set in localstorage
  if (cookies.get(key) && !store.has(key)) {
    store.set(key, cookies.get(key));
  }

  return store.has(key) && cookies.get(key);
}

/**
 * Remove an item from storage
 * @method remove
 * @param  {String} key The items key
 * @return {Object} Not sure
 */
function remove(key) {
  cookies.expire(key);
  return store.remove(key);
}

module.exports = Object.create({
  get: get,
  set: set,
  has: has,
  remove: remove
});
