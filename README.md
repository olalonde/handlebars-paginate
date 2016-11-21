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

For Bootstrap3

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    {{#paginate pagination type="first"}}
    <li class="page-item{{#if disabled}} disabled{{/if}}">
      <a class="page-link" href="?page={{n}}" aria-label="First">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">First</span>
      </a>
    </li>
    {{/paginate}}
    {{#paginate pagination type="previous"}}
    <li class="page-item{{#if disabled}} disabled{{/if}}">
      <a class="page-link" href="?page={{n}}" aria-label="Previous">
        <span aria-hidden="true">&lsaquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    {{/paginate}}
    {{#paginate pagination type="middle" limit="10"}}
    <li class="page-item"><a class="page-link{{#if disabled}} disabled{{/if}}" href="?page={{n}}">{{n}}</a></li>
    {{/paginate}}
    {{#paginate pagination type="next"}}
    <li class="page-item{{#if disabled}} disabled{{/if}}">
      <a class="page-link" href="?page={{n}}" aria-label="Next">
        <span aria-hidden="true">&rsaquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
    {{/paginate}}
    {{#paginate pagination type="last"}}
    <li class="page-item{{#if disabled}} disabled{{/if}}">
      <a class="page-link" href="?page={{n}}" aria-label="Last">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Last</span>
      </a>
    </li>
    {{/paginate}}
  </ul>
</nav>
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
