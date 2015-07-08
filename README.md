# Handlerbars Paginate helper

![screenshot](https://github.com/olalonde/handlebars-paginate/raw/master/screenshot.png)

## Install

    npm install handlebars-paginate

## Usage

hbs.js

```javascript
/* ... */

var paginate = require('handlebars-paginate');

Handlebars.registerHelper('paginate', paginate);

/* ... */

var html = template({pagination: {
  page: 3,
  pageCount: 10
}});
```

template.hbs

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
