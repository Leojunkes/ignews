"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oAuthCallback;

var _jsonwebtoken = require("jsonwebtoken");

var _client = _interopRequireDefault(require("./client"));

var _logger = _interopRequireDefault(require("../../../lib/logger"));

var _errors = require("../../../lib/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function oAuthCallback(_x) {
  return _oAuthCallback.apply(this, arguments);
}

function _oAuthCallback() {
  _oAuthCallback = _asyncToGenerator(function* (req) {
    var _provider$version;

    var {
      provider,
      pkce
    } = req.options;
    var client = (0, _client.default)(provider);

    if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith('2.')) {
      var {
        code,
        user
      } = req.query;

      if (req.method === 'POST') {
        try {
          var body = JSON.parse(JSON.stringify(req.body));

          if (body.error) {
            throw new Error(body.error);
          }

          code = body.code;
          user = body.user != null ? JSON.parse(body.user) : null;
        } catch (error) {
          _logger.default.error('OAUTH_CALLBACK_HANDLER_ERROR', error, req.body, provider.id, code);

          throw error;
        }
      }

      if (Object.prototype.hasOwnProperty.call(provider, 'useAuthTokenHeader')) {
        client.useAuthorizationHeaderforGET(provider.useAuthTokenHeader);
      } else {
        client.useAuthorizationHeaderforGET(true);
      }

      try {
        var tokens = yield client.getOAuthAccessToken(code, provider, pkce.code_verifier);
        var profileData;

        if (provider.idToken) {
          if (!(tokens !== null && tokens !== void 0 && tokens.id_token)) {
            throw new _errors.OAuthCallbackError('Missing JWT ID Token');
          }

          profileData = (0, _jsonwebtoken.decode)(tokens.id_token, {
            json: true
          });
        } else {
          profileData = yield client.get(provider, tokens.accessToken, tokens);
        }

        return getProfile({
          profileData,
          provider,
          tokens,
          user
        });
      } catch (error) {
        _logger.default.error('OAUTH_GET_ACCESS_TOKEN_ERROR', error, provider.id, code);

        throw error;
      }
    }

    try {
      var {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier
      } = req.query;

      var _tokens = yield client.getOAuthAccessToken(oauthToken, null, oauthVerifier);

      var _profileData = yield client.get(provider.profileUrl, _tokens.accessToken, _tokens.refreshToken);

      return getProfile({
        profileData: _profileData,
        tokens: _tokens,
        provider
      });
    } catch (error) {
      _logger.default.error('OAUTH_V1_GET_ACCESS_TOKEN_ERROR', error);

      throw error;
    }
  });
  return _oAuthCallback.apply(this, arguments);
}

function getProfile(_x2) {
  return _getProfile.apply(this, arguments);
}

function _getProfile() {
  _getProfile = _asyncToGenerator(function* (_ref) {
    var {
      profileData,
      tokens,
      provider,
      user
    } = _ref;

    try {
      var _profile$email$toLowe, _profile$email;

      if (typeof profileData === 'string' || profileData instanceof String) {
        profileData = JSON.parse(profileData);
      }

      if (user != null) {
        profileData.user = user;
      }

      _logger.default.debug('PROFILE_DATA', profileData);

      var profile = yield provider.profile(profileData, tokens);
      return {
        profile: _objectSpread(_objectSpread({}, profile), {}, {
          email: (_profile$email$toLowe = (_profile$email = profile.email) === null || _profile$email === void 0 ? void 0 : _profile$email.toLowerCase()) !== null && _profile$email$toLowe !== void 0 ? _profile$email$toLowe : null
        }),
        account: _objectSpread({
          provider: provider.id,
          type: provider.type,
          id: profile.id
        }, tokens),
        OAuthProfile: profileData
      };
    } catch (exception) {
      _logger.default.error('OAUTH_PARSE_PROFILE_ERROR', exception, profileData);

      return {
        profile: null,
        account: null,
        OAuthProfile: profileData
      };
    }
  });
  return _getProfile.apply(this, arguments);
}