## Overview
- Async loaded
- Methods called before lib is loaded will be put in queue and called when ready
- Utilizes v4 UUID for customer tracking
- Small footprint

Local storage and cookies keys:

`ra_customer_id` and `ra_customer_email` (if set)

All method calls will point to `http://recapture.io/beacon` if using minified js, otherwise it will point to `http://localhost:4000/beacon`

## Including the library
```html
<!--[if gt IE 8]>
  <script src="path/to/ra-queue.min.js"></script>
  <script src="path/to/ra.min.js" async defer></script>
<!--<![endif]--> 
```

## Methods

*`ra('init', [apiKey|string|required)`*

Required to be called before any other methods.

e.g.

```javascript
ra('init', ['abc123']);
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

*`ra('email', [cartID|string|required])`*

Watches the page for any email address being input into a form and associates it to the internal tracked customer.

e.g.

```javascript
ra('email', ['abc123']);
```