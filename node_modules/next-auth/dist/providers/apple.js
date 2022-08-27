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
    id: 'apple',
    name: 'Apple',
    type: 'oauth',
    version: '2.0',
    scope: 'name email',
    params: {
      grant_type: 'authorization_code'
    },
    accessTokenUrl: 'https://appleid.apple.com/auth/token',
    authorizationUrl: 'https://appleid.apple.com/auth/authorize?response_type=code&id_token&response_mode=form_post',
    profileUrl: null,
    idToken: true,
    profile: _profile => {
      return {
        id: _profile.sub,
        name: _profile.user != null ? _profile.user.name.firstName + ' ' + _profile.user.name.lastName : null,
        email: _profile.email
      };
    },
    clientId: null,
    clientSecret: {
      teamId: null,
      privateKey: null,
      keyId: null
    },
    protection: 'none'
  }, options);
};

exports.default = _default;