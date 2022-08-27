"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callbackUrlHandler;

var cookie = _interopRequireWildcard(require("../lib/cookie"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function callbackUrlHandler(_x, _x2) {
  return _callbackUrlHandler.apply(this, arguments);
}

function _callbackUrlHandler() {
  _callbackUrlHandler = _asyncToGenerator(function* (req, res) {
    var {
      query
    } = req;
    var {
      body
    } = req;
    var {
      cookies,
      baseUrl,
      defaultCallbackUrl,
      callbacks
    } = req.options;
    var callbackUrl = defaultCallbackUrl || baseUrl;
    var callbackUrlParamValue = body.callbackUrl || query.callbackUrl || null;
    var callbackUrlCookieValue = req.cookies[cookies.callbackUrl.name] || null;

    if (callbackUrlParamValue) {
      callbackUrl = yield callbacks.redirect(callbackUrlParamValue, baseUrl);
    } else if (callbackUrlCookieValue) {
      callbackUrl = yield callbacks.redirect(callbackUrlCookieValue, baseUrl);
    }

    if (callbackUrl && callbackUrl !== callbackUrlCookieValue) {
      cookie.set(res, cookies.callbackUrl.name, callbackUrl, cookies.callbackUrl.options);
    }

    req.options.callbackUrl = callbackUrl;
  });
  return _callbackUrlHandler.apply(this, arguments);
}