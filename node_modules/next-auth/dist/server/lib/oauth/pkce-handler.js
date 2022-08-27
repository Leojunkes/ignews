"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCallback = handleCallback;
exports.handleSignin = handleSignin;
exports.default = void 0;

var _pkceChallenge = _interopRequireDefault(require("pkce-challenge"));

var cookie = _interopRequireWildcard(require("../cookie"));

var _jwt = _interopRequireDefault(require("../../../lib/jwt"));

var _logger = _interopRequireDefault(require("../../../lib/logger"));

var _errors = require("../../../lib/errors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PKCE_LENGTH = 64;
var PKCE_CODE_CHALLENGE_METHOD = 'S256';
var PKCE_MAX_AGE = 60 * 15;

function handleCallback(_x, _x2) {
  return _handleCallback.apply(this, arguments);
}

function _handleCallback() {
  _handleCallback = _asyncToGenerator(function* (req, res) {
    var {
      cookies,
      provider,
      baseUrl,
      basePath
    } = req.options;

    try {
      if (provider.protection !== 'pkce') {
        return;
      }

      if (!(cookies.pkceCodeVerifier.name in req.cookies)) {
        throw new _errors.OAuthCallbackError('The code_verifier cookie was not found.');
      }

      var pkce = yield _jwt.default.decode(_objectSpread(_objectSpread({}, req.options.jwt), {}, {
        token: req.cookies[cookies.pkceCodeVerifier.name],
        maxAge: PKCE_MAX_AGE,
        encryption: true
      }));
      req.options.pkce = pkce;

      _logger.default.debug('OAUTH_CALLBACK_PROTECTION', 'Read PKCE verifier from cookie', {
        code_verifier: pkce.code_verifier,
        pkceLength: PKCE_LENGTH,
        method: PKCE_CODE_CHALLENGE_METHOD
      });

      cookie.set(res, cookies.pkceCodeVerifier.name, null, {
        maxAge: 0
      });
    } catch (error) {
      _logger.default.error('CALLBACK_OAUTH_ERROR', error);

      return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthCallback"));
    }
  });
  return _handleCallback.apply(this, arguments);
}

function handleSignin(_x3, _x4) {
  return _handleSignin.apply(this, arguments);
}

function _handleSignin() {
  _handleSignin = _asyncToGenerator(function* (req, res) {
    var {
      cookies,
      provider,
      baseUrl,
      basePath
    } = req.options;

    try {
      if (provider.protection !== 'pkce') {
        return;
      }

      var pkce = (0, _pkceChallenge.default)(PKCE_LENGTH);

      _logger.default.debug('OAUTH_SIGNIN_PROTECTION', 'Created PKCE challenge/verifier', _objectSpread(_objectSpread({}, pkce), {}, {
        pkceLength: PKCE_LENGTH,
        method: PKCE_CODE_CHALLENGE_METHOD
      }));

      provider.authorizationParams = _objectSpread(_objectSpread({}, provider.authorizationParams), {}, {
        code_challenge: pkce.code_challenge,
        code_challenge_method: PKCE_CODE_CHALLENGE_METHOD
      });
      var encryptedCodeVerifier = yield _jwt.default.encode(_objectSpread(_objectSpread({}, req.options.jwt), {}, {
        maxAge: PKCE_MAX_AGE,
        token: {
          code_verifier: pkce.code_verifier
        },
        encryption: true
      }));
      var cookieExpires = new Date();
      cookieExpires.setTime(cookieExpires.getTime() + PKCE_MAX_AGE * 1000);
      cookie.set(res, cookies.pkceCodeVerifier.name, encryptedCodeVerifier, _objectSpread({
        expires: cookieExpires.toISOString()
      }, cookies.pkceCodeVerifier.options));

      _logger.default.debug('OAUTH_SIGNIN_PROTECTION', 'Created PKCE code_verifier saved in cookie');
    } catch (error) {
      _logger.default.error('SIGNIN_OAUTH_ERROR', error);

      return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthSignin"));
    }
  });
  return _handleSignin.apply(this, arguments);
}

var _default = {
  handleSignin,
  handleCallback
};
exports.default = _default;