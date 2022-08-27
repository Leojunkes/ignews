"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = options => {
  return _objectSpread({
    id: 'faceit',
    name: 'FACEIT',
    type: 'oauth',
    version: '2.0',
    params: {
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: "Basic ".concat(Buffer.from("".concat(options.clientId, ":").concat(options.clientSecret)).toString('base64'))
    },
    accessTokenUrl: 'https://api.faceit.com/auth/v1/oauth/token',
    authorizationUrl: 'https://accounts.faceit.com/accounts?redirect_popup=true&response_type=code',
    profileUrl: 'https://api.faceit.com/auth/v1/resources/userinfo',

    profile(profile) {
      var {
        guid: id,
        nickname: name,
        email,
        picture: image
      } = profile;
      return {
        id,
        name,
        email,
        image
      };
    }

  }, options);
};

exports.default = _default;