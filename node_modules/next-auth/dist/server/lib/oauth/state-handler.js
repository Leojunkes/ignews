"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCallback = handleCallback;
exports.handleSignin = handleSignin;
exports.default = void 0;

var _crypto = require("crypto");

var _logger = _interopRequireDefault(require("../../../lib/logger"));

var _errors = require("../../../lib/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function handleCallback(_x, _x2) {
  return _handleCallback.apply(this, arguments);
}

function _handleCallback() {
  _handleCallback = _asyncToGenerator(function* (req, res) {
    var {
      csrfToken,
      provider,
      baseUrl,
      basePath
    } = req.options;

    try {
      if (provider.protection !== 'state') {
        return;
      }

      var {
        state
      } = req.query;
      var expectedState = (0, _crypto.createHash)('sha256').update(csrfToken).digest('hex');

      _logger.default.debug('OAUTH_CALLBACK_PROTECTION', 'Comparing received and expected state', {
        state,
        expectedState
      });

      if (state !== expectedState) {
        throw new _errors.OAuthCallbackError('Invalid state returned from OAuth provider');
      }
    } catch (error) {
      _logger.default.error('STATE_ERROR', error);

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
      provider,
      baseUrl,
      basePath,
      csrfToken
    } = req.options;

    try {
      if (provider.protection !== 'state') {
        return;
      }

      if ('state' in provider) {
        _logger.default.warn('STATE_OPTION_DEPRECATION', 'The `state` provider option is being replaced with `protection`. See the docs.');
      }

      var state = (0, _crypto.createHash)('sha256').update(csrfToken).digest('hex');
      provider.authorizationParams = _objectSpread(_objectSpread({}, provider.authorizationParams), {}, {
        state
      });

      _logger.default.debug('OAUTH_CALLBACK_PROTECTION', 'Added state to authorization params', {
        state
      });
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