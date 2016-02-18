# Recapture.io Analytics

[![Travis](https://img.shields.io/travis/recaptureio/analytics.svg)]()

## Overview
- Asynchronous loading for optimal performance
- Built in method stub queue to handle methods called before library is fully loaded
- Lightweight and tiny footprint

## Including the library
```html
<script src="//cdn.recapture.io/sdk/v1/ra-queue.min.js"></script>
```

## Methods

*`ra('init', [apiKey|string|required)`*

Required to be called before any other methods.

e.g.

```javascript
ra('init', ['abc123']);
```

---

*`ra('page')`*

Tracks page view information.

e.g.

```javascript
ra('page');
```

---

*`ra('product', [attributes|object|optional])`*

Tracks product view information. Will send anything passed into attributes Object to recapture.

e.g.

```javascript
ra('product', [{
  sku: 'abc123'
}]);
```

---

*`ra('email')`*

Watches the page for any email address being input into a form and associates it to the internal tracked customer.

e.g.

```javascript
ra('email');
```

## Subscribing to events

You can subscribe to events called by the recapture analytics library by subscribing to them with the `.on` method. For example:

```javascript
ra('on', ['ra.events.page', function(page) {
  console.log(page); // logs page data
}]);
```

This event is called as soon as a page event is tracked. It also passes in the page data in the event callback in case you want to use that information for anything.

Please note that events need to be subscribed to BEFORE their methods are called. Meaning you should put all of your `on` subscribers before calling `init`. For exampe:

Right
```javascript
ra('on', ['ra.events.page', function(page) {
  console.log(page); // logs page data
}]);

ra('page');
```

Wrong
```javascript

ra('page');

ra('on', ['ra.events.page', function(page) {
  console.log(page); // logs page data
}]);
```

Our list of possible events is as follows:

| Event Name | Description | Passed In Data |
| ---------- | ----------- | -------------- |
| ra.events.init | Fires when the `init` method is called | null |
| ra.events.page | Fires when the `page` method is called | page data |
| ra.events.product | Fires when the `product` method is called | product data |
| ra.events.email | Fires whenever a valid email is found or entered | the email address |
| ra.events.collector.submit| Fires when a collector is submitted | null |
| ra.events.collector.close | Fires when a collector is closed | null |
| ra.events.collector.init | Fires when a collector is initialized | null |
