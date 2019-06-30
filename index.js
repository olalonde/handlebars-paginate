module.exports = function (pagination, options) {
  var type = options.hash.type || 'middle';
  var ret = '';
  var url = pagination.url || 'http://localhost';
  var paginatedUrl = new URL(url);
  var pageCount = Number(pagination.pageCount);
  var page = Number(pagination.page);
  var limit;
  if (options.hash.limit) limit = +options.hash.limit;

  //page pageCount
  var newContext = {};
  switch (type) {
    case 'middle':
      if (typeof limit === 'number') {
        var i = 0;
        var leftCount = Math.ceil(limit / 2) - 1;
        var rightCount = limit - leftCount - 1;
        if (page + rightCount > pageCount)
          leftCount = limit - (pageCount - page) - 1;
        if (page - leftCount < 1)
          leftCount = page - 1;
        var start = page - leftCount;

        while (i < limit && i < pageCount) {
          paginatedUrl.searchParams.set('page', start);
          newContext = {
            n: start,
            paginatedUrl: paginatedUrl.href
          };
          if (start === page) newContext.active = true;
          ret = ret + options.fn(newContext);
          start++;
          i++;
        }
      } else {
        for (var i = 1; i <= pageCount; i++) {
          paginatedUrl.searchParams.set('page', i);
          newContext = {
            n: i,
            paginatedUrl: paginatedUrl.href
          };
          if (i === page) newContext.active = true;
          ret = ret + options.fn(newContext);
        }
      }
      break;
    case 'previous':
      if (page === 1) {
        paginatedUrl.searchParams.set('page', 1)
        newContext = {
          disabled: true,
          n: 1,
          paginatedUrl: paginatedUrl.href
        }
      } else {
        paginatedUrl.searchParams.set('page', page - 1);
        newContext = {
          n: page - 1,
          paginatedUrl: paginatedUrl.href
        }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'next':
      newContext = {};
      if (page === pageCount) {
        paginatedUrl.searchParams.set('page', pageCount);
        newContext = {
          disabled: true,
          n: pageCount,
          paginatedUrl: paginatedUrl.href
        }
      } else {
        paginatedUrl.searchParams.set('page', page + 1);
        newContext = {
          n: page + 1,
          paginatedUrl: paginatedUrl.href
        }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'first':
      if (page === 1) {
        paginatedUrl.searchParams.set('page', 1);
        newContext = {
          disabled: true,
          n: 1,
          paginatedUrl: paginatedUrl.href
        }
      } else {
        paginatedUrl.searchParams.set('page', 1);
        newContext = {
          n: 1,
          paginatedUrl: paginatedUrl.href
        }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'last':
      if (page === pageCount) {
        paginatedUrl.searchParams.set('page', pageCount);
        newContext = {
          disabled: true,
          n: pageCount,
          paginatedUrl: paginatedUrl.href
        }
      } else {
        paginatedUrl.searchParams.set('page', pageCount);
        newContext = {
          n: pageCount,
          paginatedUrl: paginatedUrl.href
        }
      }
      ret = ret + options.fn(newContext);
      break;
  }

  return ret;
};
