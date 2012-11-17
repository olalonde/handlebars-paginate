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
    {{#paginate pagination type="previous"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}" >Prev</a></li>
    {{/paginate}}
    {{#paginate pagination type="middle" limit="7"}}
      <li {{#if active}}class="active"{{/if}}><a href="?p={{n}}">{{n}}</a></li>
    {{/paginate}}
    {{#paginate pagination type="next"}}
      <li {{#if disabled}}class="disabled"{{/if}}><a href="?p={{n}}">Next</a></li>
    {{/paginate}}
  </ul>
</div>
```
