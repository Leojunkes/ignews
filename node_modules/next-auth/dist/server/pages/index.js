"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPage;

var _preactRenderToString = _interopRequireDefault(require("preact-render-to-string"));

var _signin = _interopRequireDefault(require("./signin"));

var _signout = _interopRequireDefault(require("./signout"));

var _verifyRequest = _interopRequireDefault(require("./verify-request"));

var _error = _interopRequireDefault(require("./error"));

var _css = _interopRequireDefault(require("../../css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderPage(req, res) {
  var {
    baseUrl,
    basePath,
    callbackUrl,
    csrfToken,
    providers,
    theme
  } = req.options;
  res.setHeader('Content-Type', 'text/html');

  function send(_ref) {
    var {
      html,
      title
    } = _ref;
    res.send("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><style>".concat((0, _css.default)(), "</style><title>").concat(title, "</title></head><body class=\"__next-auth-theme-").concat(theme, "\"><div class=\"page\">").concat((0, _preactRenderToString.default)(html), "</div></body></html>"));
  }

  return {
    signin(props) {
      send({
        html: (0, _signin.default)(_objectSpread(_objectSpread({
          csrfToken,
          providers,
          callbackUrl
        }, req.query), props)),
        title: 'Sign In'
      });
    },

    signout(props) {
      send({
        html: (0, _signout.default)(_objectSpread({
          csrfToken,
          baseUrl,
          basePath
        }, props)),
        title: 'Sign Out'
      });
    },

    verifyRequest(props) {
      send({
        html: (0, _verifyRequest.default)(_objectSpread({
          baseUrl
        }, props)),
        title: 'Verify Request'
      });
    },

    error(props) {
      send({
        html: (0, _error.default)(_objectSpread({
          basePath,
          baseUrl,
          res
        }, props)),
        title: 'Error'
      });
    }

  };
}