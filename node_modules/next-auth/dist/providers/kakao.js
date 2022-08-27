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
    id: 'kakao',
    name: 'Kakao',
    type: 'oauth',
    version: '2.0',
    params: {
      grant_type: 'authorization_code'
    },
    accessTokenUrl: 'https://kauth.kakao.com/oauth/token',
    authorizationUrl: 'https://kauth.kakao.com/oauth/authorize?response_type=code',
    profileUrl: 'https://kapi.kakao.com/v2/user/me',
    profile: _profile => {
      var _profile$kakao_accoun, _profile$kakao_accoun2, _profile$kakao_accoun3;

      return {
        id: _profile.id,
        name: (_profile$kakao_accoun = _profile.kakao_account) === null || _profile$kakao_accoun === void 0 ? void 0 : _profile$kakao_accoun.profile.nickname,
        email: (_profile$kakao_accoun2 = _profile.kakao_account) === null || _profile$kakao_accoun2 === void 0 ? void 0 : _profile$kakao_accoun2.email,
        image: (_profile$kakao_accoun3 = _profile.kakao_account) === null || _profile$kakao_accoun3 === void 0 ? void 0 : _profile$kakao_accoun3.profile.profile_image_url
      };
    }
  }, options);
};

exports.default = _default;