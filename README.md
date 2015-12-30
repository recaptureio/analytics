# Recapture.io Analytics

[![Travis](https://img.shields.io/travis/recaptureio/analytics.svg)]()

## Overview
- Asynchronous loading for optimal performance
- Built in method stub queue to handle methods called before library is fully loaded
- Lightweight and tiny footprint

## Including the library
```html
<script src="path/to/ra-queue.min.js"></script>
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

*`ra('email')`*

Watches the page for any email address being input into a form and associates it to the internal tracked customer.

e.g.

```javascript
ra('email');
```
