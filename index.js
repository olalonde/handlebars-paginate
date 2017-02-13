module.exports = function(pagination, options) {
  var type = options.hash.type || 'middle';
  var ret = '';
  var pageCount = Number(pagination.pageCount);
  var page = Number(pagination.page);
  var limit;
  var id='';
  if (options.hash.limit) limit = +options.hash.limit;
  if (options.hash.id) id = options.hash.id;

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
          newContext = { n: start , id:id};
          if (start === page) newContext.active = true;
          ret = ret + options.fn(newContext);
          start++;
          i++;
        }
      }
      else {
        for (var i = 1; i <= pageCount; i++) {
          newContext = { n: i , id:id};
          if (i === page) newContext.active = true;
          ret = ret + options.fn(newContext);
        }
      }
      break;
    case 'previous':
      if (page === 1) {
        newContext = { disabled: true, n: 1 , id:id}
      }
      else {
        newContext = { n: page - 1 , id:id}
      }
      ret = ret + options.fn(newContext);
      break;
    case 'next':
      newContext = {};
      if (page === pageCount) {
        newContext = { disabled: true, n: pageCount , id:id}
      }
      else {
        newContext = { n: page + 1 }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'first':
      if (page === 1) {
        newContext = { disabled: true, n: 1 , id:id}
      }
      else {
        newContext = { n: 1 }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'last':
      if (page === pageCount) {
        newContext = { disabled: true, n: pageCount , id:id}
      }
      else {
        newContext = { n: pageCount , id:id}
      }
      ret = ret + options.fn(newContext);
      break;
  }

  return ret;
};
