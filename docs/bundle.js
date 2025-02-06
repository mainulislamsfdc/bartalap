/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function r(){r=function(){return n};var e,n={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),c=new I(n||[]);return a(i,"_invoke",{value:P(t,r,c)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var g="suspendedStart",v="suspendedYield",d="executing",y="completed",m={};function w(){}function b(){}function L(){}var E={};f(E,u,(function(){return this}));var x=Object.getPrototypeOf,S=x&&x(x(N([])));S&&S!==o&&i.call(S,u)&&(E=S);var k=L.prototype=w.prototype=Object.create(E);function T(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(e,r){function n(o,a,c,u){var s=p(e[o],e,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&i.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var o;a(this,"_invoke",{value:function(t,e){function i(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(i,i):i()}})}function P(t,r,n){var o=g;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=O(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===g)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var s=p(t,r,n);if("normal"===s.type){if(o=n.done?y:v,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=y,n.method="throw",n.arg=s.arg)}}}function O(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function N(r){if(r||""===r){var n=r[u];if(n)return n.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,a=function t(){for(;++o<r.length;)if(i.call(r,o))return t.value=r[o],t.done=!1,t;return t.value=e,t.done=!0,t};return a.next=a}}throw new TypeError(t(r)+" is not iterable")}return b.prototype=L,a(k,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:b,configurable:!0}),b.displayName=f(L,l,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,f(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},n.awrap=function(t){return{__await:t}},T(j.prototype),f(j.prototype,s,(function(){return this})),n.AsyncIterator=j,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new j(h(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},T(k),f(k,l,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=N,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),s=i.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},n}function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,i(n.key),n)}}function i(e){var r=function(e){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(r)?r:r+""}var a=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.apiKey="",this.apiKey?(console.log("DEBUG: Translation service configured with API key"),this.isConfigured=!0):(console.warn("DEBUG: API key not found in process.env.API_KEY"),this.isConfigured=!1),this.translations=[]},i=[{key:"translateText",value:(a=r().mark((function t(e,n,o){var i,a,c,u,s;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("DEBUG: Translation requested",{text:e,sourceLang:n,targetLang:o,isConfigured:this.isConfigured}),this.isConfigured){t.next=4;break}throw console.error("DEBUG: Translation service is not configured (missing API key)"),new Error("Translation service is not properly configured");case 4:return i=n.split("-")[0],a=o.split("-")[0],t.prev=6,console.log("DEBUG: Sending translation request to API"),t.next=10,fetch("https://translation.googleapis.com/language/translate/v2?key=".concat(this.apiKey),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:e,source:i,target:a,format:"text"})});case 10:if(c=t.sent,console.log("DEBUG: Received API response",{status:c.status,ok:c.ok}),c.ok){t.next=14;break}throw new Error("HTTP error! status: ".concat(c.status));case 14:return t.next=16,c.json();case 16:if(!(u=t.sent).error){t.next=20;break}throw console.error("DEBUG: API returned error",u.error),new Error(u.error.message);case 20:return s=u.data.translations[0].translatedText,this.translations.push({original:e,translated:s,sourceLang:i,targetLang:a,timestamp:new Date}),console.log("DEBUG: Translation successful",{original:e,translated:s}),t.abrupt("return",s);case 26:throw t.prev=26,t.t0=t.catch(6),console.error("DEBUG: Translation error:",t.t0),t.t0;case 30:case"end":return t.stop()}}),t,this,[[6,26]])})),c=function(){var t=this,e=arguments;return new Promise((function(r,o){var i=a.apply(t,e);function c(t){n(i,r,o,c,u,"next",t)}function u(t){n(i,r,o,c,u,"throw",t)}c(void 0)}))},function(t,e,r){return c.apply(this,arguments)})},{key:"clearTranslations",value:function(){console.log("DEBUG: Clearing translations history"),this.translations=[]}},{key:"exportTranslations",value:function(){console.log("DEBUG: Exporting translations to CSV");var t=[["Timestamp","Original","Translation","Source Language","Target Language"]].concat(function(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(this.translations.map((function(t){return[t.timestamp.toISOString(),t.original,t.translated,t.sourceLang,t.targetLang]})))).map((function(t){return t.join(",")})).join("\n"),r=new Blob([t],{type:"text/csv"}),n=window.URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download="translations_".concat((new Date).toISOString(),".csv"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(n)}}],i&&o(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,i,a,c}();function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(){u=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var i=e&&e.prototype instanceof w?e:w,a=Object.create(i.prototype),c=new I(n||[]);return o(a,"_invoke",{value:P(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var g="suspendedStart",v="suspendedYield",d="executing",y="completed",m={};function w(){}function b(){}function L(){}var E={};f(E,a,(function(){return this}));var x=Object.getPrototypeOf,S=x&&x(x(N([])));S&&S!==r&&n.call(S,a)&&(E=S);var k=L.prototype=w.prototype=Object.create(E);function T(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(o,i,a,u){var s=p(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==c(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(s.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function P(e,r,n){var o=g;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=O(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===g)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var s=p(e,r,n);if("normal"===s.type){if(o=n.done?y:v,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=y,n.method="throw",n.arg=s.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function N(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(c(e)+" is not iterable")}return b.prototype=L,o(k,"constructor",{value:L,configurable:!0}),o(L,"constructor",{value:b,configurable:!0}),b.displayName=f(L,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,f(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},T(j.prototype),f(j.prototype,s,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(h(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},T(k),f(k,l,"Generator"),f(k,a,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=N,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:N(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}function s(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function l(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){s(i,n,o,a,c,"next",t)}function c(t){s(i,n,o,a,c,"throw",t)}a(void 0)}))}}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,h(n.key),n)}}function h(t){var e=function(t){if("object"!=c(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==c(e)?e:e+""}var p=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.recognition=null,this.isRecording=!1,this.currentText="",this.buffer="",this.lastProcessedTimestamp=Date.now(),this.CHUNK_INTERVAL=5e3,this.processingTimeout=null,this.sourceLang="en-US",this.targetLang="hi-IN"},e=[{key:"setLanguages",value:function(t,e){this.sourceLang=t,this.targetLang=e,this.recognition&&(this.recognition.lang=this.sourceLang)}},{key:"initialize",value:(o=l(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"webkitSpeechRecognition"in window){t.next=3;break}throw new Error("Speech recognition not supported");case 3:return this.recognition=new webkitSpeechRecognition,this.setupContinuousRecognition(),t.abrupt("return",!0);case 8:return t.prev=8,t.t0=t.catch(0),console.error("Audio initialization error:",t.t0),t.abrupt("return",!1);case 12:case"end":return t.stop()}}),t,this,[[0,8]])}))),function(){return o.apply(this,arguments)})},{key:"setupContinuousRecognition",value:function(){var t=this;this.recognition.continuous=!0,this.recognition.interimResults=!1,this.recognition.maxAlternatives=1,this.recognition.lang=this.sourceLang,this.recognition.onresult=function(e){for(var r="",n="",o=0;o<e.results.length;o++){var i=e.results[o][0].transcript;e.results[o].isFinal?n+=i:r+=i}n&&(t.buffer+=" "+n,t.checkAndProcessBuffer()),r&&window.dispatchEvent(new CustomEvent("interimResult",{detail:{text:r}}))},this.recognition.onerror=function(e){console.error("Recognition error:",e.error),"no-speech"===e.error||"audio-capture"===e.error?t.restartRecognition():t.stopRecording()},this.recognition.onend=function(){t.buffer.trim()&&(t.processChunk(t.buffer.trim(),!0),t.buffer=""),t.isRecording&&t.restartRecognition()}}},{key:"checkAndProcessBuffer",value:function(){var t=this,e=Date.now();e-this.lastProcessedTimestamp>=this.CHUNK_INTERVAL||this.buffer.length>1e3?(clearTimeout(this.processingTimeout),this.processChunk(this.buffer.trim(),!1),this.buffer="",this.lastProcessedTimestamp=e):(clearTimeout(this.processingTimeout),this.processingTimeout=setTimeout((function(){t.buffer.trim()&&(t.processChunk(t.buffer.trim(),!1),t.buffer="")}),this.CHUNK_INTERVAL))}},{key:"processChunk",value:function(t,e){t&&window.dispatchEvent(new CustomEvent("speechResult",{detail:{transcript:t,isFinal:e}}))}},{key:"restartRecognition",value:function(){var t=this;try{this.recognition.start()}catch(e){console.error("Error restarting recognition:",e),setTimeout((function(){t.isRecording&&t.recognition.start()}),1e3)}}},{key:"startRecording",value:(n=l(u().mark((function t(e){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!this.isRecording){t.next=3;break}return t.abrupt("return");case 3:return this.recognition.lang=e,this.buffer="",this.lastProcessedTimestamp=Date.now(),clearTimeout(this.processingTimeout),t.next=9,this.recognition.start();case 9:this.isRecording=!0,window.dispatchEvent(new CustomEvent("recordingStateChange",{detail:{isRecording:!0}})),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),console.error("Start recording error:",t.t0),this.stopRecording();case 17:case"end":return t.stop()}}),t,this,[[0,13]])}))),function(t){return n.apply(this,arguments)})},{key:"stopRecording",value:(r=l(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,this.isRecording){t.next=3;break}return t.abrupt("return");case 3:return clearTimeout(this.processingTimeout),this.buffer.trim()&&(this.processChunk(this.buffer.trim(),!0),this.buffer=""),t.next=7,this.recognition.stop();case 7:this.isRecording=!1,window.dispatchEvent(new CustomEvent("recordingStateChange",{detail:{isRecording:!1}})),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error("Stop recording error:",t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])}))),function(){return r.apply(this,arguments)})}],e&&f(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,r,n,o}();function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,d(n.key),n)}}function d(t){var e=function(t){if("object"!=g(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=g(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==g(e)?e:e+""}var y=function(){return t=function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.micButton=document.getElementById("micButton"),this.clearButton=document.getElementById("clearButton"),this.exportButton=document.getElementById("exportButton"),this.sourceLanguageSelect=document.getElementById("sourceLanguageSelect"),this.targetLanguageSelect=document.getElementById("targetLanguageSelect"),this.currentText=document.getElementById("currentText"),this.translationHistory=document.getElementById("translationHistory"),this.recordingStatus=document.getElementById("recordingStatus"),this.loadingIndicator=document.getElementById("loadingIndicator"),this.errorMessage=document.getElementById("errorMessage"),this.sourceLanguageSelect.addEventListener("change",(function(){var t=e.sourceLanguageSelect.value,r=e.targetLanguageSelect.value;e.onLanguageChange(t,r)})),this.targetLanguageSelect.addEventListener("change",(function(){var t=e.sourceLanguageSelect.value,r=e.targetLanguageSelect.value;e.onLanguageChange(t,r)}));var r=document.getElementById("switchLanguages");r&&r.addEventListener("click",(function(){var t=e.sourceLanguageSelect.value,r=e.targetLanguageSelect.value;e.sourceLanguageSelect.value=r,e.targetLanguageSelect.value=t,e.onLanguageChange(r,t)}))},(e=[{key:"onLanguageChange",value:function(t,e){window.dispatchEvent(new CustomEvent("languageChange",{detail:{sourceLang:t,targetLang:e}}))}},{key:"updateRecordingState",value:function(t){this.micButton.classList.toggle("recording",t),this.micButton.querySelector(".mic-icon").textContent=t?"⏹":"🎤",this.recordingStatus&&(this.recordingStatus.textContent=t?"Recording...":"")}},{key:"updateCurrentText",value:function(t){this.currentText.innerHTML='\n            <div class="translation-pair">\n                <div class="translation-text original-text">'.concat(t,"</div>\n            </div>\n        ")}},{key:"addTranslation",value:function(t){var e=document.createElement("div");e.className="translation-item";var r=this.getLanguageName(this.sourceLanguageSelect.value),n=this.getLanguageName(this.targetLanguageSelect.value);e.innerHTML='\n            <div class="timestamp">'.concat((new Date).toLocaleTimeString(),'</div>\n            <div class="translation-pair">\n                <div class="translation-text original-text">\n                    <strong>').concat(r,":</strong><br>\n                    ").concat(t.original,'\n                </div>\n                <div class="translation-text translated-text">\n                    <strong>').concat(n,":</strong><br>\n                    ").concat(t.translated,"\n                </div>\n            </div>\n        "),this.translationHistory.insertBefore(e,this.translationHistory.firstChild)}},{key:"getLanguageName",value:function(t){return{"en-US":"English","hi-IN":"Hindi","bn-IN":"Bengali","kn-IN":"Kannada","ta-IN":"Tamil","te-IN":"Telugu","ml-IN":"Malayalam"}[t]||t}},{key:"clearTranslations",value:function(){this.translationHistory.innerHTML="",this.currentText.innerHTML='<p class="placeholder">Press the microphone to start...</p>'}},{key:"showLoading",value:function(){this.loadingIndicator&&this.loadingIndicator.classList.remove("hidden")}},{key:"hideLoading",value:function(){this.loadingIndicator&&this.loadingIndicator.classList.add("hidden")}},{key:"showError",value:function(t){var e=this;if(this.errorMessage){var r=this.errorMessage.querySelector("p");r&&(r.textContent=t),this.errorMessage.classList.remove("hidden"),setTimeout((function(){e.hideError()}),5e3)}}},{key:"hideError",value:function(){this.errorMessage&&this.errorMessage.classList.add("hidden")}}])&&v(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function w(){w=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),c=new I(n||[]);return o(a,"_invoke",{value:P(t,r,c)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var h="suspendedStart",p="suspendedYield",g="executing",v="completed",d={};function y(){}function b(){}function L(){}var E={};s(E,a,(function(){return this}));var x=Object.getPrototypeOf,S=x&&x(x(N([])));S&&S!==r&&n.call(S,a)&&(E=S);var k=L.prototype=y.prototype=Object.create(E);function T(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(o,i,a,c){var u=f(t[o],t,i);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==m(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(l).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function P(e,r,n){var o=h;return function(i,a){if(o===g)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=O(c,n);if(u){if(u===d)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=g;var s=f(e,r,n);if("normal"===s.type){if(o=n.done?v:p,s.arg===d)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=v,n.method="throw",n.arg=s.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var i=f(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,d;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,d):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function N(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(m(e)+" is not iterable")}return b.prototype=L,o(k,"constructor",{value:L,configurable:!0}),o(L,"constructor",{value:b,configurable:!0}),b.displayName=s(L,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,s(t,u,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},T(j.prototype),s(j.prototype,c,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(l(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},T(k),s(k,u,"Generator"),s(k,a,(function(){return this})),s(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=N,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:N(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),d}},e}function b(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function L(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){b(i,n,o,a,c,"next",t)}function c(t){b(i,n,o,a,c,"throw",t)}a(void 0)}))}}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,x(n.key),n)}}function x(t){var e=function(t){if("object"!=m(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==m(e)?e:e+""}var S=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioHandler=new p,this.translationService=new a,this.uiController=new y,this.initialize(),this.setupEventListeners()},e=[{key:"initialize",value:(r=L(w().mark((function t(){return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.audioHandler.initialize();case 3:if(t.sent){t.next=6;break}throw new Error("Failed to initialize audio");case 6:if(!("serviceWorker"in navigator)){t.next=16;break}return t.prev=7,t.next=10,navigator.serviceWorker.register("./sw.js");case 10:console.log("Service Worker registered"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(7),console.error("Service Worker registration failed:",t.t0);case 16:t.next=22;break;case 18:t.prev=18,t.t1=t.catch(0),console.error("Initialization error:",t.t1),alert("Error initializing app. Please check console for details.");case 22:case"end":return t.stop()}}),t,this,[[0,18],[7,13]])}))),function(){return r.apply(this,arguments)})},{key:"setupEventListeners",value:function(){var t=this;this.uiController.micButton.addEventListener("click",(function(){if(t.audioHandler.isRecording)t.audioHandler.stopRecording();else{var e=t.uiController.sourceLanguageSelect.value;t.audioHandler.startRecording(e)}})),this.uiController.clearButton.addEventListener("click",(function(){t.translationService.clearTranslations(),t.uiController.clearTranslations()})),this.uiController.exportButton.addEventListener("click",(function(){t.translationService.exportTranslations()})),window.addEventListener("languageChange",(function(e){var r=e.detail,n=r.sourceLang,o=r.targetLang;t.audioHandler.setLanguages(n,o)})),window.addEventListener("speechResult",function(){var e=L(w().mark((function e(r){var n,o,i,a,c,u;return w().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.detail,o=n.transcript,i=n.isFinal,t.uiController.updateCurrentText(o),!i){e.next=16;break}return e.prev=3,a=t.uiController.sourceLanguageSelect.value,c=t.uiController.targetLanguageSelect.value,e.next=8,t.translationService.translateText(o,a,c);case 8:u=e.sent,t.uiController.addTranslation({original:o,translated:u,timestamp:new Date}),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.error("Translation error:",e.t0),t.uiController.showError("Error during translation. Please try again.");case 16:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t){return e.apply(this,arguments)}}()),window.addEventListener("recordingStateChange",(function(e){var r=e.detail.isRecording;t.uiController.updateRecordingState(r)}))}}],e&&E(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,r}();document.addEventListener("DOMContentLoaded",(function(){new S}))})();