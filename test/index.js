var test = require('tape');
var store = require('store');
var cookies = require('cookies-js');
var ra = require('../dist/ra');

function isFunction(value) {
  var functionTag = '[object Function]';
  var protoToString = Object.prototype.toString;
  return protoToString.call(value) == functionTag;
}

test('ra correctly constructs itself', function(t) {
  t.ok(ra, 'ra is not null');
  t.ok(ra.init && isFunction(ra.init), 'ra.init function exists');
  t.ok(ra.product && isFunction(ra.product), 'ra.product function exists');
  t.ok(ra.page && isFunction(ra.page), 'ra.page function exists');
  t.ok(ra.email && isFunction(ra.email), 'ra.email function exists');
  t.ok(ra.state, 'ra.state object exists');
  t.end();
});

test('ra initial state is correctly set', function(t) {
  var state = ra.state.getState();
  t.notOk(state.api_key, 'state.api_key is initially null');
  t.notOk(state.collector, 'state.collector is initially null');
  t.notOk(state.customer_id, 'state.customer_id is initially null');
  t.notOk(state.customer_email, 'state.customer_email is initially null');
  t.end();
});

test('ra init method and state update', function(t) {
  ra.init('12345');

  var state = ra.state.getState();

  t.equal(state.api_key, '12345', 'state.api_key is set after ra("init") is called');
  t.ok(state.customer_id, 'state.customer_id is set after ra("init") is called');
  t.ok(store.has('ra_customer_id'), 'local storage sets ra_customer_id');
  t.ok(cookies.get('ra_customer_id'), 'ra_customer_id cookie set');
  t.end();
});

test('ra email method and state update', function(t) {
  var testEmail = 'test@gmail.com';

  // manually pass recapture an email address to save it in storage
  ra.email(testEmail);

  var state = ra.state.getState();

  t.equal(state.customer_email, testEmail, 'state.customer_email is set after ra("email") is called');
  t.ok(store.has('ra_customer_email'), 'local storage sets ra_customer_email');
  t.equal(store.get('ra_customer_email'), testEmail, 'local storage email value is correct');
  t.ok(cookies.get('ra_customer_email'), 'ra_customer_email cookie set');
  t.equal(cookies.get('ra_customer_email'), testEmail, 'cookie email value is correct');
  t.end();
});

test('ra loads existing customer from localstorage', function(t) {
  // change ra_customer_id in local storage
  cookies.expire('ra_customer_id');
  store.set('ra_customer_id', 'abcdef');

  // reinitialize to make recapture load from localstorage if present
  ra.init('123456');
  var state = ra.state.getState();

  t.ok(store.has('ra_customer_id'), 'local storage has ra_customer_id');
  t.ok(cookies.get('ra_customer_id'), 'ra_customer_id cookie is created from localstorage value');
  t.equal(state.customer_id, 'abcdef', 'state.customer_id is loaded from localstorage');
  t.end();
});

test('ra loads existing customer from localstorage', function(t) {
  // change ra_customer_id in cookie
  store.remove('ra_customer_id');
  cookies.set('ra_customer_id', 'zyxwv');

  // reinitialize to make recapture load from localstorage if present
  ra.init('123456');
  var state = ra.state.getState();

  t.ok(cookies.get('ra_customer_id'), 'cookies has ra_customer id');
  t.ok(cookies.get('ra_customer_id'), 'ra_customer_id is created in localstorage');
  t.equal(state.customer_id, 'zyxwv', 'state.customer_id is loaded from cookie');
  t.end();
});
