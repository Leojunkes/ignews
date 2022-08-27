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
    id: 'zoho',
    name: 'Zoho',
    type: 'oauth',
    version: '2.0',
    scope: 'AaaServer.profile.Read',
    params: {
      grant_type: 'authorization_code'
    },
    accessTokenUrl: 'https://accounts.zoho.com/oauth/v2/token',
    authorizationUrl: 'https://accounts.zoho.com/oauth/v2/auth?response_type=code',
    profileUrl: 'https://accounts.zoho.com/oauth/user/info',
    profile: _profile => {
      return {
        id: _profile.ZUID,
        name: "".concat(_profile.First_Name, " ").concat(_profile.Last_Name),
        email: _profile.Email,
        image: null
      };
    }
  }, options);
};

exports.default = _default;