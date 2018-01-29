# Handlebars Paginate helper

![screenshot][screenshot]

[![npm Version][npm-badge]][npm]
[![Dependency Status][dep-badge]][dep-status]

## Install

    npm install handlebars-paginate

## Usage

Register the __handlebars-paginate__ helper with [Handlebars][]:

```javascript
var Handlebars = require('handlebars');
var paginate = require('handlebars-paginate');

Handlebars.registerHelper('paginate', paginate);
```

Then when rendering your template, specify the pagination details:

```javascript
var htmlString = myTemplate({
  /* ... any other context data for your template here */

  // Pagination data:
  pagination: {
    page: 4,       // The current page the user is on
    pageCount: 10  // The total number of available pages
  }
});
```

Use `paginate` blocks in your template to build your pagination markup:

```html
<div class="pagination pagination-centered">
  <ul>
    {{#paginate pagination type="first"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}">First</a></li>
    {{/paginate}}
    {{#paginate pagination type="previous"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}">Prev</a></li>
    {{/paginate}}
    {{#paginate pagination type="middle" limit="7"}}
      <li {{#if active}}class="active"{{/if}}><a href="?p={{n}}">{{n}}</a></li>
    {{/paginate}}
    {{#paginate pagination type="next"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}">Next</a></li>
    {{/paginate}}
    {{#paginate pagination type="last"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}">Last</a></li>
    {{/paginate}}
  </ul>
</div>
```

NOTE: The specific names `paginate` and `pagination` are unimportant and may be
renamed to anything you like. The only important thing is to be consistent and
use the correct names in each JavaScript/Handlebars context.

## Available Options

To configure current pagination state, provide an options object for
handlebars-paginate when calling your template. This object must be passed to
the `paginate` blocks in your Handlebars markup.

NOTE: The key name for the options object may be anything you like, though
we've used `pagination` in the examples.

#### `options.page` (Number or String)

The current page that the user is on. Starts at 1.

#### `options.pageCount` (Number or String)

The total number of pages that are in the collection.

## {{paginate}} Helper

Renders the block for one or more pagination buttons, providing extra pagination
context to the block being rendered.

**Params**

- `type` (String, Required): The button type. One of "first", "previous", "middle", "next", or "last"
- `limit` (Number or String): The maximum number of "middle" buttons to render

**Extra Context**

- `active` (Bool): True for the button associated with the current page. Available to "middle" buttons.
- `disabled` (Bool): True if the button should be disabled. Available to First/Previous/Next/Last buttons.
- `n` (Number): Page number that the button is associated with. Available to all buttons.

## Changelog

### 0.1.0 - 2015-07-06
- Add `first` and `last` page types

### 0.0.3 - 2015-05-20
- Add bower support

### 0.0.2 - 2015-05-18
- Fix type errors with `pagination.page` and `pagination.pageCount`

### 0.0.1 - 2012-11-16
- Initial release

## License

MIT License

[screenshot]: https://github.com/olalonde/handlebars-paginate/raw/master/screenshot.png
[npm]: https://www.npmjs.org/package/handlebars-paginate
[npm-badge]: https://img.shields.io/npm/v/handlebars-paginate.svg?style=flat-square
[dep-badge]: https://img.shields.io/david/jimf/handlebars-paginate.svg?style=flat-square
[dep-status]: https://david-dm.org/jimf/handlebars-paginate
[Handlebars]: http://handlebarsjs.com/
