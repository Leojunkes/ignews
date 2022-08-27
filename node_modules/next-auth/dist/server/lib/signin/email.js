"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = email;

var _crypto = require("crypto");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function email(_x, _x2, _x3) {
  return _email.apply(this, arguments);
}

function _email() {
  _email = _asyncToGenerator(function* (email, provider, options) {
    try {
      var _yield$provider$gener, _provider$generateVer;

      var {
        baseUrl,
        basePath,
        adapter
      } = options;
      var {
        createVerificationRequest
      } = yield adapter.getAdapter(options);
      var secret = provider.secret || options.secret;
      var token = (_yield$provider$gener = yield (_provider$generateVer = provider.generateVerificationToken) === null || _provider$generateVer === void 0 ? void 0 : _provider$generateVer.call(provider)) !== null && _yield$provider$gener !== void 0 ? _yield$provider$gener : (0, _crypto.randomBytes)(32).toString('hex');
      var url = "".concat(baseUrl).concat(basePath, "/callback/").concat(encodeURIComponent(provider.id), "?email=").concat(encodeURIComponent(email), "&token=").concat(encodeURIComponent(token));
      yield createVerificationRequest(email, url, token, secret, provider, options);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  });
  return _email.apply(this, arguments);
}