/*jshint node:true*/
/*jshint mocha:true*/
'use strict';

var assert = require('assert');
var sinon = require('sinon');
var paginate = require('..');

var originalUrl = 'http://localhost';
var expectedUrl = new URL(originalUrl);

function setPageParamAndGetUrlHref(url, n) {
  if (url instanceof URL === true) {
    url.searchParams.set('page', n);
    return url.href;
  }
  return null;
}

describe('Handlebars Paginate Helper', function () {
  var options;

  beforeEach(function () {
    options = {
      fn: sinon.stub(),
      hash: {}
    };
  });

  describe('when type is "first"', function () {

    beforeEach(function () {
      options.hash.type = 'first';
    });

    it('should call options.fn with expected context', function () {
      var cases = [{
        input: {
          page: 1,
          pageCount: 3
        },
        expected: {
          disabled: true,
          n: 1,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
        }
      }, {
        input: {
          page: 2,
          pageCount: 3
        },
        expected: {
          n: 1,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
        }
      }, {
        input: {
          page: 3,
          pageCount: 3
        },
        expected: {
          n: 1,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
        }
      }];

      cases.forEach(function (test) {
        options.fn.reset();
        paginate(test.input, options);
        assert(options.fn.calledWith(test.expected));
      });
    });
  });

  describe('when type is "previous"', function () {

    beforeEach(function () {
      options.hash.type = 'previous';
    });

    it('should call options.fn with expected context', function () {
      var cases = [{
        input: {
          page: 1,
          pageCount: 1
        },
        expected: {
          disabled: true,
          n: 1,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
        }
      }, {
        input: {
          page: 2,
          pageCount: 2
        },
        expected: {
          n: 1,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
        }
      }];

      cases.forEach(function (test) {
        options.fn.reset();
        paginate(test.input, options);
        assert(options.fn.calledWith(test.expected));
      });
    });
  });

  describe('when type is "middle"', function () {

    beforeEach(function () {
      options.hash.type = 'middle';
    });

    describe('and limit is specified', function () {

      beforeEach(function () {
        options.hash.limit = 5;
      });

      it('should call options.fn with expected context', function () {
        var cases = [{
          input: {
            page: 1,
            pageCount: 7
          },
          expected: [{
            n: 1,
            active: true,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
          }, {
            n: 2,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
          }, {
            n: 3,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
          }, {
            n: 4,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 4)
          }, {
            n: 5,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 5)
          }]
        }, {
          input: {
            page: 2,
            pageCount: 7
          },
          expected: [{
            n: 1,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
          }, {
            n: 2,
            active: true,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
          }, {
            n: 3,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
          }, {
            n: 4,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 4)
          }, {
            n: 5,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 5)
          }]
        }, {
          input: {
            page: 3,
            pageCount: 7
          },
          expected: [{
            n: 1,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
          }, {
            n: 2,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
          }, {
            n: 3,
            active: true,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
          }, {
            n: 4,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 4)
          }, {
            n: 5,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 5)
          }]
        }, {
          input: {
            page: 4,
            pageCount: 7
          },
          expected: [{
            n: 2,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
          }, {
            n: 3,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
          }, {
            n: 4,
            active: true,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 4)
          }, {
            n: 5,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 5)
          }, {
            n: 6,
            fullUrl: setPageParamAndGetUrlHref(expectedUrl, 6)
          }]
        }];

        cases.forEach(function (test) {
          options.fn.reset();
          paginate(test.input, options);
          test.expected.forEach(function (expected) {
            assert(options.fn.calledWith(expected));
          });
        });
      });
    });

    describe('and limit is not specified', function () {

      it('should call options.fn with expected context', function () {
        var cases = [{
          input: {
            page: 1,
            pageCount: 7
          },
          expected: [{
              n: 1,
              active: true,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 1)
            }, {
              n: 2,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
            },
            {
              n: 3,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
            },
            {
              n: 4,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 4)
            },
            {
              n: 5,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 5)
            }, {
              n: 6,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 6)
            }, {
              n: 7,
              fullUrl: setPageParamAndGetUrlHref(expectedUrl, 7)
            }
          ]
        }];

        cases.forEach(function (test) {
          options.fn.reset();
          paginate(test.input, options);
          test.expected.forEach(function (expected) {
            assert(options.fn.calledWith(expected));
          });
        });
      });
    });
  });

  describe('when type is "next"', function () {

    beforeEach(function () {
      options.hash.type = 'next';
    });

    it('should call options.fn with expected context', function () {
      var cases = [{
        input: {
          page: 1,
          pageCount: 2
        },
        expected: {
          n: 2,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
        }
      }, {
        input: {
          page: 2,
          pageCount: 2
        },
        expected: {
          disabled: true,
          n: 2,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 2)
        }
      }];

      cases.forEach(function (test) {
        options.fn.reset();
        paginate(test.input, options);
        assert(options.fn.calledWith(test.expected));
      });
    });
  });

  describe('when type is "last"', function () {

    beforeEach(function () {
      options.hash.type = 'last';
    });

    it('should call options.fn with expected context', function () {
      var cases = [{
        input: {
          page: 1,
          pageCount: 3
        },
        expected: {
          n: 3,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
        }
      }, {
        input: {
          page: 2,
          pageCount: 3
        },
        expected: {
          n: 3,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
        }
      }, {
        input: {
          page: 3,
          pageCount: 3
        },
        expected: {
          disabled: true,
          n: 3,
          fullUrl: setPageParamAndGetUrlHref(expectedUrl, 3)
        }
      }];

      cases.forEach(function (test) {
        options.fn.reset();
        paginate(test.input, options);
        assert(options.fn.calledWith(test.expected));
      });
    });
  });
});
