"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.redirect = redirect;
exports.session = session;
exports.jwt = jwt;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function signIn() {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = _asyncToGenerator(function* () {
    return true;
  });
  return _signIn.apply(this, arguments);
}

function redirect(_x, _x2) {
  return _redirect.apply(this, arguments);
}

function _redirect() {
  _redirect = _asyncToGenerator(function* (url, baseUrl) {
    if (url.startsWith(baseUrl)) {
      return url;
    }

    return baseUrl;
  });
  return _redirect.apply(this, arguments);
}

function session(_x3) {
  return _session.apply(this, arguments);
}

function _session() {
  _session = _asyncToGenerator(function* (session) {
    return session;
  });
  return _session.apply(this, arguments);
}

function jwt(_x4) {
  return _jwt.apply(this, arguments);
}

function _jwt() {
  _jwt = _asyncToGenerator(function* (token) {
    return token;
  });
  return _jwt.apply(this, arguments);
}