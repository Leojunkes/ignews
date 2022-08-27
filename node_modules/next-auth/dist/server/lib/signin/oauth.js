"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthorizationUrl;

var _client = _interopRequireDefault(require("../oauth/client"));

var _logger = _interopRequireDefault(require("../../../lib/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getAuthorizationUrl(_x) {
  return _getAuthorizationUrl.apply(this, arguments);
}

function _getAuthorizationUrl() {
  _getAuthorizationUrl = _asyncToGenerator(function* (req) {
    var _provider$version;

    var {
      provider
    } = req.options;
    var client = (0, _client.default)(provider);

    if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith('2.')) {
      var _req$query;

      (_req$query = req.query) === null || _req$query === void 0 ? true : delete _req$query.nextauth;
      var url = client.getAuthorizeUrl(_objectSpread(_objectSpread(_objectSpread({}, provider.authorizationParams), req.query), {}, {
        redirect_uri: provider.callbackUrl,
        scope: provider.scope
      }));

      if (provider.authorizationUrl.includes('?')) {
        var parseUrl = new URL(provider.authorizationUrl);
        var baseUrl = "".concat(parseUrl.origin).concat(parseUrl.pathname, "?");
        url = url.replace(baseUrl, provider.authorizationUrl + '&');
      }

      _logger.default.debug('GET_AUTHORIZATION_URL', url);

      return url;
    }

    try {
      var oAuthToken = yield client.getOAuthRequestToken();

      var _url = "".concat(provider.authorizationUrl, "?oauth_token=").concat(oAuthToken);

      _logger.default.debug('GET_AUTHORIZATION_URL', _url);

      return _url;
    } catch (error) {
      _logger.default.error('GET_AUTHORIZATION_URL_ERROR', error);

      throw error;
    }
  });
  return _getAuthorizationUrl.apply(this, arguments);
}