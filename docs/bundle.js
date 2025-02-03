/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./js/translationService.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// translationService.js
var TranslationService = /*#__PURE__*/function () {
  function TranslationService() {
    _classCallCheck(this, TranslationService);
    // Get API key from webpack-injected environment variable
    this.apiKey = "";
    if (!this.apiKey) {
      console.error('API key not found. Some features may be limited.');
      // Don't throw error, set a flag instead
      this.isConfigured = false;
    } else {
      this.isConfigured = true;
    }
    this.translations = [];
  }
  return _createClass(TranslationService, [{
    key: "translateText",
    value: function () {
      var _translateText = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(text, sourceLang, targetLang) {
        var sourceCode, targetCode, response, data, translation;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (this.isConfigured) {
                _context.next = 2;
                break;
              }
              throw new Error('Translation service is not properly configured');
            case 2:
              sourceCode = sourceLang.split('-')[0];
              targetCode = targetLang.split('-')[0];
              _context.prev = 4;
              _context.next = 7;
              return fetch("https://translation.googleapis.com/language/translate/v2?key=".concat(this.apiKey), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  q: text,
                  source: sourceLang,
                  target: targetLang,
                  format: 'text'
                })
              });
            case 7:
              response = _context.sent;
              if (response.ok) {
                _context.next = 10;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 10:
              _context.next = 12;
              return response.json();
            case 12:
              data = _context.sent;
              if (!data.error) {
                _context.next = 15;
                break;
              }
              throw new Error(data.error.message);
            case 15:
              translation = data.data.translations[0].translatedText; // Add to translations history
              /*this.translations.push({
                  original: text,
                  translated: translation,
                  timestamp: new Date()
              });*/
              this.translations.push({
                original: text,
                translated: translation,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
              });
              return _context.abrupt("return", translation);
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](4);
              console.error('Translation error:', _context.t0);
              throw _context.t0;
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[4, 20]]);
      }));
      function translateText(_x, _x2, _x3) {
        return _translateText.apply(this, arguments);
      }
      return translateText;
    }()
  }, {
    key: "clearTranslations",
    value: function clearTranslations() {
      this.translations = [];
    }
  }, {
    key: "exportTranslations",
    value: function exportTranslations() {
      var csv = [['Timestamp', 'Original', 'Translation']].concat(_toConsumableArray(this.translations.map(function (t) {
        return [t.timestamp.toISOString(), t.original, t.translated];
      }))).map(function (row) {
        return row.join(',');
      }).join('\n');
      var blob = new Blob([csv], {
        type: 'text/csv'
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = "translations_".concat(new Date().toISOString(), ".csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }]);
}();

;// ./js/audioHandler.js
function audioHandler_typeof(o) { "@babel/helpers - typeof"; return audioHandler_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, audioHandler_typeof(o); }
function audioHandler_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ audioHandler_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == audioHandler_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(audioHandler_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function audioHandler_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function audioHandler_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { audioHandler_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { audioHandler_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function audioHandler_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function audioHandler_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, audioHandler_toPropertyKey(o.key), o); } }
function audioHandler_createClass(e, r, t) { return r && audioHandler_defineProperties(e.prototype, r), t && audioHandler_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function audioHandler_toPropertyKey(t) { var i = audioHandler_toPrimitive(t, "string"); return "symbol" == audioHandler_typeof(i) ? i : i + ""; }
function audioHandler_toPrimitive(t, r) { if ("object" != audioHandler_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != audioHandler_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// audioHandler.js
var AudioHandler = /*#__PURE__*/function () {
  function AudioHandler() {
    audioHandler_classCallCheck(this, AudioHandler);
    this.recognition = null;
    this.isRecording = false;
    this.currentText = "";
    //this.wordCount = 0;
    //this.MAX_WORDS = 12;
    this.buffer = "";
    this.lastProcessedTimestamp = Date.now();
    this.CHUNK_INTERVAL = 5000; // Process every 5 seconds
    this.processingTimeout = null;
    this.sourceLang = "en-US";
    this.targetLang = "hi-IN";
  }
  return audioHandler_createClass(AudioHandler, [{
    key: "setLanguages",
    value: function setLanguages(sourceLang, targetLang) {
      this.sourceLang = sourceLang;
      this.targetLang = targetLang;
      if (this.recognition) {
        this.recognition.lang = this.sourceLang;
      }
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = audioHandler_asyncToGenerator(/*#__PURE__*/audioHandler_regeneratorRuntime().mark(function _callee() {
        return audioHandler_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if ("webkitSpeechRecognition" in window) {
                _context.next = 3;
                break;
              }
              throw new Error("Speech recognition not supported");
            case 3:
              this.recognition = new webkitSpeechRecognition();
              this.setupContinuousRecognition();
              return _context.abrupt("return", true);
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error("Audio initialization error:", _context.t0);
              return _context.abrupt("return", false);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 8]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "setTranscriptionMode",
    value: function setTranscriptionMode(mode, selectedLanguage) {
      this.transcriptionMode = mode;
      this.selectedLanguage = selectedLanguage;
      if (this.recognition) {
        this.recognition.lang = this.transcriptionMode === "local" ? this.selectedLanguage : "en-US";
      }
    }
  }, {
    key: "setupContinuousRecognition",
    value: function setupContinuousRecognition() {
      var _this = this;
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.sourceLang;
      //this.recognition.lang = this.transcriptionMode === 'local' ? this.selectedLanguage : 'en-US';

      // Collect all results
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update buffer with final transcripts
      if (finalTranscript) {
        this.buffer += " " + finalTranscript;
        this.checkAndProcessBuffer();
      }
      this.recognition.onresult = function (event) {
        var interimTranscript = "";
        var finalTranscript = "";
        var result = event.results[event.results.length - 1];
        var transcript = result[0].transcript;
        var words = transcript.trim().split(/\s+/);
        _this.wordCount = words.length;
        if (_this.wordCount >= _this.MAX_WORDS || result.isFinal) {
          _this.processChunk(transcript, result.isFinal);
          _this.currentText = "";
          _this.wordCount = 0;
        } else {
          _this.currentText = transcript;
          window.dispatchEvent(new CustomEvent("interimResult", {
            detail: {
              text: transcript
            }
          }));
        }
      };
      this.recognition.onerror = function (event) {
        console.error("Recognition error:", event.error);
        _this.stopRecording();
      };
      this.recognition.onend = function () {
        if (_this.isRecording) {
          _this.recognition.start();
        }
      };
    }
  }, {
    key: "checkAndProcessBuffer",
    value: function checkAndProcessBuffer() {
      var _this2 = this;
      var now = Date.now();

      // Process buffer if enough time has passed or buffer is getting large
      if (now - this.lastProcessedTimestamp >= this.CHUNK_INTERVAL || this.buffer.length > 1000) {
        clearTimeout(this.processingTimeout);
        this.processChunk(this.buffer.trim(), false);
        this.buffer = "";
        this.lastProcessedTimestamp = now;
      } else {
        // Set a timeout to process the buffer if no new content arrives
        clearTimeout(this.processingTimeout);
        this.processingTimeout = setTimeout(function () {
          if (_this2.buffer.trim()) {
            _this2.processChunk(_this2.buffer.trim(), false);
            _this2.buffer = "";
          }
        }, this.CHUNK_INTERVAL);
      }
    }
  }, {
    key: "processChunk",
    value: function processChunk(text, isFinal) {
      window.dispatchEvent(new CustomEvent("speechResult", {
        detail: {
          transcript: text,
          isFinal: isFinal
        }
      }));
    }
  }, {
    key: "restartRecognition",
    value: function restartRecognition() {
      var _this3 = this;
      try {
        this.recognition.start();
      } catch (error) {
        console.error("Error restarting recognition:", error);

        // Wait a bit and try again
        setTimeout(function () {
          if (_this3.isRecording) {
            _this3.recognition.start();
          }
        }, 1000);
      }
    }
  }, {
    key: "startRecording",
    value: function () {
      var _startRecording = audioHandler_asyncToGenerator(/*#__PURE__*/audioHandler_regeneratorRuntime().mark(function _callee2(languageCode) {
        return audioHandler_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              if (!this.isRecording) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              this.selectedLanguage = languageCode;
              this.recognition.lang = languageCode;

              // Clear any existing state
              this.buffer = "";
              this.lastProcessedTimestamp = Date.now();
              clearTimeout(this.processingTimeout);
              _context2.next = 10;
              return this.recognition.start();
            case 10:
              this.isRecording = true;
              window.dispatchEvent(new CustomEvent("recordingStateChange", {
                detail: {
                  isRecording: true
                }
              }));
              _context2.next = 18;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              console.error("Start recording error:", _context2.t0);
              this.stopRecording();
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 14]]);
      }));
      function startRecording(_x) {
        return _startRecording.apply(this, arguments);
      }
      return startRecording;
    }()
  }, {
    key: "stopRecording",
    value: function () {
      var _stopRecording = audioHandler_asyncToGenerator(/*#__PURE__*/audioHandler_regeneratorRuntime().mark(function _callee3() {
        return audioHandler_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              if (this.isRecording) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return");
            case 3:
              clearTimeout(this.processingTimeout);

              // Process any remaining buffer
              if (this.buffer.trim()) {
                this.processChunk(this.buffer.trim(), true);
                this.buffer = "";
              }
              _context3.next = 7;
              return this.recognition.stop();
            case 7:
              this.isRecording = false;
              window.dispatchEvent(new CustomEvent("recordingStateChange", {
                detail: {
                  isRecording: false
                }
              }));
              _context3.next = 14;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.error("Stop recording error:", _context3.t0);
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 11]]);
      }));
      function stopRecording() {
        return _stopRecording.apply(this, arguments);
      }
      return stopRecording;
    }()
  }]);
}();

;// ./js/uiController.js
function uiController_typeof(o) { "@babel/helpers - typeof"; return uiController_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, uiController_typeof(o); }
function uiController_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function uiController_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, uiController_toPropertyKey(o.key), o); } }
function uiController_createClass(e, r, t) { return r && uiController_defineProperties(e.prototype, r), t && uiController_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function uiController_toPropertyKey(t) { var i = uiController_toPrimitive(t, "string"); return "symbol" == uiController_typeof(i) ? i : i + ""; }
function uiController_toPrimitive(t, r) { if ("object" != uiController_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != uiController_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// uiController.js
var UIController = /*#__PURE__*/function () {
  function UIController() {
    var _this = this;
    uiController_classCallCheck(this, UIController);
    this.micButton = document.getElementById('micButton');
    this.clearButton = document.getElementById('clearButton');
    this.exportButton = document.getElementById('exportButton');
    this.sourceLanguageSelect = document.getElementById('sourceLanguageSelect');
    this.targetLanguageSelect = document.getElementById('targetLanguageSelect');
    this.currentText = document.getElementById('currentText');
    this.translationHistory = document.getElementById('translationHistory');

    // Add event listeners for language switches
    this.sourceLanguageSelect.addEventListener('change', function () {
      var sourceLang = _this.sourceLanguageSelect.value;
      var targetLang = _this.targetLanguageSelect.value;
      _this.onLanguageChange(sourceLang, targetLang);
    });
    this.targetLanguageSelect.addEventListener('change', function () {
      var sourceLang = _this.sourceLanguageSelect.value;
      var targetLang = _this.targetLanguageSelect.value;
      _this.onLanguageChange(sourceLang, targetLang);
    });
    onLanguageChange(sourceLang, targetLang);
    window.dispatchEvent(new CustomEvent('languageChange', {
      detail: {
        sourceLang: sourceLang,
        targetLang: targetLang
      }
    }));
    var radioButtons = document.querySelectorAll('input[name="transcriptionMode"]');
    radioButtons.forEach(function (radio) {
      radio.addEventListener('change', function (e) {
        var mode = e.target.value;
        var selectedLanguage = _this.languageSelect.value;
        _this.onTranscriptionModeChange(mode, selectedLanguage);
      });
    });
  }
  return uiController_createClass(UIController, [{
    key: "updateRecordingState",
    value: function updateRecordingState(isRecording) {
      this.micButton.classList.toggle('recording', isRecording);
      this.micButton.querySelector('.mic-icon').textContent = isRecording ? '⏹' : '🎤';
    }
  }, {
    key: "updateCurrentText",
    value: function updateCurrentText(text) {
      this.currentText.innerHTML = "<p>".concat(text, "</p>");
    }
  }, {
    key: "addTranslation",
    value: function addTranslation(translation) {
      var element = document.createElement('div');
      element.className = 'translation-item';
      element.innerHTML = "\n            <div class=\"timestamp\">".concat(new Date().toLocaleTimeString(), "</div>\n            <p><strong>Original:</strong> ").concat(translation.original, "</p>\n            <p><strong>Translation:</strong> ").concat(translation.translated, "</p>\n        ");
      this.translationHistory.insertBefore(element, this.translationHistory.firstChild);
    }
  }, {
    key: "clearTranslations",
    value: function clearTranslations() {
      this.translationHistory.innerHTML = '';
      this.currentText.innerHTML = '<p class="placeholder">Press the microphone to start...</p>';
    }
  }, {
    key: "onTranscriptionModeChange",
    value: function onTranscriptionModeChange(mode, selectedLanguage) {
      window.dispatchEvent(new CustomEvent('transcriptionModeChange', {
        detail: {
          mode: mode,
          selectedLanguage: selectedLanguage
        }
      }));
    }
  }]);
}();

;// ./js/app.js
function app_typeof(o) { "@babel/helpers - typeof"; return app_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, app_typeof(o); }
function app_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ app_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == app_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(app_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function app_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function app_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { app_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { app_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function app_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function app_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, app_toPropertyKey(o.key), o); } }
function app_createClass(e, r, t) { return r && app_defineProperties(e.prototype, r), t && app_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function app_toPropertyKey(t) { var i = app_toPrimitive(t, "string"); return "symbol" == app_typeof(i) ? i : i + ""; }
function app_toPrimitive(t, r) { if ("object" != app_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != app_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// app.js



var App = /*#__PURE__*/function () {
  function App() {
    app_classCallCheck(this, App);
    this.audioHandler = new AudioHandler();
    this.translationService = new TranslationService();
    this.uiController = new UIController();
    this.initialize();
    this.setupEventListeners();
  }
  return app_createClass(App, [{
    key: "initialize",
    value: function () {
      var _initialize = app_asyncToGenerator(/*#__PURE__*/app_regeneratorRuntime().mark(function _callee() {
        var isAudioInitialized;
        return app_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.audioHandler.initialize();
            case 3:
              isAudioInitialized = _context.sent;
              if (isAudioInitialized) {
                _context.next = 6;
                break;
              }
              throw new Error('Failed to initialize audio');
            case 6:
              if (!('serviceWorker' in navigator)) {
                _context.next = 16;
                break;
              }
              _context.prev = 7;
              _context.next = 10;
              return navigator.serviceWorker.register('./sw.js');
            case 10:
              console.log('Service Worker registered');
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](7);
              console.error('Service Worker registration failed:', _context.t0);
            case 16:
              _context.next = 22;
              break;
            case 18:
              _context.prev = 18;
              _context.t1 = _context["catch"](0);
              console.error('Initialization error:', _context.t1);
              alert('Error initializing app. Please check console for details.');
            case 22:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 18], [7, 13]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;
      this.uiController.micButton.addEventListener('click', function () {
        if (_this.audioHandler.isRecording) {
          _this.audioHandler.stopRecording();
        } else {
          var selectedLanguage = _this.uiController.languageSelect.value;
          _this.audioHandler.startRecording(selectedLanguage);
        }
      });
      this.uiController.clearButton.addEventListener('click', function () {
        _this.translationService.clearTranslations();
        _this.uiController.clearTranslations();
      });
      this.uiController.exportButton.addEventListener('click', function () {
        _this.translationService.exportTranslations();
      });
      window.addEventListener('languageChange', function (event) {
        var _event$detail = event.detail,
          sourceLang = _event$detail.sourceLang,
          targetLang = _event$detail.targetLang;
        _this.audioHandler.setLanguages(sourceLang, targetLang);
      });
      window.addEventListener('speechResult', /*#__PURE__*/function () {
        var _ref = app_asyncToGenerator(/*#__PURE__*/app_regeneratorRuntime().mark(function _callee2(event) {
          var _event$detail2, transcript, isFinal, sourceLang, targetLang, translation;
          return app_regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _event$detail2 = event.detail, transcript = _event$detail2.transcript, isFinal = _event$detail2.isFinal;
                _this.uiController.updateCurrentText(transcript);
                if (!isFinal) {
                  _context2.next = 16;
                  break;
                }
                _context2.prev = 3;
                sourceLang = _this.uiController.sourceLanguageSelect.value;
                targetLang = _this.uiController.targetLanguageSelect.value;
                _context2.next = 8;
                return _this.translationService.translateText(transcript, sourceLang, targetLang);
              case 8:
                translation = _context2.sent;
                _this.uiController.addTranslation({
                  original: transcript,
                  translated: translation,
                  timestamp: new Date()
                });
                _context2.next = 16;
                break;
              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](3);
                console.error('Translation error:', _context2.t0);
                alert('Error during translation. Please try again.');
              case 16:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[3, 12]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      window.addEventListener('recordingStateChange', function (event) {
        var isRecording = event.detail.isRecording;
        _this.uiController.updateRecordingState(isRecording);
      });
      window.addEventListener('transcriptionModeChange', function (event) {
        var _event$detail3 = event.detail,
          mode = _event$detail3.mode,
          selectedLanguage = _event$detail3.selectedLanguage;
        _this.audioHandler.setTranscriptionMode(mode, selectedLanguage);
      });
    }
  }]);
}();
document.addEventListener('DOMContentLoaded', function () {
  new App();
});
/******/ })()
;