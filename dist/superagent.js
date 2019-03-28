(function(f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.superagent = f();
  }
})(function() {
  var define, module, exports;
  return (function() {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = 'function' == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = 'MODULE_NOT_FOUND'), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function(r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = 'function' == typeof require && require, i = 0;
        i < t.length;
        i++
      )
        o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function(require, module, exports) {
          'use strict';

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance'
            );
          }

          function _iterableToArray(iter) {
            if (
              Symbol.iterator in Object(iter) ||
              Object.prototype.toString.call(iter) === '[object Arguments]'
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) {
              for (
                var i = 0, arr2 = new Array(arr.length);
                i < arr.length;
                i++
              ) {
                arr2[i] = arr[i];
              }

              return arr2;
            }
          }

          function Agent() {
            this._defaults = [];
          }

          [
            'use',
            'on',
            'once',
            'set',
            'query',
            'type',
            'accept',
            'auth',
            'withCredentials',
            'sortQuery',
            'retry',
            'ok',
            'redirects',
            'timeout',
            'buffer',
            'serialize',
            'parse',
            'ca',
            'key',
            'pfx',
            'cert'
          ].forEach(function(fn) {
            // Default setting for all requests from this agent
            Agent.prototype[fn] = function() {
              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key];
              }

              this._defaults.push({
                fn: fn,
                args: args
              });

              return this;
            };
          });

          Agent.prototype._setDefaults = function(req) {
            this._defaults.forEach(function(def) {
              req[def.fn].apply(req, _toConsumableArray(def.args));
            });
          };

          module.exports = Agent;
        },
        {}
      ],
      2: [
        function(require, module, exports) {
          'use strict';
          /**
           * Check if `obj` is an object.
           *
           * @param {Object} obj
           * @return {Boolean}
           * @api private
           */

          function _typeof2(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof2 = function _typeof2(obj) {
                return typeof obj;
              };
            } else {
              _typeof2 = function _typeof2(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj;
              };
            }
            return _typeof2(obj);
          }

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              _typeof2(Symbol.iterator) === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return _typeof2(obj);
              };
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : _typeof2(obj);
              };
            }

            return _typeof(obj);
          }

          function isObject(obj) {
            return obj !== null && _typeof(obj) === 'object';
          }

          module.exports = isObject;
        },
        {}
      ],
      3: [
        function(require, module, exports) {
          'use strict';

          function _typeof2(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof2 = function _typeof2(obj) {
                return typeof obj;
              };
            } else {
              _typeof2 = function _typeof2(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj;
              };
            }
            return _typeof2(obj);
          }

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              _typeof2(Symbol.iterator) === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return _typeof2(obj);
              };
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : _typeof2(obj);
              };
            }

            return _typeof(obj);
          }
          /**
           * Root reference for iframes.
           */

          var root;

          if (typeof window !== 'undefined') {
            // Browser window
            root = window;
          } else if (typeof self !== 'undefined') {
            // Web Worker
            root = self;
          } else {
            // Other environments
            console.warn(
              'Using browser-only version of superagent in non-browser environment'
            );
            root = void 0;
          }

          var Emitter = require('component-emitter');

          var RequestBase = require('./request-base');

          var isObject = require('./is-object');

          var ResponseBase = require('./response-base');

          var Agent = require('./agent-base');
          /**
           * Noop.
           */

          function noop() {}
          /**
           * Expose `request`.
           */

          var request = (exports = module.exports = function(method, url) {
            // callback
            if (typeof url === 'function') {
              return new exports.Request('GET', method).end(url);
            } // url first

            if (arguments.length == 1) {
              return new exports.Request('GET', method);
            }

            return new exports.Request(method, url);
          });

          exports.Request = Request;
          /**
           * Determine XHR.
           */

          request.getXHR = function() {
            if (
              root.XMLHttpRequest &&
              (!root.location ||
                root.location.protocol != 'file:' ||
                !root.ActiveXObject)
            ) {
              return new XMLHttpRequest();
            }

            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {}

            try {
              return new ActiveXObject('Msxml2.XMLHTTP.6.0');
            } catch (e) {}

            try {
              return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            } catch (e) {}

            try {
              return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {}

            throw new Error(
              'Browser-only version of superagent could not find XHR'
            );
          };
          /**
           * Removes leading and trailing whitespace, added to support IE.
           *
           * @param {String} s
           * @return {String}
           * @api private
           */

          var trim = ''.trim
            ? function(s) {
                return s.trim();
              }
            : function(s) {
                return s.replace(/(^\s*|\s*$)/g, '');
              };
          /**
           * Serialize the given `obj`.
           *
           * @param {Object} obj
           * @return {String}
           * @api private
           */

          function serialize(obj) {
            if (!isObject(obj)) return obj;
            var pairs = [];

            for (var key in obj) {
              pushEncodedKeyValuePair(pairs, key, obj[key]);
            }

            return pairs.join('&');
          }
          /**
           * Helps 'serialize' with serializing arrays.
           * Mutates the pairs array.
           *
           * @param {Array} pairs
           * @param {String} key
           * @param {Mixed} val
           */

          function pushEncodedKeyValuePair(pairs, key, val) {
            if (val != null) {
              if (Array.isArray(val)) {
                val.forEach(function(v) {
                  pushEncodedKeyValuePair(pairs, key, v);
                });
              } else if (isObject(val)) {
                for (var subkey in val) {
                  pushEncodedKeyValuePair(
                    pairs,
                    ''.concat(key, '[').concat(subkey, ']'),
                    val[subkey]
                  );
                }
              } else {
                pairs.push(
                  encodeURIComponent(key) + '=' + encodeURIComponent(val)
                );
              }
            } else if (val === null) {
              pairs.push(encodeURIComponent(key));
            }
          }
          /**
           * Expose serialization method.
           */

          request.serializeObject = serialize;
          /**
           * Parse the given x-www-form-urlencoded `str`.
           *
           * @param {String} str
           * @return {Object}
           * @api private
           */

          function parseString(str) {
            var obj = {};
            var pairs = str.split('&');
            var pair;
            var pos;

            for (var i = 0, len = pairs.length; i < len; ++i) {
              pair = pairs[i];
              pos = pair.indexOf('=');

              if (pos == -1) {
                obj[decodeURIComponent(pair)] = '';
              } else {
                obj[
                  decodeURIComponent(pair.slice(0, pos))
                ] = decodeURIComponent(pair.slice(pos + 1));
              }
            }

            return obj;
          }
          /**
           * Expose parser.
           */

          request.parseString = parseString;
          /**
           * Default MIME type map.
           *
           *     superagent.types.xml = 'application/xml';
           *
           */

          request.types = {
            html: 'text/html',
            json: 'application/json',
            xml: 'text/xml',
            urlencoded: 'application/x-www-form-urlencoded',
            form: 'application/x-www-form-urlencoded',
            'form-data': 'application/x-www-form-urlencoded'
          };
          /**
           * Default serialization map.
           *
           *     superagent.serialize['application/xml'] = function(obj){
           *       return 'generated xml here';
           *     };
           *
           */

          request.serialize = {
            'application/x-www-form-urlencoded': serialize,
            'application/json': JSON.stringify
          };
          /**
           * Default parsers.
           *
           *     superagent.parse['application/xml'] = function(str){
           *       return { object parsed from str };
           *     };
           *
           */

          request.parse = {
            'application/x-www-form-urlencoded': parseString,
            'application/json': JSON.parse
          };
          /**
           * Parse the given header `str` into
           * an object containing the mapped fields.
           *
           * @param {String} str
           * @return {Object}
           * @api private
           */

          function parseHeader(str) {
            var lines = str.split(/\r?\n/);
            var fields = {};
            var index;
            var line;
            var field;
            var val;

            for (var i = 0, len = lines.length; i < len; ++i) {
              line = lines[i];
              index = line.indexOf(':');

              if (index === -1) {
                // could be empty line, just skip it
                continue;
              }

              field = line.slice(0, index).toLowerCase();
              val = trim(line.slice(index + 1));
              fields[field] = val;
            }

            return fields;
          }
          /**
           * Check if `mime` is json or has +json structured syntax suffix.
           *
           * @param {String} mime
           * @return {Boolean}
           * @api private
           */

          function isJSON(mime) {
            // should match /json or +json
            // but not /json-seq
            return /[\/+]json($|[^-\w])/.test(mime);
          }
          /**
           * Initialize a new `Response` with the given `xhr`.
           *
           *  - set flags (.ok, .error, etc)
           *  - parse header
           *
           * Examples:
           *
           *  Aliasing `superagent` as `request` is nice:
           *
           *      request = superagent;
           *
           *  We can use the promise-like API, or pass callbacks:
           *
           *      request.get('/').end(function(res){});
           *      request.get('/', function(res){});
           *
           *  Sending data can be chained:
           *
           *      request
           *        .post('/user')
           *        .send({ name: 'tj' })
           *        .end(function(res){});
           *
           *  Or passed to `.send()`:
           *
           *      request
           *        .post('/user')
           *        .send({ name: 'tj' }, function(res){});
           *
           *  Or passed to `.post()`:
           *
           *      request
           *        .post('/user', { name: 'tj' })
           *        .end(function(res){});
           *
           * Or further reduced to a single call for simple cases:
           *
           *      request
           *        .post('/user', { name: 'tj' }, function(res){});
           *
           * @param {XMLHTTPRequest} xhr
           * @param {Object} options
           * @api private
           */

          function Response(req) {
            this.req = req;
            this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

            this.text =
              (this.req.method != 'HEAD' &&
                (this.xhr.responseType === '' ||
                  this.xhr.responseType === 'text')) ||
              typeof this.xhr.responseType === 'undefined'
                ? this.xhr.responseText
                : null;
            this.statusText = this.req.xhr.statusText;
            var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

            if (status === 1223) {
              status = 204;
            }

            this._setStatusProperties(status);

            this.header = this.headers = parseHeader(
              this.xhr.getAllResponseHeaders()
            ); // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
            // getResponseHeader still works. so we get content-type even if getting
            // other headers fails.

            this.header['content-type'] = this.xhr.getResponseHeader(
              'content-type'
            );

            this._setHeaderProperties(this.header);

            if (this.text === null && req._responseType) {
              this.body = this.xhr.response;
            } else {
              this.body =
                this.req.method != 'HEAD'
                  ? this._parseBody(this.text ? this.text : this.xhr.response)
                  : null;
            }
          }

          ResponseBase(Response.prototype);
          /**
           * Parse the given body `str`.
           *
           * Used for auto-parsing of bodies. Parsers
           * are defined on the `superagent.parse` object.
           *
           * @param {String} str
           * @return {Mixed}
           * @api private
           */

          Response.prototype._parseBody = function(str) {
            var parse = request.parse[this.type];

            if (this.req._parser) {
              return this.req._parser(this, str);
            }

            if (!parse && isJSON(this.type)) {
              parse = request.parse['application/json'];
            }

            return parse && str && (str.length || str instanceof Object)
              ? parse(str)
              : null;
          };
          /**
           * Return an `Error` representative of this response.
           *
           * @return {Error}
           * @api public
           */

          Response.prototype.toError = function() {
            var req = this.req;
            var method = req.method;
            var url = req.url;
            var msg = 'cannot '
              .concat(method, ' ')
              .concat(url, ' (')
              .concat(this.status, ')');
            var err = new Error(msg);
            err.status = this.status;
            err.method = method;
            err.url = url;
            return err;
          };
          /**
           * Expose `Response`.
           */

          request.Response = Response;
          /**
           * Initialize a new `Request` with the given `method` and `url`.
           *
           * @param {String} method
           * @param {String} url
           * @api public
           */

          function Request(method, url) {
            var self = this;
            this._query = this._query || [];
            this.method = method;
            this.url = url;
            this.header = {}; // preserves header name case

            this._header = {}; // coerces header names to lowercase

            this.on('end', function() {
              var err = null;
              var res = null;

              try {
                res = new Response(self);
              } catch (e) {
                err = new Error('Parser is unable to parse the response');
                err.parse = true;
                err.original = e; // issue #675: return the raw response if the response parsing fails

                if (self.xhr) {
                  // ie9 doesn't have 'response' property
                  err.rawResponse =
                    typeof self.xhr.responseType === 'undefined'
                      ? self.xhr.responseText
                      : self.xhr.response; // issue #876: return the http status code if the response parsing fails

                  err.status = self.xhr.status ? self.xhr.status : null;
                  err.statusCode = err.status; // backwards-compat only
                } else {
                  err.rawResponse = null;
                  err.status = null;
                }

                return self.callback(err);
              }

              self.emit('response', res);
              var new_err;

              try {
                if (!self._isResponseOK(res)) {
                  new_err = new Error(
                    res.statusText || 'Unsuccessful HTTP response'
                  );
                }
              } catch (custom_err) {
                new_err = custom_err; // ok() callback can throw
              } // #1000 don't catch errors from the callback to avoid double calling it

              if (new_err) {
                new_err.original = err;
                new_err.response = res;
                new_err.status = res.status;
                self.callback(new_err, res);
              } else {
                self.callback(null, res);
              }
            });
          }
          /**
           * Mixin `Emitter` and `RequestBase`.
           */

          Emitter(Request.prototype);
          RequestBase(Request.prototype);
          /**
           * Set Content-Type to `type`, mapping values from `request.types`.
           *
           * Examples:
           *
           *      superagent.types.xml = 'application/xml';
           *
           *      request.post('/')
           *        .type('xml')
           *        .send(xmlstring)
           *        .end(callback);
           *
           *      request.post('/')
           *        .type('application/xml')
           *        .send(xmlstring)
           *        .end(callback);
           *
           * @param {String} type
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.type = function(type) {
            this.set('Content-Type', request.types[type] || type);
            return this;
          };
          /**
           * Set Accept to `type`, mapping values from `request.types`.
           *
           * Examples:
           *
           *      superagent.types.json = 'application/json';
           *
           *      request.get('/agent')
           *        .accept('json')
           *        .end(callback);
           *
           *      request.get('/agent')
           *        .accept('application/json')
           *        .end(callback);
           *
           * @param {String} accept
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.accept = function(type) {
            this.set('Accept', request.types[type] || type);
            return this;
          };
          /**
           * Set Authorization field value with `user` and `pass`.
           *
           * @param {String} user
           * @param {String} [pass] optional in case of using 'bearer' as type
           * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.auth = function(user, pass, options) {
            if (arguments.length === 1) pass = '';

            if (_typeof(pass) === 'object' && pass !== null) {
              // pass is optional and can be replaced with options
              options = pass;
              pass = '';
            }

            if (!options) {
              options = {
                type: typeof btoa === 'function' ? 'basic' : 'auto'
              };
            }

            var encoder = function encoder(string) {
              if (typeof btoa === 'function') {
                return btoa(string);
              }

              throw new Error('Cannot use basic auth, btoa is not a function');
            };

            return this._auth(user, pass, options, encoder);
          };
          /**
           * Add query-string `val`.
           *
           * Examples:
           *
           *   request.get('/shoes')
           *     .query('size=10')
           *     .query({ color: 'blue' })
           *
           * @param {Object|String} val
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.query = function(val) {
            if (typeof val !== 'string') val = serialize(val);
            if (val) this._query.push(val);
            return this;
          };
          /**
           * Queue the given `file` as an attachment to the specified `field`,
           * with optional `options` (or filename).
           *
           * ``` js
           * request.post('/upload')
           *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
           *   .end(callback);
           * ```
           *
           * @param {String} field
           * @param {Blob|File} file
           * @param {String|Object} options
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.attach = function(field, file, options) {
            if (file) {
              if (this._data) {
                throw new Error("superagent can't mix .send() and .attach()");
              }

              this._getFormData().append(field, file, options || file.name);
            }

            return this;
          };

          Request.prototype._getFormData = function() {
            if (!this._formData) {
              this._formData = new root.FormData();
            }

            return this._formData;
          };
          /**
           * Invoke the callback with `err` and `res`
           * and handle arity check.
           *
           * @param {Error} err
           * @param {Response} res
           * @api private
           */

          Request.prototype.callback = function(err, res) {
            if (this._shouldRetry(err, res)) {
              return this._retry();
            }

            var fn = this._callback;
            this.clearTimeout();

            if (err) {
              if (this._maxRetries) err.retries = this._retries - 1;
              this.emit('error', err);
            }

            fn(err, res);
          };
          /**
           * Invoke callback with x-domain error.
           *
           * @api private
           */

          Request.prototype.crossDomainError = function() {
            var err = new Error(
              'Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'
            );
            err.crossDomain = true;
            err.status = this.status;
            err.method = this.method;
            err.url = this.url;
            this.callback(err);
          }; // This only warns, because the request is still likely to work

          Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function() {
            console.warn(
              'This is not supported in browser version of superagent'
            );
            return this;
          }; // This throws, because it can't send/receive data as expected

          Request.prototype.pipe = Request.prototype.write = function() {
            throw new Error(
              'Streaming is not supported in browser version of superagent'
            );
          };
          /**
           * Check if `obj` is a host object,
           * we don't want to serialize these :)
           *
           * @param {Object} obj
           * @return {Boolean}
           * @api private
           */

          Request.prototype._isHost = function _isHost(obj) {
            // Native objects stringify to [object File], [object Blob], [object FormData], etc.
            return (
              obj &&
              _typeof(obj) === 'object' &&
              !Array.isArray(obj) &&
              Object.prototype.toString.call(obj) !== '[object Object]'
            );
          };
          /**
           * Initiate request, invoking callback `fn(res)`
           * with an instanceof `Response`.
           *
           * @param {Function} fn
           * @return {Request} for chaining
           * @api public
           */

          Request.prototype.end = function(fn) {
            if (this._endCalled) {
              console.warn(
                'Warning: .end() was called twice. This is not supported in superagent'
              );
            }

            this._endCalled = true; // store callback

            this._callback = fn || noop; // querystring

            this._finalizeQueryString();

            this._end();
          };

          Request.prototype._end = function() {
            if (this._aborted)
              return this.callback(
                new Error(
                  'The request has been aborted even before .end() was called'
                )
              );
            var self = this;
            var xhr = (this.xhr = request.getXHR());
            var data = this._formData || this._data;

            this._setTimeouts(); // state change

            xhr.onreadystatechange = function() {
              var readyState = xhr.readyState;

              if (readyState >= 2 && self._responseTimeoutTimer) {
                clearTimeout(self._responseTimeoutTimer);
              }

              if (readyState != 4) {
                return;
              } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
              // result in the error "Could not complete the operation due to error c00c023f"

              var status;

              try {
                status = xhr.status;
              } catch (e) {
                status = 0;
              }

              if (!status) {
                if (self.timedout || self._aborted) return;
                return self.crossDomainError();
              }

              self.emit('end');
            }; // progress

            var handleProgress = function handleProgress(direction, e) {
              if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
              }

              e.direction = direction;
              self.emit('progress', e);
            };

            if (this.hasListeners('progress')) {
              try {
                xhr.addEventListener(
                  'progress',
                  handleProgress.bind(null, 'download')
                );

                if (xhr.upload) {
                  xhr.upload.addEventListener(
                    'progress',
                    handleProgress.bind(null, 'upload')
                  );
                }
              } catch (e) {
                // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
                // Reported here:
                // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
              }
            } // initiate request

            try {
              if (this.username && this.password) {
                xhr.open(
                  this.method,
                  this.url,
                  true,
                  this.username,
                  this.password
                );
              } else {
                xhr.open(this.method, this.url, true);
              }
            } catch (err) {
              // see #1149
              return this.callback(err);
            } // CORS

            if (this._withCredentials) xhr.withCredentials = true; // body

            if (
              !this._formData &&
              this.method != 'GET' &&
              this.method != 'HEAD' &&
              typeof data !== 'string' &&
              !this._isHost(data)
            ) {
              // serialize stuff
              var contentType = this._header['content-type'];

              var _serialize =
                this._serializer ||
                request.serialize[contentType ? contentType.split(';')[0] : ''];

              if (!_serialize && isJSON(contentType)) {
                _serialize = request.serialize['application/json'];
              }

              if (_serialize) data = _serialize(data);
            } // set header fields

            for (var field in this.header) {
              if (this.header[field] == null) continue;
              if (this.header.hasOwnProperty(field))
                xhr.setRequestHeader(field, this.header[field]);
            }

            if (this._responseType) {
              xhr.responseType = this._responseType;
            } // send stuff

            this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
            // We need null here if data is undefined

            xhr.send(typeof data !== 'undefined' ? data : null);
          };

          request.agent = function() {
            return new Agent();
          };

          ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function(
            method
          ) {
            Agent.prototype[method.toLowerCase()] = function(url, fn) {
              var req = new request.Request(method, url);

              this._setDefaults(req);

              if (fn) {
                req.end(fn);
              }

              return req;
            };
          });
          Agent.prototype.del = Agent.prototype.delete;
          /**
           * GET `url` with optional callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed|Function} [data] or fn
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.get = function(url, data, fn) {
            var req = request('GET', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.query(data);
            if (fn) req.end(fn);
            return req;
          };
          /**
           * HEAD `url` with optional callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed|Function} [data] or fn
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.head = function(url, data, fn) {
            var req = request('HEAD', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.query(data);
            if (fn) req.end(fn);
            return req;
          };
          /**
           * OPTIONS query to `url` with optional callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed|Function} [data] or fn
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.options = function(url, data, fn) {
            var req = request('OPTIONS', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.send(data);
            if (fn) req.end(fn);
            return req;
          };
          /**
           * DELETE `url` with optional `data` and callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed} [data]
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          function del(url, data, fn) {
            var req = request('DELETE', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.send(data);
            if (fn) req.end(fn);
            return req;
          }

          request.del = del;
          request.delete = del;
          /**
           * PATCH `url` with optional `data` and callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed} [data]
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.patch = function(url, data, fn) {
            var req = request('PATCH', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.send(data);
            if (fn) req.end(fn);
            return req;
          };
          /**
           * POST `url` with optional `data` and callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed} [data]
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.post = function(url, data, fn) {
            var req = request('POST', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.send(data);
            if (fn) req.end(fn);
            return req;
          };
          /**
           * PUT `url` with optional `data` and callback `fn(res)`.
           *
           * @param {String} url
           * @param {Mixed|Function} [data] or fn
           * @param {Function} [fn]
           * @return {Request}
           * @api public
           */

          request.put = function(url, data, fn) {
            var req = request('PUT', url);
            if (typeof data === 'function') (fn = data), (data = null);
            if (data) req.send(data);
            if (fn) req.end(fn);
            return req;
          };
        },
        {
          './agent-base': 1,
          './is-object': 2,
          './request-base': 4,
          './response-base': 5,
          'component-emitter': 7
        }
      ],
      4: [
        function(require, module, exports) {
          'use strict';
          /**
           * Module of mixed-in functions shared between node and client code
           */

          function _typeof2(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof2 = function _typeof2(obj) {
                return typeof obj;
              };
            } else {
              _typeof2 = function _typeof2(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj;
              };
            }
            return _typeof2(obj);
          }

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              _typeof2(Symbol.iterator) === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return _typeof2(obj);
              };
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : _typeof2(obj);
              };
            }

            return _typeof(obj);
          }

          var isObject = require('./is-object');
          /**
           * Expose `RequestBase`.
           */

          module.exports = RequestBase;
          /**
           * Initialize a new `RequestBase`.
           *
           * @api public
           */

          function RequestBase(obj) {
            if (obj) return mixin(obj);
          }
          /**
           * Mixin the prototype properties.
           *
           * @param {Object} obj
           * @return {Object}
           * @api private
           */

          function mixin(obj) {
            for (var key in RequestBase.prototype) {
              obj[key] = RequestBase.prototype[key];
            }

            return obj;
          }
          /**
           * Clear previous timeout.
           *
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.clearTimeout = function _clearTimeout() {
            clearTimeout(this._timer);
            clearTimeout(this._responseTimeoutTimer);
            clearTimeout(this._uploadTimeoutTimer);
            delete this._timer;
            delete this._responseTimeoutTimer;
            delete this._uploadTimeoutTimer;
            return this;
          };
          /**
           * Override default response body parser
           *
           * This function will be called to convert incoming data into request.body
           *
           * @param {Function}
           * @api public
           */

          RequestBase.prototype.parse = function parse(fn) {
            this._parser = fn;
            return this;
          };
          /**
           * Set format of binary response body.
           * In browser valid formats are 'blob' and 'arraybuffer',
           * which return Blob and ArrayBuffer, respectively.
           *
           * In Node all values result in Buffer.
           *
           * Examples:
           *
           *      req.get('/')
           *        .responseType('blob')
           *        .end(callback);
           *
           * @param {String} val
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.responseType = function(val) {
            this._responseType = val;
            return this;
          };
          /**
           * Override default request body serializer
           *
           * This function will be called to convert data set via .send or .attach into payload to send
           *
           * @param {Function}
           * @api public
           */

          RequestBase.prototype.serialize = function serialize(fn) {
            this._serializer = fn;
            return this;
          };
          /**
           * Set timeouts.
           *
           * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
           * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
           * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
           *
           * Value of 0 or false means no timeout.
           *
           * @param {Number|Object} ms or {response, deadline}
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.timeout = function timeout(options) {
            if (!options || _typeof(options) !== 'object') {
              this._timeout = options;
              this._responseTimeout = 0;
              this._uploadTimeout = 0;
              return this;
            }

            for (var option in options) {
              switch (option) {
                case 'deadline':
                  this._timeout = options.deadline;
                  break;

                case 'response':
                  this._responseTimeout = options.response;
                  break;

                case 'upload':
                  this._uploadTimeout = options.upload;
                  break;

                default:
                  console.warn('Unknown timeout option', option);
              }
            }

            return this;
          };
          /**
           * Set number of retry attempts on error.
           *
           * Failed requests will be retried 'count' times if timeout or err.code >= 500.
           *
           * @param {Number} count
           * @param {Function} [fn]
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.retry = function retry(count, fn) {
            // Default to 1 if no count passed or true
            if (arguments.length === 0 || count === true) count = 1;
            if (count <= 0) count = 0;
            this._maxRetries = count;
            this._retries = 0;
            this._retryCallback = fn;
            return this;
          };

          var ERROR_CODES = [
            'ECONNRESET',
            'ETIMEDOUT',
            'EADDRINFO',
            'ESOCKETTIMEDOUT'
          ];
          /**
           * Determine if a request should be retried.
           * (Borrowed from segmentio/superagent-retry)
           *
           * @param {Error} err
           * @param {Response} [res]
           * @returns {Boolean}
           */

          RequestBase.prototype._shouldRetry = function(err, res) {
            if (!this._maxRetries || this._retries++ >= this._maxRetries) {
              return false;
            }

            if (this._retryCallback) {
              try {
                var override = this._retryCallback(err, res);

                if (override === true) return true;
                if (override === false) return false; // undefined falls back to defaults
              } catch (e) {
                console.error(e);
              }
            }

            if (res && res.status && res.status >= 500 && res.status != 501)
              return true;

            if (err) {
              if (err.code && ~ERROR_CODES.indexOf(err.code)) return true; // Superagent timeout

              if (err.timeout && err.code == 'ECONNABORTED') return true;
              if (err.crossDomain) return true;
            }

            return false;
          };
          /**
           * Retry request
           *
           * @return {Request} for chaining
           * @api private
           */

          RequestBase.prototype._retry = function() {
            this.clearTimeout(); // node

            if (this.req) {
              this.req = null;
              this.req = this.request();
            }

            this._aborted = false;
            this.timedout = false;
            return this._end();
          };
          /**
           * Promise support
           *
           * @param {Function} resolve
           * @param {Function} [reject]
           * @return {Request}
           */

          RequestBase.prototype.then = function then(resolve, reject) {
            var _this = this;

            if (!this._fullfilledPromise) {
              var self = this;

              if (this._endCalled) {
                console.warn(
                  'Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises'
                );
              }

              this._fullfilledPromise = new Promise(function(
                innerResolve,
                innerReject
              ) {
                self.on('abort', function() {
                  var err = new Error('Aborted');
                  err.code = 'ABORTED';
                  err.status = _this.status;
                  err.method = _this.method;
                  err.url = _this.url;
                  innerReject(err);
                });
                self.end(function(err, res) {
                  if (err) innerReject(err);
                  else innerResolve(res);
                });
              });
            }

            return this._fullfilledPromise.then(resolve, reject);
          };

          RequestBase.prototype.catch = function(cb) {
            return this.then(undefined, cb);
          };
          /**
           * Allow for extension
           */

          RequestBase.prototype.use = function use(fn) {
            fn(this);
            return this;
          };

          RequestBase.prototype.ok = function(cb) {
            if (typeof cb !== 'function') throw new Error('Callback required');
            this._okCallback = cb;
            return this;
          };

          RequestBase.prototype._isResponseOK = function(res) {
            if (!res) {
              return false;
            }

            if (this._okCallback) {
              return this._okCallback(res);
            }

            return res.status >= 200 && res.status < 300;
          };
          /**
           * Get request header `field`.
           * Case-insensitive.
           *
           * @param {String} field
           * @return {String}
           * @api public
           */

          RequestBase.prototype.get = function(field) {
            return this._header[field.toLowerCase()];
          };
          /**
           * Get case-insensitive header `field` value.
           * This is a deprecated internal API. Use `.get(field)` instead.
           *
           * (getHeader is no longer used internally by the superagent code base)
           *
           * @param {String} field
           * @return {String}
           * @api private
           * @deprecated
           */

          RequestBase.prototype.getHeader = RequestBase.prototype.get;
          /**
           * Set header `field` to `val`, or multiple fields with one object.
           * Case-insensitive.
           *
           * Examples:
           *
           *      req.get('/')
           *        .set('Accept', 'application/json')
           *        .set('X-API-Key', 'foobar')
           *        .end(callback);
           *
           *      req.get('/')
           *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
           *        .end(callback);
           *
           * @param {String|Object} field
           * @param {String} val
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.set = function(field, val) {
            if (isObject(field)) {
              for (var key in field) {
                this.set(key, field[key]);
              }

              return this;
            }

            this._header[field.toLowerCase()] = val;
            this.header[field] = val;
            return this;
          };
          /**
           * Remove header `field`.
           * Case-insensitive.
           *
           * Example:
           *
           *      req.get('/')
           *        .unset('User-Agent')
           *        .end(callback);
           *
           * @param {String} field
           */

          RequestBase.prototype.unset = function(field) {
            delete this._header[field.toLowerCase()];
            delete this.header[field];
            return this;
          };
          /**
           * Write the field `name` and `val`, or multiple fields with one object
           * for "multipart/form-data" request bodies.
           *
           * ``` js
           * request.post('/upload')
           *   .field('foo', 'bar')
           *   .end(callback);
           *
           * request.post('/upload')
           *   .field({ foo: 'bar', baz: 'qux' })
           *   .end(callback);
           * ```
           *
           * @param {String|Object} name
           * @param {String|Blob|File|Buffer|fs.ReadStream} val
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.field = function(name, val) {
            // name should be either a string or an object.
            if (name === null || undefined === name) {
              throw new Error('.field(name, val) name can not be empty');
            }

            if (this._data) {
              throw new Error(
                ".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"
              );
            }

            if (isObject(name)) {
              for (var key in name) {
                this.field(key, name[key]);
              }

              return this;
            }

            if (Array.isArray(val)) {
              for (var i in val) {
                this.field(name, val[i]);
              }

              return this;
            } // val should be defined now

            if (val === null || undefined === val) {
              throw new Error('.field(name, val) val can not be empty');
            }

            if (typeof val === 'boolean') {
              val = String(val);
            }

            this._getFormData().append(name, val);

            return this;
          };
          /**
           * Abort the request, and clear potential timeout.
           *
           * @return {Request}
           * @api public
           */

          RequestBase.prototype.abort = function() {
            if (this._aborted) {
              return this;
            }

            this._aborted = true;
            this.xhr && this.xhr.abort(); // browser

            this.req && this.req.abort(); // node

            this.clearTimeout();
            this.emit('abort');
            return this;
          };

          RequestBase.prototype._auth = function(
            user,
            pass,
            options,
            base64Encoder
          ) {
            switch (options.type) {
              case 'basic':
                this.set(
                  'Authorization',
                  'Basic '.concat(
                    base64Encoder(''.concat(user, ':').concat(pass))
                  )
                );
                break;

              case 'auto':
                this.username = user;
                this.password = pass;
                break;

              case 'bearer':
                // usage would be .auth(accessToken, { type: 'bearer' })
                this.set('Authorization', 'Bearer '.concat(user));
                break;
            }

            return this;
          };
          /**
           * Enable transmission of cookies with x-domain requests.
           *
           * Note that for this to work the origin must not be
           * using "Access-Control-Allow-Origin" with a wildcard,
           * and also must set "Access-Control-Allow-Credentials"
           * to "true".
           *
           * @api public
           */

          RequestBase.prototype.withCredentials = function(on) {
            // This is browser-only functionality. Node side is no-op.
            if (on == undefined) on = true;
            this._withCredentials = on;
            return this;
          };
          /**
           * Set the max redirects to `n`. Does noting in browser XHR implementation.
           *
           * @param {Number} n
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.redirects = function(n) {
            this._maxRedirects = n;
            return this;
          };
          /**
           * Maximum size of buffered response body, in bytes. Counts uncompressed size.
           * Default 200MB.
           *
           * @param {Number} n
           * @return {Request} for chaining
           */

          RequestBase.prototype.maxResponseSize = function(n) {
            if (typeof n !== 'number') {
              throw new TypeError('Invalid argument');
            }

            this._maxResponseSize = n;
            return this;
          };
          /**
           * Convert to a plain javascript object (not JSON string) of scalar properties.
           * Note as this method is designed to return a useful non-this value,
           * it cannot be chained.
           *
           * @return {Object} describing method, url, and data of this request
           * @api public
           */

          RequestBase.prototype.toJSON = function() {
            return {
              method: this.method,
              url: this.url,
              data: this._data,
              headers: this._header
            };
          };
          /**
           * Send `data` as the request body, defaulting the `.type()` to "json" when
           * an object is given.
           *
           * Examples:
           *
           *       // manual json
           *       request.post('/user')
           *         .type('json')
           *         .send('{"name":"tj"}')
           *         .end(callback)
           *
           *       // auto json
           *       request.post('/user')
           *         .send({ name: 'tj' })
           *         .end(callback)
           *
           *       // manual x-www-form-urlencoded
           *       request.post('/user')
           *         .type('form')
           *         .send('name=tj')
           *         .end(callback)
           *
           *       // auto x-www-form-urlencoded
           *       request.post('/user')
           *         .type('form')
           *         .send({ name: 'tj' })
           *         .end(callback)
           *
           *       // defaults to x-www-form-urlencoded
           *      request.post('/user')
           *        .send('name=tobi')
           *        .send('species=ferret')
           *        .end(callback)
           *
           * @param {String|Object} data
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.send = function(data) {
            var isObj = isObject(data);
            var type = this._header['content-type'];

            if (this._formData) {
              throw new Error(
                ".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"
              );
            }

            if (isObj && !this._data) {
              if (Array.isArray(data)) {
                this._data = [];
              } else if (!this._isHost(data)) {
                this._data = {};
              }
            } else if (data && this._data && this._isHost(this._data)) {
              throw new Error("Can't merge these send calls");
            } // merge

            if (isObj && isObject(this._data)) {
              for (var key in data) {
                this._data[key] = data[key];
              }
            } else if (typeof data === 'string') {
              // default to x-www-form-urlencoded
              if (!type) this.type('form');
              type = this._header['content-type'];

              if (type == 'application/x-www-form-urlencoded') {
                this._data = this._data
                  ? ''.concat(this._data, '&').concat(data)
                  : data;
              } else {
                this._data = (this._data || '') + data;
              }
            } else {
              this._data = data;
            }

            if (!isObj || this._isHost(data)) {
              return this;
            } // default to json

            if (!type) this.type('json');
            return this;
          };
          /**
           * Sort `querystring` by the sort function
           *
           *
           * Examples:
           *
           *       // default order
           *       request.get('/user')
           *         .query('name=Nick')
           *         .query('search=Manny')
           *         .sortQuery()
           *         .end(callback)
           *
           *       // customized sort function
           *       request.get('/user')
           *         .query('name=Nick')
           *         .query('search=Manny')
           *         .sortQuery(function(a, b){
           *           return a.length - b.length;
           *         })
           *         .end(callback)
           *
           *
           * @param {Function} sort
           * @return {Request} for chaining
           * @api public
           */

          RequestBase.prototype.sortQuery = function(sort) {
            // _sort default to true but otherwise can be a function or boolean
            this._sort = typeof sort === 'undefined' ? true : sort;
            return this;
          };
          /**
           * Compose querystring to append to req.url
           *
           * @api private
           */

          RequestBase.prototype._finalizeQueryString = function() {
            var query = this._query.join('&');

            if (query) {
              this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
            }

            this._query.length = 0; // Makes the call idempotent

            if (this._sort) {
              var index = this.url.indexOf('?');

              if (index >= 0) {
                var queryArr = this.url.substring(index + 1).split('&');

                if (typeof this._sort === 'function') {
                  queryArr.sort(this._sort);
                } else {
                  queryArr.sort();
                }

                this.url =
                  this.url.substring(0, index) + '?' + queryArr.join('&');
              }
            }
          }; // For backwards compat only

          RequestBase.prototype._appendQueryString = function() {
            console.trace('Unsupported');
          };
          /**
           * Invoke callback with timeout error.
           *
           * @api private
           */

          RequestBase.prototype._timeoutError = function(
            reason,
            timeout,
            errno
          ) {
            if (this._aborted) {
              return;
            }

            var err = new Error(''.concat(reason + timeout, 'ms exceeded'));
            err.timeout = timeout;
            err.code = 'ECONNABORTED';
            err.errno = errno;
            this.timedout = true;
            this.abort();
            this.callback(err);
          };

          RequestBase.prototype._setTimeouts = function() {
            var self = this; // deadline

            if (this._timeout && !this._timer) {
              this._timer = setTimeout(function() {
                self._timeoutError('Timeout of ', self._timeout, 'ETIME');
              }, this._timeout);
            } // response timeout

            if (this._responseTimeout && !this._responseTimeoutTimer) {
              this._responseTimeoutTimer = setTimeout(function() {
                self._timeoutError(
                  'Response timeout of ',
                  self._responseTimeout,
                  'ETIMEDOUT'
                );
              }, this._responseTimeout);
            }
          };
        },
        { './is-object': 2 }
      ],
      5: [
        function(require, module, exports) {
          'use strict';
          /**
           * Module dependencies.
           */

          var utils = require('./utils');
          /**
           * Expose `ResponseBase`.
           */

          module.exports = ResponseBase;
          /**
           * Initialize a new `ResponseBase`.
           *
           * @api public
           */

          function ResponseBase(obj) {
            if (obj) return mixin(obj);
          }
          /**
           * Mixin the prototype properties.
           *
           * @param {Object} obj
           * @return {Object}
           * @api private
           */

          function mixin(obj) {
            for (var key in ResponseBase.prototype) {
              obj[key] = ResponseBase.prototype[key];
            }

            return obj;
          }
          /**
           * Get case-insensitive `field` value.
           *
           * @param {String} field
           * @return {String}
           * @api public
           */

          ResponseBase.prototype.get = function(field) {
            return this.header[field.toLowerCase()];
          };
          /**
           * Set header related properties:
           *
           *   - `.type` the content type without params
           *
           * A response of "Content-Type: text/plain; charset=utf-8"
           * will provide you with a `.type` of "text/plain".
           *
           * @param {Object} header
           * @api private
           */

          ResponseBase.prototype._setHeaderProperties = function(header) {
            // TODO: moar!
            // TODO: make this a util
            // content-type
            var ct = header['content-type'] || '';
            this.type = utils.type(ct); // params

            var params = utils.params(ct);

            for (var key in params) {
              this[key] = params[key];
            }

            this.links = {}; // links

            try {
              if (header.link) {
                this.links = utils.parseLinks(header.link);
              }
            } catch (err) {
              // ignore
            }
          };
          /**
           * Set flags such as `.ok` based on `status`.
           *
           * For example a 2xx response will give you a `.ok` of __true__
           * whereas 5xx will be __false__ and `.error` will be __true__. The
           * `.clientError` and `.serverError` are also available to be more
           * specific, and `.statusType` is the class of error ranging from 1..5
           * sometimes useful for mapping respond colors etc.
           *
           * "sugar" properties are also defined for common cases. Currently providing:
           *
           *   - .noContent
           *   - .badRequest
           *   - .unauthorized
           *   - .notAcceptable
           *   - .notFound
           *
           * @param {Number} status
           * @api private
           */

          ResponseBase.prototype._setStatusProperties = function(status) {
            var type = (status / 100) | 0; // status / class

            this.status = this.statusCode = status;
            this.statusType = type; // basics

            this.info = type == 1;
            this.ok = type == 2;
            this.redirect = type == 3;
            this.clientError = type == 4;
            this.serverError = type == 5;
            this.error = type == 4 || type == 5 ? this.toError() : false; // sugar

            this.created = status == 201;
            this.accepted = status == 202;
            this.noContent = status == 204;
            this.badRequest = status == 400;
            this.unauthorized = status == 401;
            this.notAcceptable = status == 406;
            this.forbidden = status == 403;
            this.notFound = status == 404;
            this.unprocessableEntity = status == 422;
          };
        },
        { './utils': 6 }
      ],
      6: [
        function(require, module, exports) {
          'use strict';
          /**
           * Return the mime type for the given `str`.
           *
           * @param {String} str
           * @return {String}
           * @api private
           */

          exports.type = function(str) {
            return str.split(/ *; */).shift();
          };
          /**
           * Return header field parameters.
           *
           * @param {String} str
           * @return {Object}
           * @api private
           */

          exports.params = function(str) {
            return str.split(/ *; */).reduce(function(obj, str) {
              var parts = str.split(/ *= */);
              var key = parts.shift();
              var val = parts.shift();
              if (key && val) obj[key] = val;
              return obj;
            }, {});
          };
          /**
           * Parse Link header fields.
           *
           * @param {String} str
           * @return {Object}
           * @api private
           */

          exports.parseLinks = function(str) {
            return str.split(/ *, */).reduce(function(obj, str) {
              var parts = str.split(/ *; */);
              var url = parts[0].slice(1, -1);
              var rel = parts[1].split(/ *= */)[1].slice(1, -1);
              obj[rel] = url;
              return obj;
            }, {});
          };
          /**
           * Strip content related fields from `header`.
           *
           * @param {Object} header
           * @return {Object} header
           * @api private
           */

          exports.cleanHeader = function(header, changesOrigin) {
            delete header['content-type'];
            delete header['content-length'];
            delete header['transfer-encoding'];
            delete header.host; // secuirty

            if (changesOrigin) {
              delete header.authorization;
              delete header.cookie;
            }

            return header;
          };
        },
        {}
      ],
      7: [
        function(require, module, exports) {
          /**
           * Expose `Emitter`.
           */

          if (typeof module !== 'undefined') {
            module.exports = Emitter;
          }

          /**
           * Initialize a new `Emitter`.
           *
           * @api public
           */

          function Emitter(obj) {
            if (obj) return mixin(obj);
          }

          /**
           * Mixin the emitter properties.
           *
           * @param {Object} obj
           * @return {Object}
           * @api private
           */

          function mixin(obj) {
            for (var key in Emitter.prototype) {
              obj[key] = Emitter.prototype[key];
            }
            return obj;
          }

          /**
           * Listen on the given `event` with `fn`.
           *
           * @param {String} event
           * @param {Function} fn
           * @return {Emitter}
           * @api public
           */

          Emitter.prototype.on = Emitter.prototype.addEventListener = function(
            event,
            fn
          ) {
            this._callbacks = this._callbacks || {};
            (this._callbacks['$' + event] =
              this._callbacks['$' + event] || []).push(fn);
            return this;
          };

          /**
           * Adds an `event` listener that will be invoked a single
           * time then automatically removed.
           *
           * @param {String} event
           * @param {Function} fn
           * @return {Emitter}
           * @api public
           */

          Emitter.prototype.once = function(event, fn) {
            function on() {
              this.off(event, on);
              fn.apply(this, arguments);
            }

            on.fn = fn;
            this.on(event, on);
            return this;
          };

          /**
           * Remove the given callback for `event` or all
           * registered callbacks.
           *
           * @param {String} event
           * @param {Function} fn
           * @return {Emitter}
           * @api public
           */

          Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(
            event,
            fn
          ) {
            this._callbacks = this._callbacks || {};

            // all
            if (0 == arguments.length) {
              this._callbacks = {};
              return this;
            }

            // specific event
            var callbacks = this._callbacks['$' + event];
            if (!callbacks) return this;

            // remove all handlers
            if (1 == arguments.length) {
              delete this._callbacks['$' + event];
              return this;
            }

            // remove specific handler
            var cb;
            for (var i = 0; i < callbacks.length; i++) {
              cb = callbacks[i];
              if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
              }
            }
            return this;
          };

          /**
           * Emit `event` with the given args.
           *
           * @param {String} event
           * @param {Mixed} ...
           * @return {Emitter}
           */

          Emitter.prototype.emit = function(event) {
            this._callbacks = this._callbacks || {};
            var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks['$' + event];

            if (callbacks) {
              callbacks = callbacks.slice(0);
              for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
              }
            }

            return this;
          };

          /**
           * Return array of callbacks for `event`.
           *
           * @param {String} event
           * @return {Array}
           * @api public
           */

          Emitter.prototype.listeners = function(event) {
            this._callbacks = this._callbacks || {};
            return this._callbacks['$' + event] || [];
          };

          /**
           * Check if this emitter has `event` handlers.
           *
           * @param {String} event
           * @return {Boolean}
           * @api public
           */

          Emitter.prototype.hasListeners = function(event) {
            return !!this.listeners(event).length;
          };
        },
        {}
      ]
    },
    {},
    [3]
  )(3);
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYWdlbnQtYmFzZS5qcyIsImxpYi9pcy1vYmplY3QuanMiLCJsaWIvbm9kZS9jbGllbnQuanMiLCJsaWIvcmVxdWVzdC1iYXNlLmpzIiwibGliL3Jlc3BvbnNlLWJhc2UuanMiLCJsaWIvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxTQUFTLGtCQUFULENBQTRCLEdBQTVCLEVBQWlDO0FBQUUsU0FBTyxrQkFBa0IsQ0FBQyxHQUFELENBQWxCLElBQTJCLGdCQUFnQixDQUFDLEdBQUQsQ0FBM0MsSUFBb0Qsa0JBQWtCLEVBQTdFO0FBQWtGOztBQUVySCxTQUFTLGtCQUFULEdBQThCO0FBQUUsUUFBTSxJQUFJLFNBQUosQ0FBYyxpREFBZCxDQUFOO0FBQXlFOztBQUV6RyxTQUFTLGdCQUFULENBQTBCLElBQTFCLEVBQWdDO0FBQUUsTUFBSSxNQUFNLENBQUMsUUFBUCxJQUFtQixNQUFNLENBQUMsSUFBRCxDQUF6QixJQUFtQyxNQUFNLENBQUMsU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixJQUEvQixNQUF5QyxvQkFBaEYsRUFBc0csT0FBTyxLQUFLLENBQUMsSUFBTixDQUFXLElBQVgsQ0FBUDtBQUEwQjs7QUFFbEssU0FBUyxrQkFBVCxDQUE0QixHQUE1QixFQUFpQztBQUFFLE1BQUksS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFkLENBQUosRUFBd0I7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQVIsRUFBVyxJQUFJLEdBQUcsSUFBSSxLQUFKLENBQVUsR0FBRyxDQUFDLE1BQWQsQ0FBdkIsRUFBOEMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUF0RCxFQUE4RCxDQUFDLEVBQS9ELEVBQW1FO0FBQUUsTUFBQSxJQUFJLENBQUMsQ0FBRCxDQUFK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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikgeyBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IH1cblxuZnVuY3Rpb24gQWdlbnQoKSB7XG4gIHRoaXMuX2RlZmF1bHRzID0gW107XG59XG5cblsndXNlJywgJ29uJywgJ29uY2UnLCAnc2V0JywgJ3F1ZXJ5JywgJ3R5cGUnLCAnYWNjZXB0JywgJ2F1dGgnLCAnd2l0aENyZWRlbnRpYWxzJywgJ3NvcnRRdWVyeScsICdyZXRyeScsICdvaycsICdyZWRpcmVjdHMnLCAndGltZW91dCcsICdidWZmZXInLCAnc2VyaWFsaXplJywgJ3BhcnNlJywgJ2NhJywgJ2tleScsICdwZngnLCAnY2VydCddLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gIC8vIERlZmF1bHQgc2V0dGluZyBmb3IgYWxsIHJlcXVlc3RzIGZyb20gdGhpcyBhZ2VudFxuICBBZ2VudC5wcm90b3R5cGVbZm5dID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWZhdWx0cy5wdXNoKHtcbiAgICAgIGZuOiBmbixcbiAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5fc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAocmVxKSB7XG4gIHRoaXMuX2RlZmF1bHRzLmZvckVhY2goZnVuY3Rpb24gKGRlZikge1xuICAgIHJlcVtkZWYuZm5dLmFwcGx5KHJlcSwgX3RvQ29uc3VtYWJsZUFycmF5KGRlZi5hcmdzKSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDsiLCIndXNlIHN0cmljdCc7XG4vKipcclxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgX3R5cGVvZihvYmopID09PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXHJcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxyXG4gKi9cbnZhciByb290O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2Uge1xuICAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKCdVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50Jyk7XG4gIHJvb3QgPSB2b2lkIDA7XG59XG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcblxudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxudmFyIFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UtYmFzZScpO1xuXG52YXIgQWdlbnQgPSByZXF1aXJlKCcuL2FnZW50LWJhc2UnKTtcbi8qKlxyXG4gKiBOb29wLlxyXG4gKi9cblxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxyXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxyXG4gKi9cblxuXG52YXIgcmVxdWVzdCA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAodHlwZW9mIHVybCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9IC8vIHVybCBmaXJzdFxuXG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufTtcblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbi8qKlxyXG4gKiBEZXRlcm1pbmUgWEhSLlxyXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0ICYmICghcm9vdC5sb2NhdGlvbiB8fCByb290LmxvY2F0aW9uLnByb3RvY29sICE9ICdmaWxlOicgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHRocm93IG5ldyBFcnJvcignQnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFInKTtcbn07XG4vKipcclxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuXG52YXIgdHJpbSA9ICcnLnRyaW0gPyBmdW5jdGlvbiAocykge1xuICByZXR1cm4gcy50cmltKCk7XG59IDogZnVuY3Rpb24gKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7XG59O1xuLyoqXHJcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cbi8qKlxyXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cclxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcclxuICogQHBhcmFtIHtNaXhlZH0gdmFsXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAodmFsICE9IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgZm9yICh2YXIgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywgXCJcIi5jb25jYXQoa2V5LCBcIltcIikuY29uY2F0KHN1YmtleSwgXCJdXCIpLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG4vKipcclxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxyXG4gKi9cblxuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcbi8qKlxyXG4gKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhaXI7XG4gIHZhciBwb3M7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuXG4gICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKHBvcyArIDEpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuLyoqXHJcbiAqIEV4cG9zZSBwYXJzZXIuXHJcbiAqL1xuXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcbi8qKlxyXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXHJcbiAqXHJcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xyXG4gKlxyXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAndGV4dC94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgZm9ybTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcbi8qKlxyXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxyXG4gKlxyXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcclxuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xyXG4gKiAgICAgfTtcclxuICpcclxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG59O1xuLyoqXHJcbiAqIERlZmF1bHQgcGFyc2Vycy5cclxuICpcclxuICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcclxuICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xyXG4gKiAgICAgfTtcclxuICpcclxuICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuLyoqXHJcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xyXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIC8vIGNvdWxkIGJlIGVtcHR5IGxpbmUsIGp1c3Qgc2tpcCBpdFxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cbi8qKlxyXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgLy8gc2hvdWxkIG1hdGNoIC9qc29uIG9yICtqc29uXG4gIC8vIGJ1dCBub3QgL2pzb24tc2VxXG4gIHJldHVybiAvW1xcLytdanNvbigkfFteLVxcd10pLy50ZXN0KG1pbWUpO1xufVxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cclxuICpcclxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxyXG4gKiAgLSBwYXJzZSBoZWFkZXJcclxuICpcclxuICogRXhhbXBsZXM6XHJcbiAqXHJcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XHJcbiAqXHJcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XHJcbiAqXHJcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcclxuICpcclxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xyXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcclxuICpcclxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcclxuICpcclxuICogICAgICByZXF1ZXN0XHJcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxyXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXHJcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XHJcbiAqXHJcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxyXG4gKlxyXG4gKiAgICAgIHJlcXVlc3RcclxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXHJcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcclxuICpcclxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XHJcbiAqXHJcbiAqICAgICAgcmVxdWVzdFxyXG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXHJcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XHJcbiAqXHJcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XHJcbiAqXHJcbiAqICAgICAgcmVxdWVzdFxyXG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxKSB7XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjsgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuXG4gIHRoaXMudGV4dCA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpIHx8IHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnID8gdGhpcy54aHIucmVzcG9uc2VUZXh0IDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHZhciBzdGF0dXMgPSB0aGlzLnhoci5zdGF0dXM7IC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcblxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgc3RhdHVzID0gMjA0O1xuICB9XG5cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuXG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpOyAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuXG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmICh0aGlzLnRleHQgPT09IG51bGwgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnID8gdGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKSA6IG51bGw7XG4gIH1cbn1cblxuUmVzcG9uc2VCYXNlKFJlc3BvbnNlLnByb3RvdHlwZSk7XG4vKipcclxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXHJcbiAqXHJcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcclxuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7TWl4ZWR9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLl9wYXJzZUJvZHkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcblxuICBpZiAodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cik7XG4gIH1cblxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cblxuICByZXR1cm4gcGFyc2UgJiYgc3RyICYmIChzdHIubGVuZ3RoIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCkgPyBwYXJzZShzdHIpIDogbnVsbDtcbn07XG4vKipcclxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cclxuICpcclxuICogQHJldHVybiB7RXJyb3J9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcbiAgdmFyIG1zZyA9IFwiY2Fubm90IFwiLmNvbmNhdChtZXRob2QsIFwiIFwiKS5jb25jYXQodXJsLCBcIiAoXCIpLmNvbmNhdCh0aGlzLnN0YXR1cywgXCIpXCIpO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcbiAgcmV0dXJuIGVycjtcbn07XG4vKipcclxuICogRXhwb3NlIGBSZXNwb25zZWAuXHJcbiAqL1xuXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcblxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG5cbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTsgLy8gaXNzdWUgIzY3NTogcmV0dXJuIHRoZSByYXcgcmVzcG9uc2UgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcblxuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJyA/IHNlbGYueGhyLnJlc3BvbnNlVGV4dCA6IHNlbGYueGhyLnJlc3BvbnNlOyAvLyBpc3N1ZSAjODc2OiByZXR1cm4gdGhlIGh0dHAgc3RhdHVzIGNvZGUgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcblxuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuICAgIHZhciBuZXdfZXJyO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChjdXN0b21fZXJyKSB7XG4gICAgICBuZXdfZXJyID0gY3VzdG9tX2VycjsgLy8gb2soKSBjYWxsYmFjayBjYW4gdGhyb3dcbiAgICB9IC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuXG5cbiAgICBpZiAobmV3X2Vycikge1xuICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgIG5ld19lcnIucmVzcG9uc2UgPSByZXM7XG4gICAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuLyoqXHJcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cclxuICovXG5cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG4vKipcclxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxyXG4gKlxyXG4gKiBFeGFtcGxlczpcclxuICpcclxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xyXG4gKlxyXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXHJcbiAqICAgICAgICAudHlwZSgneG1sJylcclxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXHJcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcclxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXHJcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cclxuICpcclxuICogRXhhbXBsZXM6XHJcbiAqXHJcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG4gKlxyXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxyXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXHJcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcclxuICpcclxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcclxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXSBvcHRpb25hbCBpbiBjYXNlIG9mIHVzaW5nICdiZWFyZXInIGFzIHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHBhc3MgPSAnJztcblxuICBpZiAoX3R5cGVvZihwYXNzKSA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkge1xuICAgIC8vIHBhc3MgaXMgb3B0aW9uYWwgYW5kIGNhbiBiZSByZXBsYWNlZCB3aXRoIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgICBwYXNzID0gJyc7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicgPyAnYmFzaWMnIDogJ2F1dG8nXG4gICAgfTtcbiAgfVxuXG4gIHZhciBlbmNvZGVyID0gZnVuY3Rpb24gZW5jb2RlcihzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBidG9hKHN0cmluZyk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGJhc2ljIGF1dGgsIGJ0b2EgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG4vKipcclxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cclxuICpcclxuICogRXhhbXBsZXM6XHJcbiAqXHJcbiAqICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXHJcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxyXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxyXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXHJcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXHJcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXHJcbiAqXHJcbiAqIGBgYCBqc1xyXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxyXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcclxuICogICAuZW5kKGNhbGxiYWNrKTtcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxyXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxyXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIChmaWVsZCwgZmlsZSwgb3B0aW9ucykge1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcbi8qKlxyXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXHJcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gIGlmICh0aGlzLl9zaG91bGRSZXRyeShlcnIsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG4vKipcclxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07IC8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuXG5cblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhID0gUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUud2FybignVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50Jyk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gVGhpcyB0aHJvd3MsIGJlY2F1c2UgaXQgY2FuJ3Qgc2VuZC9yZWNlaXZlIGRhdGEgYXMgZXhwZWN0ZWRcblxuXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQnKTtcbn07XG4vKipcclxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcclxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuUmVxdWVzdC5wcm90b3R5cGUuX2lzSG9zdCA9IGZ1bmN0aW9uIF9pc0hvc3Qob2JqKSB7XG4gIC8vIE5hdGl2ZSBvYmplY3RzIHN0cmluZ2lmeSB0byBbb2JqZWN0IEZpbGVdLCBbb2JqZWN0IEJsb2JdLCBbb2JqZWN0IEZvcm1EYXRhXSwgZXRjLlxuICByZXR1cm4gb2JqICYmIF90eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59O1xuLyoqXHJcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxyXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChmbikge1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiAuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnQnKTtcbiAgfVxuXG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7IC8vIHN0b3JlIGNhbGxiYWNrXG5cbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wOyAvLyBxdWVyeXN0cmluZ1xuXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSByZXR1cm4gdGhpcy5jYWxsYmFjayhuZXcgRXJyb3IoJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGFib3J0ZWQgZXZlbiBiZWZvcmUgLmVuZCgpIHdhcyBjYWxsZWQnKSk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9IHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7IC8vIHN0YXRlIGNoYW5nZVxuXG5cbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVhZHlTdGF0ZSA9IHhoci5yZWFkeVN0YXRlO1xuXG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG5cbiAgICBpZiAocmVhZHlTdGF0ZSAhPSA0KSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG5cblxuICAgIHZhciBzdGF0dXM7XG5cbiAgICB0cnkge1xuICAgICAgc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzdGF0dXMgPSAwO1xuICAgIH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTsgLy8gcHJvZ3Jlc3NcblxuXG4gIHZhciBoYW5kbGVQcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKGRpcmVjdGlvbiwgZSkge1xuICAgIGlmIChlLnRvdGFsID4gMCkge1xuICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgIH1cblxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcblxuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKSk7XG5cbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkgey8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gICAgfVxuICB9IC8vIGluaXRpYXRlIHJlcXVlc3RcblxuXG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH0gLy8gQ09SU1xuXG5cbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7IC8vIGJvZHlcblxuICBpZiAoIXRoaXMuX2Zvcm1EYXRhICYmIHRoaXMubWV0aG9kICE9ICdHRVQnICYmIHRoaXMubWV0aG9kICE9ICdIRUFEJyAmJiB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgICB2YXIgX3NlcmlhbGl6ZSA9IHRoaXMuX3NlcmlhbGl6ZXIgfHwgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuXG4gICAgaWYgKCFfc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIF9zZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cblxuICAgIGlmIChfc2VyaWFsaXplKSBkYXRhID0gX3NlcmlhbGl6ZShkYXRhKTtcbiAgfSAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuXG5cbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJbZmllbGRdID09IG51bGwpIGNvbnRpbnVlO1xuICAgIGlmICh0aGlzLmhlYWRlci5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH0gLy8gc2VuZCBzdHVmZlxuXG5cbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7IC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG5cbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xufTtcblxucmVxdWVzdC5hZ2VudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBBZ2VudCgpO1xufTtcblxuWydHRVQnLCAnUE9TVCcsICdPUFRJT05TJywgJ1BBVENIJywgJ1BVVCcsICdERUxFVEUnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgQWdlbnQucHJvdG90eXBlW21ldGhvZC50b0xvd2VyQ2FzZSgpXSA9IGZ1bmN0aW9uICh1cmwsIGZuKSB7XG4gICAgdmFyIHJlcSA9IG5ldyByZXF1ZXN0LlJlcXVlc3QobWV0aG9kLCB1cmwpO1xuXG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxKTtcblxuICAgIGlmIChmbikge1xuICAgICAgcmVxLmVuZChmbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcTtcbiAgfTtcbn0pO1xuQWdlbnQucHJvdG90eXBlLmRlbCA9IEFnZW50LnByb3RvdHlwZS5kZWxldGU7XG4vKipcclxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuLyoqXHJcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cclxuICogQHJldHVybiB7UmVxdWVzdH1cclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuLyoqXHJcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cclxuICogQHJldHVybiB7UmVxdWVzdH1cclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxucmVxdWVzdC5vcHRpb25zID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG4vKipcclxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cclxuICogQHJldHVybiB7UmVxdWVzdH1cclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufVxuXG5yZXF1ZXN0LmRlbCA9IGRlbDtcbnJlcXVlc3QuZGVsZXRlID0gZGVsO1xuLyoqXHJcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cclxuICogQHJldHVybiB7UmVxdWVzdH1cclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBmbikge1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG4vKipcclxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuLyoqXHJcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cbnJlcXVlc3QucHV0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgZm4pIHtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcclxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxyXG4gKi9cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcbi8qKlxyXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cclxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QmFzZTtcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0QmFzZWAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0QmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG4vKipcclxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG4vKipcclxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cclxuICpcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdXBsb2FkVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIGRlbGV0ZSB0aGlzLl91cGxvYWRUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxyXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGZuKSB7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cclxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXHJcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxyXG4gKlxyXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cclxuICpcclxuICogRXhhbXBsZXM6XHJcbiAqXHJcbiAqICAgICAgcmVxLmdldCgnLycpXHJcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24gKHZhbCkge1xuICB0aGlzLl9yZXNwb25zZVR5cGUgPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxyXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBkYXRhIHNldCB2aWEgLnNlbmQgb3IgLmF0dGFjaCBpbnRvIHBheWxvYWQgdG8gc2VuZFxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKSB7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXHJcbiAqIFNldCB0aW1lb3V0cy5cclxuICpcclxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxyXG4gKiAtIGRlYWRsaW5lIGlzIHRoZSB0aW1lIGZyb20gc3RhcnQgb2YgdGhlIHJlcXVlc3QgdG8gcmVjZWl2aW5nIHJlc3BvbnNlIGJvZHkgaW4gZnVsbC4gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBzaG9ydCBsYXJnZSBmaWxlcyBtYXkgbm90IGxvYWQgYXQgYWxsIG9uIHNsb3cgY29ubmVjdGlvbnMuXHJcbiAqIC0gdXBsb2FkIGlzIHRoZSB0aW1lICBzaW5jZSBsYXN0IGJpdCBvZiBkYXRhIHdhcyBzZW50IG9yIHJlY2VpdmVkLiBUaGlzIHRpbWVvdXQgd29ya3Mgb25seSBpZiBkZWFkbGluZSB0aW1lb3V0IGlzIG9mZlxyXG4gKlxyXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCBfdHlwZW9mKG9wdGlvbnMpICE9PSAnb2JqZWN0Jykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgdGhpcy5fdXBsb2FkVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICBjYXNlICdkZWFkbGluZSc6XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncmVzcG9uc2UnOlxuICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAndXBsb2FkJzpcbiAgICAgICAgdGhpcy5fdXBsb2FkVGltZW91dCA9IG9wdGlvbnMudXBsb2FkO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIHRpbWVvdXQgb3B0aW9uJywgb3B0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cclxuICpcclxuICogRmFpbGVkIHJlcXVlc3RzIHdpbGwgYmUgcmV0cmllZCAnY291bnQnIHRpbWVzIGlmIHRpbWVvdXQgb3IgZXJyLmNvZGUgPj0gNTAwLlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxyXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQsIGZuKSB7XG4gIC8vIERlZmF1bHQgdG8gMSBpZiBubyBjb3VudCBwYXNzZWQgb3IgdHJ1ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBjb3VudCA9PT0gdHJ1ZSkgY291bnQgPSAxO1xuICBpZiAoY291bnQgPD0gMCkgY291bnQgPSAwO1xuICB0aGlzLl9tYXhSZXRyaWVzID0gY291bnQ7XG4gIHRoaXMuX3JldHJpZXMgPSAwO1xuICB0aGlzLl9yZXRyeUNhbGxiYWNrID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIEVSUk9SX0NPREVTID0gWydFQ09OTlJFU0VUJywgJ0VUSU1FRE9VVCcsICdFQUREUklORk8nLCAnRVNPQ0tFVFRJTUVET1VUJ107XG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgcmVxdWVzdCBzaG91bGQgYmUgcmV0cmllZC5cclxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXHJcbiAqXHJcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2hvdWxkUmV0cnkgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgaWYgKCF0aGlzLl9tYXhSZXRyaWVzIHx8IHRoaXMuX3JldHJpZXMrKyA+PSB0aGlzLl9tYXhSZXRyaWVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX3JldHJ5Q2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnIsIHJlcyk7XG5cbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7IC8vIHVuZGVmaW5lZCBmYWxscyBiYWNrIHRvIGRlZmF1bHRzXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cblxuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDAgJiYgcmVzLnN0YXR1cyAhPSA1MDEpIHJldHVybiB0cnVlO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgJiYgfkVSUk9SX0NPREVTLmluZGV4T2YoZXJyLmNvZGUpKSByZXR1cm4gdHJ1ZTsgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG5cbiAgICBpZiAoZXJyLnRpbWVvdXQgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICAgIGlmIChlcnIuY3Jvc3NEb21haW4pIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcbi8qKlxyXG4gKiBSZXRyeSByZXF1ZXN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9yZXRyeSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTsgLy8gbm9kZVxuXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG4vKipcclxuICogUHJvbWlzZSBzdXBwb3J0XHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlamVjdF1cclxuICogQHJldHVybiB7UmVxdWVzdH1cclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiB0aGVuKHJlc29sdmUsIHJlamVjdCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IHN1cGVyYWdlbnQgcmVxdWVzdCB3YXMgc2VudCB0d2ljZSwgYmVjYXVzZSBib3RoIC5lbmQoKSBhbmQgLnRoZW4oKSB3ZXJlIGNhbGxlZC4gTmV2ZXIgY2FsbCAuZW5kKCkgaWYgeW91IHVzZSBwcm9taXNlcycpO1xuICAgIH1cblxuICAgIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3QpIHtcbiAgICAgIHNlbGYub24oJ2Fib3J0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVyci5jb2RlID0gXCJBQk9SVEVEXCI7XG4gICAgICAgIGVyci5zdGF0dXMgPSBfdGhpcy5zdGF0dXM7XG4gICAgICAgIGVyci5tZXRob2QgPSBfdGhpcy5tZXRob2Q7XG4gICAgICAgIGVyci51cmwgPSBfdGhpcy51cmw7XG4gICAgICAgIGlubmVyUmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpO2Vsc2UgaW5uZXJSZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG4vKipcclxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uIChjYikge1xuICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxiYWNrIHJlcXVpcmVkJyk7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG4vKipcclxuICogR2V0IHJlcXVlc3QgaGVhZGVyIGBmaWVsZGAuXHJcbiAqIENhc2UtaW5zZW5zaXRpdmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG4vKipcclxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXHJcbiAqIFRoaXMgaXMgYSBkZXByZWNhdGVkIGludGVybmFsIEFQSS4gVXNlIGAuZ2V0KGZpZWxkKWAgaW5zdGVhZC5cclxuICpcclxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXRIZWFkZXIgPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0O1xuLyoqXHJcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cclxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cclxuICpcclxuICogRXhhbXBsZXM6XHJcbiAqXHJcbiAqICAgICAgcmVxLmdldCgnLycpXHJcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXHJcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxyXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWwpIHtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxyXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxyXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcclxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxyXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxyXG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXHJcbiAqXHJcbiAqIGBgYCBqc1xyXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxyXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXHJcbiAqICAgLmVuZChjYWxsYmFjayk7XHJcbiAqXHJcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXHJcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxyXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXHJcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XG4gIC8vIG5hbWUgc2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBvYmplY3QuXG4gIGlmIChuYW1lID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIi5maWVsZCgpIGNhbid0IGJlIHVzZWQgaWYgLnNlbmQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIGZvciAodmFyIGkgaW4gdmFsKSB7XG4gICAgICB0aGlzLmZpZWxkKG5hbWUsIHZhbFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gdmFsIHNob3VsZCBiZSBkZWZpbmVkIG5vd1xuXG5cbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICB2YWwgPSBTdHJpbmcodmFsKTtcbiAgfVxuXG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXHJcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG5cbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2F1dGggPSBmdW5jdGlvbiAodXNlciwgcGFzcywgb3B0aW9ucywgYmFzZTY0RW5jb2Rlcikge1xuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgXCJCYXNpYyBcIi5jb25jYXQoYmFzZTY0RW5jb2RlcihcIlwiLmNvbmNhdCh1c2VyLCBcIjpcIikuY29uY2F0KHBhc3MpKSkpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6XG4gICAgICAvLyB1c2FnZSB3b3VsZCBiZSAuYXV0aChhY2Nlc3NUb2tlbiwgeyB0eXBlOiAnYmVhcmVyJyB9KVxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIi5jb25jYXQodXNlcikpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcclxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXHJcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxyXG4gKiB0byBcInRydWVcIi5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChvbikge1xuICAvLyBUaGlzIGlzIGJyb3dzZXItb25seSBmdW5jdGlvbmFsaXR5LiBOb2RlIHNpZGUgaXMgbm8tb3AuXG4gIGlmIChvbiA9PSB1bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxyXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGluZyBpbiBicm93c2VyIFhIUiBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG5cclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZWRpcmVjdHMgPSBmdW5jdGlvbiAobikge1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXHJcbiAqIERlZmF1bHQgMjAwTUIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXHJcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUubWF4UmVzcG9uc2VTaXplID0gZnVuY3Rpb24gKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgfVxuXG4gIHRoaXMuX21heFJlc3BvbnNlU2l6ZSA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxyXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXHJcbiAqIE5vdGUgYXMgdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gcmV0dXJuIGEgdXNlZnVsIG5vbi10aGlzIHZhbHVlLFxyXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBkZXNjcmliaW5nIG1ldGhvZCwgdXJsLCBhbmQgZGF0YSBvZiB0aGlzIHJlcXVlc3RcclxuICogQGFwaSBwdWJsaWNcclxuICovXG5cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgIHVybDogdGhpcy51cmwsXG4gICAgZGF0YTogdGhpcy5fZGF0YSxcbiAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJcbiAgfTtcbn07XG4vKipcclxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cclxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxyXG4gKlxyXG4gKiBFeGFtcGxlczpcclxuICpcclxuICogICAgICAgLy8gbWFudWFsIGpzb25cclxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXHJcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxyXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXHJcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcclxuICpcclxuICogICAgICAgLy8gYXV0byBqc29uXHJcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxyXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxyXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXHJcbiAqXHJcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcclxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXHJcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxyXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcclxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxyXG4gKlxyXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxyXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcclxuICogICAgICAgICAudHlwZSgnZm9ybScpXHJcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXHJcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcclxuICpcclxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXHJcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXHJcbiAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcclxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXHJcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIGlzT2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCIuc2VuZCgpIGNhbid0IGJlIHVzZWQgaWYgLmF0dGFjaCgpIG9yIC5maWVsZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmogJiYgIXRoaXMuX2RhdGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRhICYmIHRoaXMuX2RhdGEgJiYgdGhpcy5faXNIb3N0KHRoaXMuX2RhdGEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfSAvLyBtZXJnZVxuXG5cbiAgaWYgKGlzT2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuXG4gICAgaWYgKHR5cGUgPT0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhID8gXCJcIi5jb25jYXQodGhpcy5fZGF0YSwgXCImXCIpLmNvbmNhdChkYXRhKSA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gZGVmYXVsdCB0byBqc29uXG5cblxuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcclxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXHJcbiAqXHJcbiAqXHJcbiAqIEV4YW1wbGVzOlxyXG4gKlxyXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXHJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXHJcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxyXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcclxuICogICAgICAgICAuc29ydFF1ZXJ5KClcclxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxyXG4gKlxyXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcclxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXHJcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxyXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XHJcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcclxuICogICAgICAgICB9KVxyXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcclxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbiAoc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXHJcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fZmluYWxpemVRdWVyeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuXG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuXG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3NvcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zdWJzdHJpbmcoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTsgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUudHJhY2UoJ1Vuc3VwcG9ydGVkJyk7XG59O1xuLyoqXHJcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cblxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uIChyZWFzb24sIHRpbWVvdXQsIGVycm5vKSB7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGVyciA9IG5ldyBFcnJvcihcIlwiLmNvbmNhdChyZWFzb24gKyB0aW1lb3V0LCBcIm1zIGV4Y2VlZGVkXCIpKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICBlcnIuY29kZSA9ICdFQ09OTkFCT1JURUQnO1xuICBlcnIuZXJybm8gPSBlcnJubztcbiAgdGhpcy50aW1lZG91dCA9IHRydWU7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzOyAvLyBkZWFkbGluZVxuXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH0gLy8gcmVzcG9uc2UgdGltZW91dFxuXG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdSZXNwb25zZSB0aW1lb3V0IG9mICcsIHNlbGYuX3Jlc3BvbnNlVGltZW91dCwgJ0VUSU1FRE9VVCcpO1xuICAgIH0sIHRoaXMuX3Jlc3BvbnNlVGltZW91dCk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4vKipcclxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxyXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cbi8qKlxyXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuLyoqXHJcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xuXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG4vKipcclxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcclxuICpcclxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXHJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gIC8vIFRPRE86IG1vYXIhXG4gIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcbiAgLy8gY29udGVudC10eXBlXG4gIHZhciBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpOyAvLyBwYXJhbXNcblxuICB2YXIgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG4gIH1cblxuICB0aGlzLmxpbmtzID0ge307IC8vIGxpbmtzXG5cbiAgdHJ5IHtcbiAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikgey8vIGlnbm9yZVxuICB9XG59O1xuLyoqXHJcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cclxuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxyXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcclxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxyXG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cclxuICpcclxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxyXG4gKlxyXG4gKiAgIC0gLm5vQ29udGVudFxyXG4gKiAgIC0gLmJhZFJlcXVlc3RcclxuICogICAtIC51bmF1dGhvcml6ZWRcclxuICogICAtIC5ub3RBY2NlcHRhYmxlXHJcbiAqICAgLSAubm90Rm91bmRcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwOyAvLyBzdGF0dXMgLyBjbGFzc1xuXG4gIHRoaXMuc3RhdHVzID0gdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlOyAvLyBiYXNpY3NcblxuICB0aGlzLmluZm8gPSB0eXBlID09IDE7XG4gIHRoaXMub2sgPSB0eXBlID09IDI7XG4gIHRoaXMucmVkaXJlY3QgPSB0eXBlID09IDM7XG4gIHRoaXMuY2xpZW50RXJyb3IgPSB0eXBlID09IDQ7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSB0eXBlID09IDU7XG4gIHRoaXMuZXJyb3IgPSB0eXBlID09IDQgfHwgdHlwZSA9PSA1ID8gdGhpcy50b0Vycm9yKCkgOiBmYWxzZTsgLy8gc3VnYXJcblxuICB0aGlzLmNyZWF0ZWQgPSBzdGF0dXMgPT0gMjAxO1xuICB0aGlzLmFjY2VwdGVkID0gc3RhdHVzID09IDIwMjtcbiAgdGhpcy5ub0NvbnRlbnQgPSBzdGF0dXMgPT0gMjA0O1xuICB0aGlzLmJhZFJlcXVlc3QgPSBzdGF0dXMgPT0gNDAwO1xuICB0aGlzLnVuYXV0aG9yaXplZCA9IHN0YXR1cyA9PSA0MDE7XG4gIHRoaXMubm90QWNjZXB0YWJsZSA9IHN0YXR1cyA9PSA0MDY7XG4gIHRoaXMuZm9yYmlkZGVuID0gc3RhdHVzID09IDQwMztcbiAgdGhpcy5ub3RGb3VuZCA9IHN0YXR1cyA9PSA0MDQ7XG4gIHRoaXMudW5wcm9jZXNzYWJsZUVudGl0eSA9IHN0YXR1cyA9PSA0MjI7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG4vKipcclxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cbmV4cG9ydHMucGFyYW1zID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnJlZHVjZShmdW5jdGlvbiAob2JqLCBzdHIpIHtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG4vKipcclxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xuXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgc3RyKSB7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKjsgKi8pO1xuICAgIHZhciB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gICAgdmFyIHJlbCA9IHBhcnRzWzFdLnNwbGl0KC8gKj0gKi8pWzFdLnNsaWNlKDEsIC0xKTtcbiAgICBvYmpbcmVsXSA9IHVybDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuLyoqXHJcbiAqIFN0cmlwIGNvbnRlbnQgcmVsYXRlZCBmaWVsZHMgZnJvbSBgaGVhZGVyYC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGhlYWRlclxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXG5cblxuZXhwb3J0cy5jbGVhbkhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIsIGNoYW5nZXNPcmlnaW4pIHtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXIuaG9zdDsgLy8gc2VjdWlydHlcblxuICBpZiAoY2hhbmdlc09yaWdpbikge1xuICAgIGRlbGV0ZSBoZWFkZXIuYXV0aG9yaXphdGlvbjtcbiAgICBkZWxldGUgaGVhZGVyLmNvb2tpZTtcbiAgfVxuXG4gIHJldHVybiBoZWFkZXI7XG59OyIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcbiJdfQ==
