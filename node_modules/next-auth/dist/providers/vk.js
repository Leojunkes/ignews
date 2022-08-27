"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = options => {
  var apiVersion = '5.126';
  return _objectSpread({
    id: 'vk',
    name: 'VK',
    type: 'oauth',
    version: '2.0',
    scope: 'email',
    params: {
      grant_type: 'authorization_code'
    },
    accessTokenUrl: "https://oauth.vk.com/access_token?v=".concat(apiVersion),
    requestTokenUrl: "https://oauth.vk.com/access_token?v=".concat(apiVersion),
    authorizationUrl: "https://oauth.vk.com/authorize?response_type=code&v=".concat(apiVersion),
    profileUrl: "https://api.vk.com/method/users.get?fields=photo_100&v=".concat(apiVersion),
    profile: result => {
      var _result$response$, _result$response;

      var profile = (_result$response$ = (_result$response = result.response) === null || _result$response === void 0 ? void 0 : _result$response[0]) !== null && _result$response$ !== void 0 ? _result$response$ : {};
      return {
        id: profile.id,
        name: [profile.first_name, profile.last_name].filter(Boolean).join(' '),
        email: profile.email,
        image: profile.photo_100
      };
    }
  }, options);
};

exports.default = _default;