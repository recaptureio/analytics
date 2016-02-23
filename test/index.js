var store = require('store');
var cookies = require('cookies-js');
var ra = require('../dist/ra')();

function isFunction(value) {
  var functionTag = '[object Function]';
  var protoToString = Object.prototype.toString;
  return protoToString.call(value) == functionTag;
}

describe('ra', function() {
  it('should construct itself correctly', function() {
    assert.ok(ra, 'ra is not null');
    assert.ok(ra.init && isFunction(ra.init), 'ra.init function exists');
    assert.ok(ra.product && isFunction(ra.product), 'ra.product function exists');
    assert.ok(ra.page && isFunction(ra.page), 'ra.page function exists');
    assert.ok(ra.email && isFunction(ra.email), 'ra.email function exists');
    assert.ok(ra.state, 'ra.state object exists');
  });

  it('should set initial state correctly', function() {
    var state = ra.state.getState();
    assert.notOk(state.api_key, 'state.api_key is initially null');
    assert.notOk(state.collector, 'state.collector is initially null');
    assert.notOk(state.customer_id, 'state.customer_id is initially null');
    assert.notOk(state.customer_email, 'state.customer_email is initially null');
  });

  it('init method should work and update state', function() {
    ra.init('12345');

    var state = ra.state.getState();

    assert.equal(state.api_key, '12345', 'state.api_key is set after ra("init") is called');
    assert.ok(state.customer_id, 'state.customer_id is set after ra("init") is called');
    assert.ok(store.has('ra_customer_id'), 'local storage sets ra_customer_id');
    assert.ok(cookies.get('ra_customer_id'), 'ra_customer_id cookie set');
  });

  it('email method should work and update state', function() {
    var testEmail = 'test@gmail.com';

    // manually pass recapture an email address to save it in storage
    ra.email(testEmail);

    var state = ra.state.getState();

    assert.equal(state.customer_email, testEmail, 'state.customer_email is set after ra("email") is called');
    assert.ok(store.has('ra_customer_email'), 'local storage sets ra_customer_email');
    assert.equal(store.get('ra_customer_email'), testEmail, 'local storage email value is correct');
    assert.ok(cookies.get('ra_customer_email'), 'ra_customer_email cookie set');
    assert.equal(cookies.get('ra_customer_email'), testEmail, 'cookie email value is correct');
  });

  it('page method works and ra should subscribe to page event emitter', function(done) {
    ra.on('ra.events.page', function(page) {
      assert.ok(page, 'Page data passed to event emitter callback');
      done();
    });

    ra.page();
  });

  it('event emitters also work if .on is called after an event has been emitted', function(done) {
    ra.product({ foo: 'bar' });
    ra.on('ra.events.product', function(product) {
      assert.ok(product, 'Product data passed to event emitter callback');
      done();
    });
  });

  it('should load existing customer from localstorage', function() {
    // change ra_customer_id in local storage
    cookies.expire('ra_customer_id');
    store.set('ra_customer_id', 'abcdef');

    // reinitialize to make recapture load from localstorage if present
    ra.init('123456');
    var state = ra.state.getState();

    assert.ok(store.has('ra_customer_id'), 'local storage has ra_customer_id');
    assert.ok(cookies.get('ra_customer_id'), 'ra_customer_id cookie is created from localstorage value');
    assert.equal(state.customer_id, 'abcdef', 'state.customer_id is loaded from localstorage');
  });

  it('should load existing customer from cookie storage', function() {
    // change ra_customer_id in cookie
    store.remove('ra_customer_id');
    cookies.set('ra_customer_id', 'zyxwv');

    // reinitialize to make recapture load from localstorage if present
    ra.init('123456');
    var state = ra.state.getState();

    assert.ok(cookies.get('ra_customer_id'), 'cookies has ra_customer id');
    assert.ok(cookies.get('ra_customer_id'), 'ra_customer_id is created in localstorage');
    assert.equal(state.customer_id, 'zyxwv', 'state.customer_id is loaded from cookie');
  });
});
