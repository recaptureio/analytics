Methods

##### `ra('init', [apiKey|string|required])`

Required to be called before any other methods.

##### `ra('page')`

Tracks page view information.

##### `ra('product', [attributes|object|optional])`

Tracks product view information. Will send anything passed into attributes Object to recapture.

##### `ra('email', [cartID|string|required])`

Watches the page for any email address being input into a form and associates it to the internal tracked customer.
